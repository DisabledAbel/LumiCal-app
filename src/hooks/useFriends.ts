
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export function useFriends() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch accepted friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      if (!user) return [];
      // Get both accepted as requester or addressee, and their profile
      const { data: friendships, error } = await supabase
        .from("friendships")
        .select(
          "id, requester_id, addressee_id, status, requester:requester_id(*), addressee:addressee_id(*)"
        )
        .eq("status", "accepted")
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);
      if (error) throw error;
      // Map: The "other" user in the friendship
      return (friendships || []).map((f: any) => {
        const friendProfile =
          f.requester_id === user.id ? f.addressee : f.requester;
        return { ...friendProfile, id: friendProfile.id };
      });
    },
  });

  // Pending requests (where user is the addressee)
  const { data: requests = [], isLoading: loadingRequests } = useQuery({
    queryKey: ["friend_requests"],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("friendships")
        .select(
          "id, requester:requester_id(*), status"
        )
        .eq("addressee_id", user.id)
        .eq("status", "pending");
      if (error) throw error;
      return (data || []).map((r: any) => ({
        id: r.id,
        ...r.requester,
      }));
    },
  });

  // Send request
  const { mutateAsync: sendRequest } = useMutation({
    mutationFn: async (identifier: string) => {
      // Try to find user profile by username or email
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id")
        .or(`username.eq.${identifier},email.eq.${identifier}`);
      if (error || !profiles || profiles.length === 0) {
        toast({ title: "User not found", variant: "destructive" });
        return;
      }
      const friendId = profiles[0].id;
      if (friendId === user?.id) {
        toast({ title: "Cannot friend yourself", variant: "destructive" });
        return;
      }
      // Create friendship record (pending)
      const { error: insertError } = await supabase.from("friendships").insert([
        {
          requester_id: user?.id,
          addressee_id: friendId,
          status: "pending",
        },
      ]);
      if (insertError) {
        toast({ title: insertError.message, variant: "destructive" });
        return;
      }
      toast({ title: "Friend request sent!" });
      queryClient.invalidateQueries({ queryKey: ["friend_requests"] });
    },
  });

  // Accept request
  const { mutateAsync: acceptRequest, isPending: loadingAccept } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("friendships")
        .update({ status: "accepted" })
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Friend request accepted!" });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friend_requests"] });
    },
  });

  // Reject request
  const { mutateAsync: rejectRequest, isPending: loadingReject } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("friendships")
        .update({ status: "rejected" })
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Friend request rejected." });
      queryClient.invalidateQueries({ queryKey: ["friend_requests"] });
    },
  });

  return {
    friends,
    requests,
    loading: loadingFriends || loadingRequests || loadingAccept || loadingReject,
    sendRequest,
    acceptRequest,
    rejectRequest,
  };
}

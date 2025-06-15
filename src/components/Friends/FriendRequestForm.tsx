
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFriends } from "@/hooks/useFriends";

const FriendRequestForm = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { sendRequest } = useFriends();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await sendRequest(query);
    setQuery("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <Input
        placeholder="Username or email"
        required
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-48"
      />
      <Button type="submit" size="sm" disabled={loading || !query}>
        {loading ? "Sending..." : "Add Friend"}
      </Button>
    </form>
  );
};

export default FriendRequestForm;

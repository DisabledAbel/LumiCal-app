
import React from "react";
import { useFriends } from "@/hooks/useFriends";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FriendRequestForm from "./FriendRequestForm";

const FriendsSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { friends, requests, acceptRequest, rejectRequest, loading } = useFriends();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 z-40 bg-white shadow-lg transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ maxWidth: 320 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-medium">Your Friends</h2>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
        <FriendRequestForm />
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Friends</h3>
          {friends.length === 0 && (
            <div className="text-muted-foreground text-sm">No friends yet.</div>
          )}
          <ul>
            {friends.map((f) => (
              <li key={f.id} className="py-1 flex items-center gap-2">
                <span>{f.name ?? f.username ?? f.email}</span>
                {/* Future: avatar, link to profile */}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Pending Requests</h3>
          {requests.length === 0 && (
            <div className="text-muted-foreground text-sm">No requests.</div>
          )}
          <ul>
            {requests.map((r) => (
              <li key={r.id} className="py-1 flex gap-2 items-center">
                <span>{r.name ?? r.username ?? r.email}</span>
                <Button size="xs" variant="outline" disabled={loading}
                  onClick={() => acceptRequest(r.id)}>
                  Accept
                </Button>
                <Button size="xs" variant="ghost" disabled={loading}
                  onClick={() => rejectRequest(r.id)}>
                  Reject
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendsSidebar;

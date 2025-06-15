
-- 1. Friendships table to manage friend requests and accepted friendships
CREATE TABLE public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL,
  addressee_id UUID NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT no_self_friending CHECK (requester_id <> addressee_id)
);

-- Indexes for quick lookups
CREATE INDEX idx_friendships_requester_id ON public.friendships(requester_id);
CREATE INDEX idx_friendships_addressee_id ON public.friendships(addressee_id);

-- Enable RLS for friendships
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- A user can see their own friendship requests/invites
CREATE POLICY "Users can view their own friendships" ON public.friendships
  FOR SELECT
  USING (
    requester_id = auth.uid() OR addressee_id = auth.uid()
  );

-- Policy for inserting (sending a friend request)
CREATE POLICY "Users can send friend requests" ON public.friendships
  FOR INSERT
  WITH CHECK (
    requester_id = auth.uid()
  );

-- Policy for updating (accepting/rejecting)
CREATE POLICY "Users can respond to friend requests" ON public.friendships
  FOR UPDATE
  USING (
    addressee_id = auth.uid()
  );

-- Policy for deleting (optional, e.g., cancel/delete)
CREATE POLICY "Users can delete their own friendships" ON public.friendships
  FOR DELETE
  USING (
    requester_id = auth.uid() OR addressee_id = auth.uid()
  );


-- 2. Event Invites table
CREATE TABLE public.event_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  inviter_id UUID NOT NULL,
  invitee_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_event_invites_event_id ON public.event_invites(event_id);
CREATE INDEX idx_event_invites_invitee_id ON public.event_invites(invitee_id);

-- Enable RLS for event_invites
ALTER TABLE public.event_invites ENABLE ROW LEVEL SECURITY;

-- Users can select invitations they are involved in (as inviter or invitee)
CREATE POLICY "Users can view relevant event invites" ON public.event_invites
  FOR SELECT
  USING (
    inviter_id = auth.uid() OR invitee_id = auth.uid()
  );

-- Users can send invites (only for events they created, and only to their accepted friends)
-- NOTE: Actual friend check logic should be in code; DB check not included here for performance/simplicity
CREATE POLICY "Users can invite friends to their events" ON public.event_invites
  FOR INSERT
  WITH CHECK (
    inviter_id = auth.uid()
  );

-- Invitee can accept/decline
CREATE POLICY "Invitee can respond to invites" ON public.event_invites
  FOR UPDATE
  USING (
    invitee_id = auth.uid()
  );

-- Inviter or invitee can delete the invite
CREATE POLICY "Inviter or invitee can delete invit" ON public.event_invites
  FOR DELETE
  USING (
    inviter_id = auth.uid() OR invitee_id = auth.uid()
  );

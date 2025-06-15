
-- Enable Row Level Security on the calendar_events table
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to view their own events
CREATE POLICY "Users can view their own calendar events"
ON public.calendar_events FOR SELECT
USING (auth.uid() = user_id);

-- Create a policy that allows users to create their own events
CREATE POLICY "Users can create their own calendar events"
ON public.calendar_events FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to update their own events
CREATE POLICY "Users can update their own calendar events"
ON public.calendar_events FOR UPDATE
USING (auth.uid() = user_id);

-- Create a policy that allows users to delete their own events
CREATE POLICY "Users can delete their own calendar events"
ON public.calendar_events FOR DELETE
USING (auth.uid() = user_id);

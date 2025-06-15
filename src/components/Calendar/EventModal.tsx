
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFriends } from "@/hooks/useFriends";

interface EventModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (data: any) => void;
  initialValues?: any;
}

const EventModal: React.FC<EventModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialValues,
}) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [date, setDate] = useState(initialValues?.date || "");
  const [start, setStart] = useState(initialValues?.start || "");
  const [end, setEnd] = useState(initialValues?.end || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const { friends } = useFriends();
  const [invitees, setInvitees] = useState<string[]>(initialValues?.invitees || []);

  const handleInviteeToggle = (id: string) => {
    setInvitees((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      date,
      start,
      end,
      description,
      invitees,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{initialValues ? "Edit" : "Create"} Event</DialogTitle>
          </DialogHeader>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            required
          />
          <div className="flex gap-2">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="flex-1"
            />
            <Input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              className="flex-1"
            />
            <Input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              className="flex-1"
            />
          </div>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div>
            <div className="text-sm font-semibold mb-1">Invite friends</div>
            <div className="flex flex-wrap gap-2">
              {friends.map((f) => (
                <label key={f.id} className="flex items-center gap-1 cursor-pointer border rounded px-2 py-1">
                  <input
                    type="checkbox"
                    checked={invitees.includes(f.id)}
                    onChange={() => handleInviteeToggle(f.id)}
                  />
                  {f.name ?? f.username ?? f.email}
                </label>
              ))}
              {friends.length === 0 && (
                <span className="text-xs text-muted-foreground">No friends to invite.</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialValues ? "Save" : "Create"} Event</Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;

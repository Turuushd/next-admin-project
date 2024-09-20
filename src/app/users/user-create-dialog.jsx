import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const UserCreateDialog = ({ open, onClose, onCreateUser }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handleSave = () => {
    onClose(false);
    fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify({
        firstname: name,
        lastname: username,
        email: "test@go.com",
        imageUrl: "http://dummyimage.com/117x116.png/cc0000/ffffff",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        onCreateUser(data.data);
      });
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

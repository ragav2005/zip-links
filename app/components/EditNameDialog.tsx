import React, { useState, useEffect } from "react";
import { PenLine } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useAuth } from "~/stores/useAuth";
import { toast } from "sonner";

interface EditNameDialogProps {
  isMobile?: boolean;
}

const EditNameDialog = ({ isMobile }: EditNameDialogProps) => {
  const { user, updateUser, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setNewName(user.name);
    }
  }, [user?.name]);

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (newName.trim() === user?.name) {
      toast.info("Name is unchanged");
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_NODE_URI;

      const response = await fetch(`${API_BASE_URL}/api/user/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        updateUser({ name: newName.trim() });
        toast.success("Name updated successfully!");
        setIsOpen(false);
      } else {
        throw new Error(data.message || "Failed to update name");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update name");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex gap-3 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <PenLine /> Edit Name
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Name</DialogTitle>
          <DialogDescription>
            Update your display name. This will be visible to others.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="col-span-3"
              placeholder="Enter your name"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpdateName}
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNameDialog;

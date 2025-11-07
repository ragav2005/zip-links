import React, { useState } from "react";
import { CircleUserRound } from "lucide-react";
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
import {
  imageToBase64,
  isValidImageFile,
  isValidFileSize,
} from "~/lib/imageUtils";

interface UpdateAvatarDialogProps {
  isMobile?: boolean;
}

const UpdateAvatarDialog = ({ isMobile }: UpdateAvatarDialogProps) => {
  const { user, updateUser, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      toast.error("Please select a valid image file (JPEG, PNG)");
      return;
    }

    if (!isValidFileSize(file)) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpdateAvatar = async () => {
    if (!selectedFile) {
      toast.error("Please select an image file");
      return;
    }

    setIsLoading(true);
    try {
      const base64Image = await imageToBase64(selectedFile);

      const API_BASE_URL = import.meta.env.VITE_NODE_URI;

      const response = await fetch(`${API_BASE_URL}/api/user/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar: base64Image }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        updateUser({ avatar: data.data.avatar });
        toast.success("Avatar updated successfully!");
        setIsOpen(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        throw new Error(data.message || "Failed to update avatar");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update avatar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex gap-3 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <CircleUserRound /> Update Avatar
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Avatar</DialogTitle>
          <DialogDescription>
            Upload a new profile picture. Supported formats: JPEG, PNG(max 5MB).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Image
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="col-span-3"
              disabled={isLoading}
            />
          </div>
          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="cursor-pointer"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpdateAvatar}
            className="cursor-pointer"
            disabled={isLoading || !selectedFile}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAvatarDialog;

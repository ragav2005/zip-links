import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useAuth } from "~/stores/useAuth";
import EditNameDialog from "~/components/EditNameDialog";
import LogoutAlertDialog from "~/components/LogoutAlertDialog";
import UpdateAvatarDialog from "~/components/UpdateAvatarDialog";

const Profile = ({ isMobile }: { isMobile: boolean }) => {
  const { user } = useAuth();

  if (!user) return null;

  const initals = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300 shadow-glow cursor-pointer">
            <AvatarImage src={user.avatar} className="object-cover" />
            <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm shadow-inner">
              {initals}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64"
          align={isMobile ? "center" : "end"}
          sideOffset={10}
        >
          <DropdownMenuLabel
            className="font-normal text-sm text-muted-foreground truncate mb-2"
            aria-label={user.email}
          >
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <EditNameDialog isMobile={isMobile} />
            <UpdateAvatarDialog isMobile={isMobile} />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <LogoutAlertDialog isMobile={isMobile} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Profile;

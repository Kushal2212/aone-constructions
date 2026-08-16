import { User } from "lucide-react";
import { useSelector } from "react-redux";

function AdminWelcomeCard() {
  const { admin } = useSelector((state) => state.settings);

  const initials = admin?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-2 rounded-xl px-2 py-1.5">
      {/* Avatar */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {initials || <User className="size-4" />}
      </div>

      {/* User information */}
      <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
        <p className="truncate text-sm font-semibold leading-tight">
          {admin?.name || "Admin"}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {admin?.email || "No email set"}
        </p>
      </div>
    </div>
  );
}

export default AdminWelcomeCard;
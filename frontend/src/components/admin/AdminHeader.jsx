import { Bell } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";


function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div className="hidden h-5 w-px bg-border sm:block" />

        <div>
          <p className="text-sm font-semibold">Admin Panel</p>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Manage A.one Construction
          </p>
        </div>
        
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
      >
        <Bell className="size-4" />

        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
      </button>
    </header>
  );
}

export default AdminHeader;
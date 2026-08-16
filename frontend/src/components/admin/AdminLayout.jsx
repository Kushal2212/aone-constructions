import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset className="min-w-0">
        <AdminHeader />

        <main
          className="min-h-0 min-w-0 flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 pb-20">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;

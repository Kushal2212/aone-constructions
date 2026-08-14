import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset className="min-w-0">
        <AdminHeader />

        <main className="min-w-0 flex-1">
          <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;
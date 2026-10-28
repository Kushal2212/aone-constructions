import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { loadAdminSettings, loadClients, loadEnquiries, loadGallery, loadProjects, loadTestimonials } from "@/services/dataApi";
import { setProjects } from "@/store/slices/projectSlice";
import { setGalleryItems } from "@/store/slices/gallerySlice";
import { setTestimonials } from "@/store/slices/testimonialsSlice";
import { setClients } from "@/store/slices/clientSlice";
import { setEnquiries } from "@/store/slices/enquiriesSlice";
import { setSettings } from "@/store/slices/settingsSlice";

function AdminLayout() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);

  useEffect(() => {
    Promise.all([
      loadProjects(true),
      loadGallery(true),
      loadTestimonials(true),
      loadEnquiries(),
      loadClients(),
      loadAdminSettings(),
    ]).then(([projects, gallery, testimonials, enquiries, clients, settings]) => {
      dispatch(setProjects(projects));
      dispatch(setGalleryItems(gallery));
      dispatch(setTestimonials(testimonials));
      dispatch(setEnquiries(enquiries));
      dispatch(setClients(clients));
      dispatch(setSettings({
        ...settings,
        admin: { name: admin?.name || "", email: admin?.email || "" },
      }));
    }).catch((error) => {
      console.error("Failed to load admin data from the API.", error);
      toast.error(error.message);
    });
  }, [admin?.email, admin?.name, dispatch]);

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

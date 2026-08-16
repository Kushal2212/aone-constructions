import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/admin/AdminLayout";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import PublicTestimonials from "@/pages/PublicTestimonials";

import Dashboard from "@/pages/admin/Dashboard";
import Enquiries from "@/pages/admin/Enquiries";
import Clients from "@/pages/admin/Clients";
import GallaryAdmin from "@/pages/admin/GalleryAdmin";
import Testimonials from "@/pages/admin/Testimonials";
import Settings from "@/pages/admin/Settings";
import ProjectAdmin from "@/pages/admin/ProjectAdmin";
import AdminLogin from "@/pages/admin/AdminLogin";

import RequireAuth from "@/components/RequireAuth";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<PublicTestimonials />} />
      </Route>

      {/* Public: not guarded */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected */}
      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/enquiries" element={<Enquiries />} />
          <Route path="/admin/clients" element={<Clients />} />
          <Route path="/admin/gallery" element={<GallaryAdmin />} />
          <Route path="/admin/testimonials" element={<Testimonials />} />
          <Route path="/admin/projects" element={<ProjectAdmin />} />
          <Route path="/admin/settings" element={<Settings/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;

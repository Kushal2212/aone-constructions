import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "@/routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import { logoutAdmin, validateAdminSession } from "./store/slices/authSlice";
import { loadGallery, loadProjects, loadPublicSettings, loadTestimonials } from "./services/dataApi";
import { setProjects } from "./store/slices/projectSlice";
import { setGalleryItems } from "./store/slices/gallerySlice";
import { setTestimonials } from "./store/slices/testimonialsSlice";
import { setSettings } from "./store/slices/settingsSlice";
import { toast } from "sonner";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUnauthorized = () => dispatch(logoutAdmin());
    window.addEventListener("aone:unauthorized", handleUnauthorized);
    dispatch(validateAdminSession());
    Promise.all([
      loadProjects(),
      loadGallery(),
      loadTestimonials(),
      loadPublicSettings(),
    ]).then(([projects, gallery, testimonials, settings]) => {
      dispatch(setProjects(projects));
      dispatch(setGalleryItems(gallery));
      dispatch(setTestimonials(testimonials));
      dispatch(setSettings({ company: settings.company || {}, social: settings.social || {} }));
    }).catch((error) => {
      console.error("Failed to load public content from the API.", error);
      toast.error(error.message);
    });
    return () => window.removeEventListener("aone:unauthorized", handleUnauthorized);
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <Toaster/>
    </>
  );
}

export default App;

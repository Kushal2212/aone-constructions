import { apiRequest, fetchCollection, normalizeRecord } from "./api";

export async function loadProjects(admin = false) {
  return fetchCollection(admin ? "/admin/projects" : "/projects");
}

export async function loadGallery(admin = false) {
  return fetchCollection(admin ? "/admin/gallery" : "/gallery");
}

export async function loadTestimonials(admin = false) {
  return fetchCollection(admin ? "/admin/testimonials" : "/testimonials");
}

export async function loadEnquiries() {
  return fetchCollection("/admin/enquiries");
}

export async function loadClients() {
  return fetchCollection("/admin/clients");
}

export async function loadAdminSettings() {
  const { item } = await apiRequest("/admin/settings");
  return normalizeRecord(item);
}

export async function loadPublicSettings() {
  return apiRequest("/settings");
}

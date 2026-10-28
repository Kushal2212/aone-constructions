const API_BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const SESSION_KEY = "aone_construction_admin_session";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getStoredSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    console.warn("Failed to read the admin session.");
    return null;
  }
}

export function storeSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export async function apiRequest(path, { body, headers = {}, ...options } = {}) {
  const session = getStoredSession();
  const requestHeaders = new Headers(headers);
  if (body && !(body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (session?.token) {
    requestHeaders.set("Authorization", `Bearer ${session.token}`);
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: requestHeaders,
      body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(`Unable to connect to the API at ${API_BASE_URL}. Check that the backend is running and the API URL is configured correctly.`, 0);
  }

  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && session?.token && path !== "/auth/login") {
      clearStoredSession();
      window.dispatchEvent(new Event("aone:unauthorized"));
    }
    throw new ApiError(payload?.error || `API request failed (${response.status}).`, response.status);
  }
  return payload;
}

export function normalizeRecord(record) {
  if (Array.isArray(record)) return record.map(normalizeRecord);
  if (!record || typeof record !== "object") return record;
  const normalized = Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, normalizeRecord(value)]),
  );
  if (normalized._id) normalized.id = normalized._id;
  if (!normalized.imageUrl && normalized.media) {
    normalized.imageUrl = Array.isArray(normalized.media)
      ? normalized.media[0]?.url
      : normalized.media.url;
  }
  return normalized;
}

export async function fetchCollection(path) {
  const firstPage = await apiRequest(`${path}?page=1&limit=100`);
  const totalPages = firstPage.pagination?.pages || 1;
  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      apiRequest(`${path}?page=${index + 2}&limit=100`),
    ),
  );
  return normalizeRecord([
    ...(firstPage.items || []),
    ...remainingPages.flatMap((page) => page.items || []),
  ]);
}

export async function uploadMedia(file, folder) {
  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);
  const response = await apiRequest("/admin/media/upload", { method: "POST", body });
  return response.media;
}

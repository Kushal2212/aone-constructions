import {
  apiRequest,
  clearStoredSession,
  getStoredSession,
  storeSession,
} from "./api";

export { getStoredSession } from "./api";

export function login({ email, password }) {
  return apiRequest("/auth/login", { method: "POST", body: { email, password } })
    .then(({ admin, token }) => {
      const session = { ...admin, token };
      storeSession(session);
      return session;
    });
}

export function logout() {
  clearStoredSession();
}

export async function validateSession() {
  const session = getStoredSession();
  if (!session?.token) return null;
  try {
    const { admin } = await apiRequest("/auth/me");
    const updatedSession = { ...admin, token: session.token };
    storeSession(updatedSession);
    return updatedSession;
  } catch (error) {
    if (error.status === 401) logout();
    throw error;
  }
}

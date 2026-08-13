// replace the body of login() with an API call (POST /api/auth/login)

const SESSION_KEY = "aone_construction_admin_session";

// replace with real credential check against a backend.
const MOCK_ADMIN = {
  username: "admin",
  password: "Admin123",
  name: "Administrator",
};

export function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        username === MOCK_ADMIN.username &&
        password === MOCK_ADMIN.password
      ) {
        const session = {
          username: MOCK_ADMIN.username,
          name: MOCK_ADMIN.name,
          token: `mock-token-${Date.now()}`,
        };
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        resolve(session);
      } else {
        reject(new Error("Incorrect username or password."));
      }
    }, 350);
  });
}

export function logout() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function getStoredSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

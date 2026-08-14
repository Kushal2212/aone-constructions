// replace the body of login() with an API call (POST /api/auth/login)

const SESSION_KEY = "aone_construction_admin_session";

// replace with real credential check against a backend.
const MOCK_ADMIN = {
  email: "admin@gmail.com",
  password: "Admin123",
  name: "Administrator",
};

export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email === MOCK_ADMIN.email &&
        password === MOCK_ADMIN.password
      ) {
        const session = {
          email: MOCK_ADMIN.email,
          name: MOCK_ADMIN.name,
          token: `mock-token-${Date.now()}`,
        };
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        resolve(session);
      } else {
        reject(new Error("Incorrect email or password."));
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

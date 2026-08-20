import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const ThemeContext = createContext(null);

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme() {
  if (typeof window === "undefined") return "system";
  try {
    return localStorage.getItem(STORAGE_KEY) || "system";
  } catch {
    return "system";
  }
}

function applyThemeClass(theme) {
  const root = document.documentElement;
  const resolved = theme === "system" ? getSystemTheme() : theme;

  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

/**
 * theme: "light" | "dark" | "system" — the user's stored preference
 * resolvedTheme: "light" | "dark" — what's actually applied right now
 */
export function ThemeProvider({ children, defaultTheme = "system" }) {
  const [theme, setThemeState] = useState(() => getStoredTheme() || defaultTheme);

  useEffect(() => {
    applyThemeClass(theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  }, [theme]);

  // Keep in sync with OS-level changes when following "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyThemeClass("system");

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (value) => setThemeState(value);

  const toggleTheme = () => {
    setThemeState((current) => {
      const resolved = current === "system" ? getSystemTheme() : current;
      return resolved === "dark" ? "light" : "dark";
    });
  };

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, resolvedTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
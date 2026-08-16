import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "aone_construction_settings";

const defaultSettings = {
  company: {
    name: "A.one Brain Construction Pvt. Ltd.",
    email: "",
    phone: "",
    address: "Pathari-Shanischare-1, Morang, Nepal",
    website: "",
  },
  social: {
    linkedin: "",
  },
  admin: {
    name: "Admin",
    email: "",
  },
  notifications: {
    newEnquiry: true,
    newClient: true,
    testimonial: false,
  },
};

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function persist(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: loadSettings(),
  reducers: {
    updateCompany(state, action) {
      state.company = { ...state.company, ...action.payload };
      persist(state);
    },
    updateSocial(state, action) {
      state.social = { ...state.social, ...action.payload };
      persist(state);
    },
    updateAdmin(state, action) {
      state.admin = { ...state.admin, ...action.payload };
      persist(state);
    },
    toggleNotification(state, action) {
      const key = action.payload;
      state.notifications[key] = !state.notifications[key];
      persist(state);
    },
  },
});

export const { updateCompany, updateSocial, updateAdmin, toggleNotification } =
  settingsSlice.actions;
export default settingsSlice.reducer;
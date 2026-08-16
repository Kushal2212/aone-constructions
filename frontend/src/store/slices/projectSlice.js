import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadFromStorage } from "../../services/localStorage";
import { projects as seedProjects } from "../../data/projects";

const STORAGE_KEY = "projects";

function withPublishedDefault(items) {
  return items.map((item) => ({
    published: true,
    ...item,
  }));
}

const initialState = {
  items: withPublishedDefault(loadFromStorage(STORAGE_KEY, seedProjects)),
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProjectImage: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(payload) {
        return {
          payload: {
            id: nanoid(),
            title: payload.title,
            category: payload.category,
            description: payload.description,
            location: payload.location,
            imageUrl: payload.imageUrl,
            published: true,
            createdAt: new Date().toISOString().slice(0, 10),
          },
        };
      },
    },
    updateProject(state, action) {
      const { id, changes } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (item) Object.assign(item, changes);
    },
    toggleProjectPublished(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.published = !item.published;
    },
    removeProject(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addProjectImage,
  updateProject,
  toggleProjectPublished,
  removeProject,
} = projectSlice.actions;

export const PROJECT_STORAGE_KEY = STORAGE_KEY;
export default projectSlice.reducer;

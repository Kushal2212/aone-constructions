import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadFromStorage } from "../../services/localStorage";
import { gallery as seedGallery } from "../../data/gallery";

const STORAGE_KEY = "gallery";

function withPublishedDefault(items) {
  return items.map((item) => ({
    published: true,
    ...item,
  }));
}

const initialState = {
  items: withPublishedDefault(loadFromStorage(STORAGE_KEY, seedGallery)),
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    addGalleryImage: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ title, category, imageUrl }) {
        return {
          payload: {
            id: nanoid(),
            title,
            category,
            imageUrl,
            published: true,
            createdAt: new Date().toISOString().slice(0, 10),
          },
        };
      },
    },
    updateGalleryImage(state, action) {
      const { id, changes } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (item) Object.assign(item, changes);
    },
    toggleGalleryPublished(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.published = !item.published;
    },
    removeGalleryImage(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addGalleryImage,
  updateGalleryImage,
  toggleGalleryPublished,
  removeGalleryImage,
} = gallerySlice.actions;

export const GALLERY_STORAGE_KEY = STORAGE_KEY;
export default gallerySlice.reducer;

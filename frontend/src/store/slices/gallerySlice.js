import { createSlice, nanoid } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../services/localStorage';
import { gallery as seedGallery } from '../../data/gallery';

const STORAGE_KEY = 'gallery';

const initialState = {
  items: loadFromStorage(STORAGE_KEY, seedGallery),
};

const gallerySlice = createSlice({
  name: 'gallery',
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
            createdAt: new Date().toISOString().slice(0, 10),
          },
        };
      },
    },
    removeGalleryImage(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addGalleryImage, removeGalleryImage } = gallerySlice.actions;
export const GALLERY_STORAGE_KEY = STORAGE_KEY;
export default gallerySlice.reducer;

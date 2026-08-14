import { createSlice, nanoid } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../services/localStorage';
import { testimonials as seedTestimonials } from '../../data/testimonials';

const STORAGE_KEY = 'testimonials';

const initialState = {
  items: loadFromStorage(STORAGE_KEY, seedTestimonials),
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    addTestimonial: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ clientName, role, message, rating }) {
        return {
          payload: {
            id: nanoid(),
            clientName,
            role,
            message,
            rating: rating || 5,
            published: false,
            createdAt: new Date().toISOString().slice(0, 10),
          },
        };
      },
    },
    updateTestimonial(state, action) {
      const { id, changes } = action.payload;
      const target = state.items.find((item) => item.id === id);
      if (target) Object.assign(target, changes);
    },
    togglePublished(state, action) {
      const target = state.items.find((item) => item.id === action.payload);
      if (target) target.published = !target.published;
    },
    deleteTestimonial(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addTestimonial,
  updateTestimonial,
  togglePublished,
  deleteTestimonial,
} = testimonialsSlice.actions;
export const TESTIMONIALS_STORAGE_KEY = STORAGE_KEY;
export default testimonialsSlice.reducer;

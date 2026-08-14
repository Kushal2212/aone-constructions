import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import enquiriesReducer from './slices/enquiriesSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import galleryReducer from './slices/gallerySlice';
import clientsReducer from "./slices/clientSlice";
import persistMiddleware from './persistMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    enquiries: enquiriesReducer,
    testimonials: testimonialsReducer,
    gallery: galleryReducer,
    clients: clientsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});

export default store;

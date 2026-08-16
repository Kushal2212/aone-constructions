import { saveToStorage } from '../services/localStorage';
import { ENQUIRIES_STORAGE_KEY } from './slices/enquiriesSlice';
import { TESTIMONIALS_STORAGE_KEY } from './slices/testimonialsSlice';
import { GALLERY_STORAGE_KEY } from './slices/gallerySlice';
import { CLIENTS_STORAGE_KEY } from './slices/clientSlice';
import { PROJECT_STORAGE_KEY } from './slices/projectSlice';
import { projects } from '@/data/projects';

const PERSISTED_SLICES = {
  enquiries: { key: ENQUIRIES_STORAGE_KEY, select: (state) => state.enquiries.items },
  testimonials: { key: TESTIMONIALS_STORAGE_KEY, select: (state) => state.testimonials.items },
  gallery: { key: GALLERY_STORAGE_KEY, select: (state) => state.gallery.items },
  clients: { key: CLIENTS_STORAGE_KEY, select: (state) => state.clients.items },
  projects: { key: PROJECT_STORAGE_KEY, select: (state) => state.projects.items },
};

export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const sliceName = typeof action.type === 'string' ? action.type.split('/')[0] : null;
  const target = sliceName && PERSISTED_SLICES[sliceName];
  if (target) {
    saveToStorage(target.key, target.select(store.getState()));
  }
  return result;
};

export default persistMiddleware;

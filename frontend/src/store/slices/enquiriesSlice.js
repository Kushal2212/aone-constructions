import { createSlice, nanoid } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../services/localStorage';
import { enquiries as seedEnquiries } from '../../data/enquiries';

const STORAGE_KEY = 'enquiries';

const initialState = {
  items: loadFromStorage(STORAGE_KEY, seedEnquiries),
};

const enquiriesSlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    submitEnquiry: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ name, email, phone, message }) {
        return {
          payload: {
            id: nanoid(),
            name,
            email,
            phone,
            message,
            status: 'new',
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    setEnquiryStatus(state, action) {
      const { id, status } = action.payload;
      const target = state.items.find((item) => item.id === id);
      if (target) target.status = status;
    },
    deleteEnquiry(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { submitEnquiry, setEnquiryStatus, deleteEnquiry } = enquiriesSlice.actions;
export const ENQUIRIES_STORAGE_KEY = STORAGE_KEY;
export default enquiriesSlice.reducer;

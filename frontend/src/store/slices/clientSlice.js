import { createSlice, nanoid } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../services/localStorage';
import { clients as seedClients } from '../../data/clients';

const STORAGE_KEY = 'clients';

const initialState = {
  items: loadFromStorage(STORAGE_KEY, seedClients),
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ name, phone, email, address, status, notes }) {
        return {
          payload: {
            id: nanoid(),
            name,
            phone,
            email,
            address,
            status: status || 'lead',
            notes: notes || '',
            createdAt: new Date().toISOString().slice(0, 10),
          },
        };
      },
    },
    updateClient(state, action) {
      const { id, changes } = action.payload;
      const target = state.items.find((item) => item.id === id);
      if (target) Object.assign(target, changes);
    },
    deleteClient(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addClient, updateClient, deleteClient } = clientsSlice.actions;
export const CLIENTS_STORAGE_KEY = STORAGE_KEY;
export default clientsSlice.reducer;

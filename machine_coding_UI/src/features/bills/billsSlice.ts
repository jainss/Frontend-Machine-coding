import { createSlice } from '@reduxjs/toolkit';
import { type Bill } from '../../types';
import { loadFromStorage, saveToStorage } from '../../utils/localStorage';

const initialState: Bill[] = loadFromStorage('bills') || [];

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setBills: (_, action) => {
      saveToStorage('bills', action.payload);
      return action.payload;
    },
    addBill: (state, action) => {
      state.push(action.payload);
      saveToStorage('bills', state);
    },
    editBill: (state, action) => {
      const idx = state.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
      saveToStorage('bills', state);
    },
    deleteBill: (state, action) => {
      const updated = state.filter(b => b.id !== action.payload);
      saveToStorage('bills', updated);
      return updated;
    },
  },
});

export const { setBills, addBill, editBill, deleteBill } = billsSlice.actions;
export default billsSlice.reducer;

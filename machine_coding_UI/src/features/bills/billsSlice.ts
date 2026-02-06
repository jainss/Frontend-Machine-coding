import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '../../utils/localStorage';

/* Bill type */
export interface Bill {
  id: string;
  description: string;
  amount: number;
  friendIds: string[];
  splitAmount: number;
}

/* Initial state from localStorage */
const initialState: Bill[] = loadFromStorage('bills') || [];

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    /* Set bills (used on app load) */
    setBills: (_state, action: PayloadAction<Bill[]>) => {
      saveToStorage('bills', action.payload);
      return action.payload;
    },

    /* Add new bill */
    addBill: (state, action: PayloadAction<Bill>) => {
      state.push(action.payload);
      saveToStorage('bills', state);
    },

    /* Edit existing bill */
    editBill: (state, action: PayloadAction<Bill>) => {
      const index = state.findIndex(
        bill => bill.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
        saveToStorage('bills', state);
      }
    },

    /* Delete bill */
    deleteBill: (state, action: PayloadAction<string>) => {
      const updatedBills = state.filter(
        bill => bill.id !== action.payload
      );
      saveToStorage('bills', updatedBills);
      return updatedBills;
    },
  },
});

export const {
  setBills,
  addBill,
  editBill,
  deleteBill,
} = billsSlice.actions;

export default billsSlice.reducer;

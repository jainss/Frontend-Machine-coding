import { createSlice } from '@reduxjs/toolkit';
import { type Friend } from '../../types';
import { loadFromStorage, saveToStorage } from '../../utils/localStorage';

const initialState: Friend[] = loadFromStorage('friends') || [];

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (_, action) => {
      saveToStorage('friends', action.payload);
      return action.payload;
    },
    addFriend: (state, action) => {
      state.push(action.payload);
      saveToStorage('friends', state);
    },
    editFriend: (state, action) => {
      const f = state.find(x => x.id === action.payload.id);
      if (f) f.name = action.payload.name;
      saveToStorage('friends', state);
    },
    deleteFriend: (state, action) => {
      const updated = state.filter(f => f.id !== action.payload);
      saveToStorage('friends', updated);
      return updated;
    },
  },
});

export const { setFriends, addFriend, editFriend, deleteFriend } =
  friendsSlice.actions;
export default friendsSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from '../features/friends/friendsSlice';
import billsReducer from '../features/bills/billsSlice';

export const store = configureStore({
  reducer: {
    friends: friendsReducer,
    bills: billsReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

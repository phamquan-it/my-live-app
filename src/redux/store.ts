// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import someSliceReducer from './slices/someSlice';
import userSliceReducer from './slices/userSlice'

const rootReducer = combineReducers({
  someSlice: someSliceReducer,
  userSlice: userSliceReducer 
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
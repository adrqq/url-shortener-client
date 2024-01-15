/* eslint-disable max-len */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootSlice from './slices/rootSlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  rootSlice,
  authSlice,
  userSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore();
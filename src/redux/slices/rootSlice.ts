import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../interfaces/RootState';
import { ShortUrlModel } from '../../models/response/ShortUrlModel';

const initialState: RootState = {
  app: '',
  isUserProfileModalOpen: false,
  isFindModalOpen: false,
  shortenedUrls: [],
  isTableLoading: false,
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setIsUserProfileModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserProfileModalOpen = action.payload;
    },
    setIsFindModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isFindModalOpen = action.payload;
    },
    setShortenedUrls: (state, action: PayloadAction<ShortUrlModel[]>) => {
      state.shortenedUrls = action.payload;
    },
    setIsTaleLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    }
  },
});

export const {
  setIsUserProfileModalOpen,
  setIsFindModalOpen,
  setShortenedUrls,
  setIsTaleLoading
} = rootSlice.actions;

export default rootSlice.reducer;
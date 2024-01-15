import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';

interface UserState {
  selectedUser: IUser;

}

const initialState: UserState = {
  selectedUser: {} as IUser,
};

export const getUserById = createAsyncThunk(
  'getUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserById(userId);

      return response.data;
    } catch (error) {
      console.error('getUserById error:', error); // Debugging
      return rejectWithValue(false);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async (user: IUser, { rejectWithValue }) => {
    try {
      // const response = await UserService.updateUserProfile(
      //   user
      // );
      // console.log('updateUserProfile response:', response); // Debugging

      // return response.data;
    } catch (error) {
      console.error('updateUserProfile error:', error); // Debugging
      return rejectWithValue(false);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;

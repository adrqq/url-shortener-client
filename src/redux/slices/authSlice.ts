import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import AuthService from "../../services/AuthService";


interface AuthState {
  user: IUser;
  isUserAuth: boolean;
  activationEmail: string;

  isLoginLoading: boolean;
  isLoginError: boolean;

  isRegisterLoading: boolean;
  isRegisterError: boolean;
}

const initialState: AuthState = {
  user: {
    id: "1",
    nickname: "Jhon Doe",
    email: "hello@gmail.com",
    isActivated: false,
    isAdmin: false,
  } as IUser,
  isUserAuth: false,
  activationEmail: "",

  isLoginLoading: false,
  isLoginError: false,

  isRegisterLoading: false,
  isRegisterError: false,
};

export const login = createAsyncThunk(
  "login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("payload", payload);
      const response = await AuthService.login(payload.email, payload.password);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
      }

      console.log("response", response.data.user.id);

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(false);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (
    payload: {
      email: string;
      password: string;
      nickname: string;
      adminCredentials: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.register(
        payload.email,
        payload.password,
        payload.nickname,
        payload.adminCredentials
      );

      console.log("response", response.data.user.id);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);

        return response.data.user;
      }

      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(false);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.checkAuth();

      console.log('response', response);

      localStorage.setItem('token', response.data.accessToken);

      if (typeof response.data === 'string') {
        return rejectWithValue(response.data as string);
      }

      if (response.status === 200) {
        return response.data.user;
      }

      return rejectWithValue(response.data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const logout = createAsyncThunk(
  'logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.logout();

      localStorage.removeItem('token');

      if (response.status === 200) {
        return response.data;
      }

      return rejectWithValue(response.data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    }
  },
  extraReducers: {
    [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.activationEmail = action.payload.email;
      state.isUserAuth = true;
      state.user = action.payload;
      state.isLoginLoading = false;
      state.isLoginError = false;
    },
    [login.rejected.type]: (state) => {
      state.isLoginLoading = false;
      state.isLoginError = true;
    },
    [login.pending.type]: (state) => {
      state.isLoginLoading = true;
      state.isLoginError = false;
    },

    [register.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.activationEmail = action.payload.email;
      state.isRegisterLoading = false;
      state.isRegisterError = false;
    },
    [register.rejected.type]: (state) => {
      state.isRegisterLoading = false;
      state.isRegisterError = true;
    },
    [register.pending.type]: (state) => {
      state.isRegisterLoading = true;
      state.isRegisterError = false;
    },

    [checkAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isUserAuth = true;
      state.user = action.payload;
      console.log("checkAuth", action.payload);
    },
    [checkAuth.rejected.type]: (state, action) => {
      const email = action.payload as string;

      state.isUserAuth = false;
      state.user = {} as IUser;
      state.activationEmail = email;
      console.log('checkAuth.rejected', action.payload);
    },
    [logout.fulfilled.type]: (state) => {
      state.isUserAuth = false;
      state.user = {} as IUser;
      state.activationEmail = "";

      localStorage.removeItem('token');
    }
  }

});

export const {
  setUser,
} = authSlice.actions;

export default authSlice.reducer;

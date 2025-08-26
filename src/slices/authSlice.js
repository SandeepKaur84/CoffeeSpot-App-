import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import { saveToken, removeToken, getToken } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/users/login', credentials);
      const token = res.data.token;
      const user = res.data.user;

      await saveToken(token);
      await AsyncStorage.setItem('user', JSON.stringify(user)); 

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/register', userData);
      const { token, user } = response.data;

      await saveToken(token);
      await AsyncStorage.setItem('user', JSON.stringify(user)); 

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

// Load token + user from storage
export const loadUserFromStorage = createAsyncThunk('auth/loadUser', async () => {
  const token = await getToken();
  const userData = await AsyncStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  return token ? { token, user } : null;
});

// Update user profile (local only, no backend yet)
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (updatedUser, { getState }) => {
    const { auth } = getState();
    const newUser = { ...auth.user, ...updatedUser };

    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  }
);

// Add a shortcut thunk for avatar updates
export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (avatarUri, { dispatch }) => {
    return dispatch(updateUser({ avatar: avatarUri })).unwrap();
  }
);


// Logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await removeToken();
  await AsyncStorage.removeItem('user');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Load from storage
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      })

      // Update profile
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, state => {
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;

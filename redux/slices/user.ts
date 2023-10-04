import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createClientClient } from '../../lib/supabase-client';
import { UserState } from '../../types/redux/user.type';
import { UserResponse } from '@supabase/supabase-js';

function preprocessUserData(rawUserData: UserResponse | null) {
  if (!rawUserData || rawUserData.error) {
    return {
      loading: false,
      user: null,
      error: rawUserData?.error.message ?? 'error'
    };
  }
  return {
    error: null,
    user: rawUserData.data.user,
    loading: false
  };
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const fetchUser = createAsyncThunk('fetch/user', async () => {
  const supabase = createClientClient();
  const response = await supabase.auth.getUser();

  const processedData = preprocessUserData(response);

  return processedData;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = action.payload.loading;
        state.user = action.payload.user;
        state.error = action.payload.error;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = 'error';
      });
  }
});

export default userSlice.reducer;

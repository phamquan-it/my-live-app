// store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/pages/api/axiosClient";
import { RootState } from "../store";

interface User {
  id: string;
  // Add other user fields here
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUserList = createAsyncThunk(
  'user/fetchUserList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/user/list?language=en&limit=10&offset=5');
      return response.data; // Assuming the response contains the list of users
    } catch (error: any) {
      console.log("An error occurred");
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, { getState, rejectWithValue }) => {
    const state:any = getState() as RootState;
    const existingUser = state.user.users.find((user:any) => user.id === userId);
    if (existingUser) {
      return existingUser;
    }
    try {
      const response = await axiosClient.get(`/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.log("An error occurred");
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    user_info: () => {
      console.log("user info");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        console.log("Error fetching user list");
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const fetchedUser = action.payload;
        const existingUser = state.users.find(user => user.id === fetchedUser.id);
        if (!existingUser) {
          state.users.push(fetchedUser);
        }
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        console.log("Error fetching user");
        state.error = action.payload as string;
      });
  },
});

export const { user_info } = userSlice.actions;
export default userSlice.reducer;

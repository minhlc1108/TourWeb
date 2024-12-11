import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "~/apis";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk('users/signIn', async ({username, password}) => {
  const response = await loginAPI(username, password)
  if (response.token) {
    localStorage.setItem("authToken", response.token);
    return {
      userName: response.userName,
      email: response.email,
      isAdmin: response.isAdmin,
    };
}});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("authToken");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
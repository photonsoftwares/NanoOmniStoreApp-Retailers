// userProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

initialState = {
  userDetails: null,
}
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state, action) => {
      state.userDetails = null;
    },
  },
});

export const { updateUserDetails,clearUserDetails } = userProfileSlice.actions;
export const selectUserProfile = (state) => state.userProfile;

export default userProfileSlice.reducer;

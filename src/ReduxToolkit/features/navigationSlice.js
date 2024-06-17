// navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentScreen: 'Home',
  },
  reducers: {
    setScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setScreen } = navigationSlice.actions;
export const selectNavigationState = (state) => state.navigation;

export default navigationSlice.reducer;

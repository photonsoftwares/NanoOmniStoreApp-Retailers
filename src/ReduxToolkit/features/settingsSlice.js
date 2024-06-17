// settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
    language: 'en',
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { toggleDarkMode, setLanguage } = settingsSlice.actions;
export const selectSettingsState = (state) => state.settings;

export default settingsSlice.reducer;

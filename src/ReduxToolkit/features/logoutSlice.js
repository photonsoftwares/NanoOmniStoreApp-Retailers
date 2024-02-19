// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from '../store';

initialState = {
    user: [],
}

const logoutSlice = createSlice({
    name: 'reset',
    initialState,
    reducers: {
        logOut: (state, action) => {
            // state.isAuthenticated = true;
            // state.user = action.payload;
            // rootReducer()

        },
    },
});

export const { logOut } = logoutSlice.actions;

export default logoutSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

initialState = {
    dashboard: {}
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboard: (state, action) => {
            return {
                ...state,
                dashboard: action.payload,
            };
        },

    },
});

export const { setDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;

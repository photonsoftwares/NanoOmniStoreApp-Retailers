import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchData: [],
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            return {
                ...state,
                searchData: action.payload,
            };
        },

    },
});

export const { setSearch } = searchSlice.actions;


export default searchSlice.reducer;

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
        clearSearch: (state, action) => {
            return {
                ...state,
                searchData: [],
            };
        },

    },
});

export const { setSearch, clearSearch } = searchSlice.actions;


export default searchSlice.reducer;

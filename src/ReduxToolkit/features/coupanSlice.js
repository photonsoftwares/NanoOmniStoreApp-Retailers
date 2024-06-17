import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCoupanData: [],
};

export const coupanSlice = createSlice({
    name: 'coupan',
    initialState,
    reducers: {
        setCoupan: (state, action) => {
            return {
                ...state,
                allCoupanData: action.payload,
            };
        },
        clearCoupan: (state, action) => {
            state.productsData = [],
                state.allCoupanData = []
        },
    },
});

export const { setCoupan, clearCoupan, } = coupanSlice.actions;

// export const selectProducts = state => state.products.data;
// export const selectCurrentPage = state => state.products.currentPage;
// export const selectTotalPages = state => state.products.totalPages;

export default coupanSlice.reducer;

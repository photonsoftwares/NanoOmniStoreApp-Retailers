import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allWalletData: [],
};

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWallet: (state, action) => {
            return {
                ...state,
                allWalletData: action.payload,
            };
        },
        clearWallet: (state, action) => {
            state.productsData = [],
                state.allWalletData = []
        },
    },
});

export const { setWallet, clearWallet, } = walletSlice.actions;

export const selectProducts = state => state.products.data;
export const selectCurrentPage = state => state.products.currentPage;
export const selectTotalPages = state => state.products.totalPages;

export default walletSlice.reducer;

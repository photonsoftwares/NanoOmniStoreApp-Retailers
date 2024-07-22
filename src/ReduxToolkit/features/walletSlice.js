import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allWalletData: [],
    retailerWallet: 0,
    allRetailerWallet: []
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
        setAllRetailerWallet: (state, action) => {
            return {
                ...state,
                allRetailerWallet: action.payload,
            };
        },
        clearAllRetailerWallet: (state, action) => {
            state.productsData = [],
                state.allRetailerWallet = []
        },
        setRetailerWallet: (state, action) => {
            return {
                ...state,
                retailerWallet: action.payload,
            };
        },
        clearRetailerWallet: (state, action) => {
            state.productsData = [],
                state.retailerWallet = []
        },
    },
});

export const {
    setWallet,
    clearWallet,
    setRetailerWallet,
    clearRetailerWallet,
    setAllRetailerWallet,
    clearAllRetailerWallet
} = walletSlice.actions;

export const selectProducts = state => state.products.data;
export const selectCurrentPage = state => state.products.currentPage;
export const selectTotalPages = state => state.products.totalPages;

export default walletSlice.reducer;

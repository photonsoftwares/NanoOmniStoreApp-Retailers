import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsData: [],
  productsCurrentPage: 1,
  productsTotalPages: 1,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        productsData: action.payload,
      };
    },
    addPageData: (state, action) => {
      return {
        ...state,
        productsData: [...state.ordersData, ...action.payload],
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        productsCurrentPage: action.payload,
      };
    },
    setTotalPages: (state, action) => {
      return {
        ...state,
        productsTotalPages: action.payload,
      };
    },
  },
});

export const { setProducts, addPageData, setCurrentPage, setTotalPages } = productsSlice.actions;

export const selectProducts = state => state.products.data;
export const selectCurrentPage = state => state.products.currentPage;
export const selectTotalPages = state => state.products.totalPages;

export default productsSlice.reducer;

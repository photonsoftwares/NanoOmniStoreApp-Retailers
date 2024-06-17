import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsData: [],
  productsCurrentPage: 1,
  productsTotalPages: 1,
  categoryData: []
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
    setCategoryData: (state, action) => {
      return {
        ...state,
        categoryData: action.payload,
      };
    },
    clearProducts: (state, action) => {
      state.productsData = [],
        state.productsCurrentPage = 1,
        state.productsTotalPages = 1,
        state.categoryData = []
    },
  },
});

export const { setProducts, addPageData, setCurrentPage, setTotalPages, setCategoryData, clearProducts } = productsSlice.actions;

export const selectProducts = state => state.products.data;
export const selectCurrentPage = state => state.products.currentPage;
export const selectTotalPages = state => state.products.totalPages;

export default productsSlice.reducer;

// categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryData: [],       // List of categories
        categoryCurrentPage: 1, // Current page for categories
        categoryTotalPages: 1,  // Total pages for categories
    },
    reducers: {
        setCategoriesData: (state, action) => {
            return {
                ...state,
                categoryData: action.payload,
            };
        },
        addCategoriesPageData: (state, action) => {
            return {
                ...state,
                categoryData: [...state.categoryData, ...action.payload],
            };
        },
        setCurrentCategoryPage: (state, action) => {
            return {
                ...state,
                categoryCurrentPage: action.payload,
            };
        },
        setTotalCategoryPages: (state, action) => {
            return {
                ...state,
                categoryTotalPages: action.payload,
            };
        },
    },
});

export const { setCategoriesData, setCurrentCategoryPage, setTotalCategoryPages,addCategoriesPageData } = categoriesSlice.actions;
export default categoriesSlice.reducer;

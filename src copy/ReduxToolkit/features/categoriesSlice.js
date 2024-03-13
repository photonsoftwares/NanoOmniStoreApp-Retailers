// categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryData: [],
        categoryCurrentPage: 1,
        categoryTotalPages: 1,
        selectedCategory: ''
    },
    reducers: {
        setCategoriesData: (state, action) => {
            return {
                ...state,
                categoryData: action.payload,
            };
        },
        setSelectedCategory: (state, action) => {
            return {
                ...state,
                selectedCategory: action.payload,
            };
        },
        addCategoriesPageData: (state, action) => {
            return {
                ...state,
                categoryData: [...state.categoryData, ...action.payload],
            };
        },
        setCurrentCategoryPage: (state, action) => {
            // console.log("mm",action.payload)
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
        clearCategoryData: (state, action) => {
            state.categoryData = [],
                state.categoryCurrentPage = 1,
                state.categoryTotalPages = 1

        },
    },
});

export const { setCategoriesData, setCurrentCategoryPage, setTotalCategoryPages, addCategoriesPageData, clearCategoryData,setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

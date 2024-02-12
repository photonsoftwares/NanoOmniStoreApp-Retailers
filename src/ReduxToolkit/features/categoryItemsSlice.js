// categoryItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const categoryItemsSlice = createSlice({
    name: 'categoryItems',
    initialState: {
        categoryItemsData: [],       // List of category items
        categoryItemsCurrentPage: 1, // Current page for category items
        categoryItemsTotalPages: 1,  // Total pages for category items
    },
    reducers: {
        setCategoryItemsData: (state, action) => {
            return {
                ...state,
                categoryItemsData: action.payload,
            };
        },
        addCategoriesItemPageData: (state, action) => {
            return {
                ...state,
                categoryItemsData: [...state.categoryItemsData, ...action.payload],
            };
        },
        setCurrentCategoryItemPage: (state, action) => {
            return {
                ...state,
                categoryItemsCurrentPage: action.payload,
            };
        },
        setTotalCategoryItemPages: (state, action) => {
            return {
                ...state,
                categoryItemsTotalPages: action.payload,
            };
        },
    },
});

export const { setCategoryItemsData, setCurrentCategoryItemPage, setTotalCategoryItemPages, addCategoriesItemPageData } = categoryItemsSlice.actions;
export default categoryItemsSlice.reducer;

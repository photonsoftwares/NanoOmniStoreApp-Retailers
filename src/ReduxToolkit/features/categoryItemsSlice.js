// categoryItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const categoryItemsSlice = createSlice({
    name: 'categoryItems',
    initialState: {
        categoryItemsData: [],
        categoryItemsCurrentPage: 1,
        categoryItemsTotalPages: 1,
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
        clearCategoryItemPages: (state, action) => {
            state.categoryItemsData = [],
                state.categoryItemsCurrentPage = 1,
                state.categoryItemsTotalPages = 1
        }
    },
});

export const { setCategoryItemsData, setCurrentCategoryItemPage, setTotalCategoryItemPages, addCategoriesItemPageData ,clearCategoryItemPages} = categoryItemsSlice.actions;
export default categoryItemsSlice.reducer;

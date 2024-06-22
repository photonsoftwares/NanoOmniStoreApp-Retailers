// categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mainCategorySlice = createSlice({
    name: 'masterCategory',
    initialState: {
        masterCategory: [],
        subCategory: [],
        subCategoryItems: [],
        selectedSubCategory: '',
        selectedMasterCategory: '',
        subCategoryItemsPage: 1,
        subCategoryItemsTotalPage: null

    },
    reducers: {
        setMasterCategoryData: (state, action) => {
            return {
                ...state,
                masterCategory: action.payload,
            };
        },
        setSubCategoryCategory: (state, action) => {
            return {
                ...state,
                subCategory: action.payload,
            };
        },
        setSubCategoryItemsData: (state, action) => {
            return {
                ...state,
                subCategoryItems: action.payload,
            };
        },
        addMoreSubCategoryItemsData: (state, action) => {
            return {
              ...state,
              subCategoryItems: [...state.subCategoryItems, ...action.payload],
            };
          },      


        setSelectedSubCategory: (state, action) => {
            return {
                ...state,
                selectedSubCategory: action.payload,
            };
        },
        setSelectedMasterCategory: (state, action) => {
            return {
                ...state,
                selectedMasterCategory: action.payload,
            };
        },
        setSubCategoryItemsPage: (state, action) => {
            return {
                ...state,
                subCategoryItemsPage: action.payload,
            };
        },
        setSubCategoryItemsTotalPage: (state, action) => {
            return {
                ...state,
                subCategoryItemsTotalPage: action.payload,
            };
        },

    },
});

export const { setMasterCategoryData,
    setSubCategoryCategory,
    setSubCategoryItemsData,
    setSelectedSubCategory,
    setSelectedMasterCategory,
    setSubCategoryItemsPage,
    addMoreSubCategoryItemsData,
    setSubCategoryItemsTotalPage
} = mainCategorySlice.actions;
export default mainCategorySlice.reducer;

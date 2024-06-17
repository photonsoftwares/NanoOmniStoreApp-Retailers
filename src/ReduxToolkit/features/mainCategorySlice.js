// categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mainCategorySlice = createSlice({
    name: 'masterCategory',
    initialState: {
        masterCategory: [],
        subCategory: [],
        subCategoryItems: [],
        selectedSubCategory: '',
        selectedMasterCategory: ''
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

    },
});

export const { setMasterCategoryData, setSubCategoryCategory, setSubCategoryItemsData, setSelectedSubCategory,setSelectedMasterCategory } = mainCategorySlice.actions;
export default mainCategorySlice.reducer;

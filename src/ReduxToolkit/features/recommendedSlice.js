import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recommendedData: [],
    recommendedCurrentPage: 1,
    recommendedTotalPages: 1,
};

export const recommendedSlice = createSlice({
    name: 'recommended',
    initialState,
    reducers: {
        setRecommended: (state, action) => {
            return {
                ...state,
                recommendedData: action.payload,
            };
        },
        clearRecommended: (state, action) => {
            return {
                ...state,
                recommendedData: [],
            };
        },
        addRecommendedPageData: (state, action) => {
            return {
                ...state,
                recommendedData: [...state.recommendedData, ...action.payload],
            };
        },
        setRecommendedCurrentPage: (state, action) => {
            return {
                ...state,
                recommendedCurrentPage: action.payload,
            };
        },
        setRecommendedTotalPages: (state, action) => {
            return {
                ...state,
                recommendedTotalPages: action.payload,
            };
        },
    },
});

export const { setRecommended, addRecommendedPageData, setRecommendedCurrentPage, setRecommendedTotalPages,clearRecommended } = recommendedSlice.actions;

export const selectRecommended = (state) => state.recommended.recommendedData;
export const selectRecommendedCurrentPage = (state) => state.recommended.recommendedCurrentPage;
export const selectRecommendedTotalPages = (state) => state.recommended.recommendedTotalPages;

export default recommendedSlice.reducer;

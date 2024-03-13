// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     salesData: [],
//     salesCurrentPage: 1,
//     salesTotalPages: 1,
// };

// export const salesSlice = createSlice({
//     name: 'sales',
//     initialState,
//     reducers: {
//         setSales: (state, action) => {
//             return {
//                 ...state,
//                 salesData: action.payload,
//             };
//         },
//         addSalesPageData: (state, action) => {
//             return {
//                 ...state,
//                 salesData: [...state.recommendedData, ...action.payload],
//             };
//         },
//         setSalesCurrentPage: (state, action) => {
//             return {
//                 ...state,
//                 salesCurrentPage: action.payload,
//             };
//         },
//         setSalesTotalPages: (state, action) => {
//             return {
//                 ...state,
//                 salesTotalPages: action.payload,
//             };
//         },
//     },
// });

// export const { setSales, addSalesPageData, setSalesCurrentPage, setSalesTotalPages } = salesSlice.actions;

// export const selectSales = (state) => state.sales.salesData;
// export const selectSalesCurrentPage = (state) => state.sales.salesCurrentPage;
// export const selectSalesTotalPages = (state) => state.sales.salesTotalPages;

// export default salesSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const getCurrentDateInIndianFormat = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const year = currentDate.getFullYear();

    // Pad single-digit day and month with a leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
};

const initialState = {
    salesSummaryData: [],
    salesSummaryCurrentPage: 1,
    salesSummaryTotalPages: 1,
    startDate: getCurrentDateInIndianFormat(),
    endDate: getCurrentDateInIndianFormat(),

};

export const salesSummarySlice = createSlice({
    name: 'salesSummary',
    initialState,
    reducers: {
        setSalesSummary: (state, action) => {
            return {
                ...state,
                salesSummaryData: action.payload,
            };
        },
        addSalesSummaryPageData: (state, action) => {
            return {
                ...state,
                salesSummaryData: [...state.salesSummaryData, ...action.payload], // Fix typo here
            };
        },
        setSalesSummaryCurrentPage: (state, action) => {
            return {
                ...state,
                salesSummaryCurrentPage: action.payload,
            };
        },
        setSalesSummaryTotalPages: (state, action) => {
            return {
                ...state,
                salesSummaryTotalPages: action.payload,
            };
        },
        clearSalesSummary: (state, action) => {
            state.salesSummaryData = [],
                state.salesSummaryCurrentPage = 1,
                state.salesSummaryTotalPages = 1

        },
    },
});

export const { setSalesSummary, addSalesSummaryPageData, setSalesSummaryCurrentPage, setSalesSummaryTotalPages, clearSalesSummary } = salesSummarySlice.actions;

// export const selectSales = (state) => state.sales.salesData;
// export const selectSalesCurrentPage = (state) => state.sales.salesCurrentPage;
// export const selectSalesTotalPages = (state) => state.sales.salesTotalPages;

export default salesSummarySlice.reducer;

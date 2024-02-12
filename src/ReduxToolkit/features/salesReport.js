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
    salesReportData: [],
    salesReportCurrentPage: 1,
    salesReportTotalPages: 1,
    startDate: getCurrentDateInIndianFormat(),
    endDate: getCurrentDateInIndianFormat(),
};

export const salesReportSlice = createSlice({
    name: 'salesReport',
    initialState,
    reducers: {
        setSalesReport: (state, action) => {
            // console.log("<Slice>",action.payload)
            return {
                ...state,
                salesReportData: action.payload,
            };
        },
        addSalesReportPageData: (state, action) => {
            return {
                ...state,
                salesReportData: [...state.salesData, ...action.payload], // Fix typo here
            };
        },
        setSalesReportCurrentPage: (state, action) => {
            return {
                ...state,
                salesReportCurrentPage: action.payload,
            };
        },
        setSalesReportTotalPages: (state, action) => {
            return {
                ...state,
                salesReportTotalPages: action.payload,
            };
        },
        setStartDate: (state, action) => {
            return {
                ...state,
                startDate: action.payload,
            };
        },
    },
});

export const { setSalesReport, addSalesReportPageData, setSalesReportCurrentPage, setSalesReportTotalPages, setStartDate } = salesReportSlice.actions;

export const selectSalesReport = (state) => state.salesReport.salesReportData;
export const selectSalesReportCurrentPage = (state) => state.salesReport.salesReportCurrentPage;
export const selectSalesReportTotalPages = (state) => state.salesReport.salesReportTotalPages;

export default salesReportSlice.reducer;

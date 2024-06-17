// uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const customerListSlice = createSlice({
  name: 'customerList',
  initialState: {
    customerListData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCustomerList: (state, action) => {
      return {
        ...state,
        customerListData: action.payload,
      };
    },
  },
});

export const { setLoading, setError, clearError,setCustomerList } = customerListSlice.actions;
export const selectCustomerListState = (state) => state.customerList;

export default customerListSlice.reducer;

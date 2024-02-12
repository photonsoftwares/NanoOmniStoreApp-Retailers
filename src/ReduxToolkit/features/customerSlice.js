// customerSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerData: [],
  customerAddresses: [],
  customerBookedOrders: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    setCustomerAddresses: (state, action) => {
      state.customerAddresses = action.payload;
    },
    setBookedOrders: (state, action) => {
      state.customerBookedOrders = action.payload;
    },
  },
});

export const {
  setCustomerData,
  setCustomerAddresses,
  setBookedOrders,
} = customerSlice.actions;

export default customerSlice.reducer;

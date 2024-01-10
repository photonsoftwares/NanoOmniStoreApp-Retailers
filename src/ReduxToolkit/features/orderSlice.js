// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    ordersData: [],
    ordersCurrentPage: 1,
    ordersTotalPages: 1,
  },
  reducers: {
    setOrders: (state, action) => {
      return {
        ...state,
        ordersData: action.payload,
      };

      // state.orders.push(action.payload);
    },
    addOrdersPageData: (state, action) => {
      return {
        ...state,
        ordersData: [...state.ordersData, ...action.payload],
      };
    },
    setOrdersCurrentPage: (state, action) => {
      return {
        ...state,
        ordersCurrentPage: action.payload,
      };
    },
    clearOrders: (state) => {
      state.ordersData = [];
    },
  },
});

export const { setOrders, addOrdersPageData, setOrdersCurrentPage, clearOrders } = orderSlice.actions;
export const selectOrderState = (state) => state.order;

export default orderSlice.reducer;

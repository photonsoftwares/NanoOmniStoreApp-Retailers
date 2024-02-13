// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    ordersData: [],
    ordersCurrentPage: 1,
    ordersTotalPages: 1,
    deliverditemdetails: []
  },
  reducers: {
    setOrders: (state, action) => {
      return {
        ...state,
        ordersData: action.payload,
      };

      // state.orders.push(action.payload);
    },
    clearOrderss: (state, action) => {
      return {
        ...state,
        ordersData: [],
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
    setDeliveredItems: (state, action) => {
      return {
        ...state,
        deliverditemdetails: action.payload,
      };

      // state.orders.push(action.payload);
    },

  },
});

export const { setOrders, addOrdersPageData, setOrdersCurrentPage, clearOrders,setDeliveredItems,clearOrderss } = orderSlice.actions;
export const selectOrderState = (state) => state.order;

export default orderSlice.reducer;

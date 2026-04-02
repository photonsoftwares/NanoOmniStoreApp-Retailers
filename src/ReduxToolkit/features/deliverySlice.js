import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  deliveryDetails: null,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDeliveryDetails: (state, action) => {
      state.deliveryDetails = action.payload;
    },
  },
});

export const {setDeliveryDetails} = deliverySlice.actions;
export default deliverySlice.reducer;
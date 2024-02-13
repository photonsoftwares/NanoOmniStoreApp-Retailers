// extraChargesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const extraChargesSlice = createSlice({
    name: 'extraCharges',
    initialState: {
        extraDeliveryCharges: false,
        extraDeliveryChargesValue: '0',
        extraMinOrderValueEnabled: false,
        extraMinOrderValue: '0',
    },
    reducers: {
        setExtraDeliveryChargesBoolean: (state, action) => {
            return {
                ...state,
                extraDeliveryCharges: action.payload,
            };
        },
        setExtraDeliveryChargesValue: (state, action) => {
            return {
                ...state,
                extraDeliveryChargesValue: action.payload,
            };
        },
        setExtraMinOrderValueBoolean: (state, action) => {
            return {
                ...state,
                extraMinOrderValueEnabled: action.payload,
            };
        },
        setExtraMinOrderValue: (state, action) => {
            return {
                ...state,
                extraMinOrderValue: action.payload,
            };
        },
        clearExtraDeliveryCharges: (state) => {
            return {
                ...state,
                extraDeliveryChargesValue: '0',
            };
        },
    },
});

export const {
    setExtraDeliveryChargesBoolean,
    setExtraDeliveryChargesValue,
    setExtraMinOrderValueBoolean,
    setExtraMinOrderValue,
    clearExtraDeliveryCharges,
} = extraChargesSlice.actions;

export default extraChargesSlice.reducer;

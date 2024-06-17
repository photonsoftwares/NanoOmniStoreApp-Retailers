import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inventory: [],
    inventoryCurrentPage: 1,
    inventoryTotalPages: 1,
};

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setInventory: (state, action) => {
            return {
                ...state,
                inventory: action.payload,
            };
        },
        addInventoryMoreData: (state, action) => {
            return {
                ...state,
                inventory: [...state.inventory, ...action.payload],
            };
        },
        setInventoryCurrentPage: (state, action) => {
            return {
                ...state,
                inventoryCurrentPage: action.payload,
            };
        },
        clearInventory: (state, action) => {
            state.inventory = [],
                state.inventoryCurrentPage = 1
        },
    },
});

export const { setInventory, addInventoryMoreData, setInventoryCurrentPage, clearInventory, } = inventorySlice.actions;

export const selectInventory = state => state.inventory.inventory;
export const selectInventoryPage = state => state.inventory.inventoryTotalPages;

export default inventorySlice.reducer;

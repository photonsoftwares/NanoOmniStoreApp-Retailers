// // cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     cartItems: [], // Array to store items in the cart
//     totalInvoiceAmount: null
// };

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addItemCart: (state, action) => {
//             // const newItem = action.payload;
//             // state.cartItems.push(newItem);
//             return {
//                 ...state,
//                 cartItems: action.payload,
//             };
//         },
//         removeItemCart: (state, action) => {
//             const itemIdToRemove = action.payload;
//             state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
//         },
//         clearCart: state => {
//             state.cartItems = [];
//         },
//     },
//     totalInVoiceCart: (state, action) => {
//         return {
//             ...state,
//             totalInvoiceAmount: action.payload,
//         };
//     },
// });

// export const { addItemCart, removeItemCart, clearCart, totalInVoiceCart } = cartSlice.actions;

// export const selectCartItems = state => state.cart.items;

// export default cartSlice.reducer;


// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [], // Array to store items in the cart
    totalInvoiceAmount: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemCart: (state, action) => {
            // const newItem = action.payload;
            // state.cartItems.push(newItem);
            return {
                ...state,
                cartItems: action.payload,
            };
        },
        removeItemCart: (state, action) => {
            const itemIdToRemove = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemIdToRemove);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        totalInVoiceCart: (state, action) => {
            return {
                ...state,
                totalInvoiceAmount: action.payload,
            };
        },
    },
});

export const { addItemCart, removeItemCart, clearCart, totalInVoiceCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;

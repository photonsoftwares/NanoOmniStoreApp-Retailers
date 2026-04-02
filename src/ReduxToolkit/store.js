import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './features/authSlice';
import userProfileReducer from './features/userProfileSlice';
import productReducer from './features/productSlice';
import loadingReducer from './features/loadingSlice';
import orderReducer from './features/orderSlice';
import customerReducer from './features/customerSlice';
import recommendedReducer from './features/recommendedSlice';
import categoriesReducer from './features/categoriesSlice';
import categoryItemsReducer from './features/categoryItemsSlice';
import cartReducer from './features/cartSlice';
import searchReducer from './features/searchSlice';
import salesReportReducer from './features/salesReport';
import salesSummaryReducer from './features/salesSummary';
import extraChargesReducer from './features/extraChargesSlice';
<<<<<<< HEAD
=======
import customerListReducer from './features/customerList';
import walletSliceReducer from './features/walletSlice';
import coupanSliceReducer from './features/coupanSlice';
import mainCategoryReducer from './features/mainCategorySlice';
import inventoryReducer from './features/InventorySlice';
import dashboardReducer from './features/dashboardSlice';
import deliveryReducer from './features/deliverySlice';
>>>>>>> 88a2e06 (all)



const appReducer = combineReducers({
    authReducer,
    productReducer,
    userProfileReducer,
    loadingReducer,
    orderReducer,
    customerReducer,
    recommendedReducer,
    categoriesReducer,
    categoryItemsReducer,
    cartReducer,
    searchReducer,
    salesReportReducer,
    salesSummaryReducer,
    extraChargesReducer,
<<<<<<< HEAD
=======
    customerListReducer,
    walletSliceReducer,
    coupanSliceReducer,

    mainCategoryReducer,
    inventoryReducer,
    dashboardReducer,
     deliveryReducer: deliveryReducer,
>>>>>>> 88a2e06 (all)
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'authReducer',
        'productReducer',
        'orderReducer',
        'recommendedReducer',
        'categoriesReducer',
        'categoryItemsReducer',
        'cartReducer',
        'extraChargesReducer',
        

    ], //Things you want to persist
    // blacklist: ['key3', 'key4'], //Things you don't want to persist
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                immutableCheck: false,
            },
        }),
});
export const persistor = persistStore(store);







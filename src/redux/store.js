import { configureStore } from "@reduxjs/toolkit";
import { getAllItemsSlice, postsloginSlice, getAllStoreSlice, addAdsSlice, deleteAdSlice } from './postSlice';
export const storeApp = configureStore( {
    reducer: {
        loginSlice: postsloginSlice.reducer,
        getAllItems: getAllItemsSlice.reducer,
        getAllStores: getAllStoreSlice.reducer,
        addAds: addAdsSlice.reducer,
        deleteAds: deleteAdSlice.reducer,
    }
    , devTools: true
} )
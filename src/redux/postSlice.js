import { createSlice } from "@reduxjs/toolkit";
import { getItems, postLogin, getStores, postAd } from "../api/postApi";


const initialStateLogin = {
    login: [],
    isLoading: false,
    erorr: null,
}
export const postsloginSlice = createSlice( {
    name: 'login',
    initialState: initialStateLogin
    , extraReducers: {
        [ postLogin.pending ]: ( state, action ) => {
            state.isLoading = true;
            state.erorr = null;
        },
        [ postLogin.fulfilled ]: ( state, action ) => {
            state.login = action.payload;
            state.isLoading = false;
            state.erorr = null;
        }
        , [ postLogin.rejected ]: ( state, action ) => {
            state.isLoading = false;
            state.erorr = action?.error?.message;
        }
    }
} )


const initialStateGetAllAds = {
    items: [],
    isLoading: false,
    erorr: null,
}
export const getAllItemsSlice = createSlice( {
    name: 'allAds',
    initialState: initialStateGetAllAds
    , extraReducers: {
        [ getItems.pending ]: ( state, action ) => {
            state.isLoading = true;
            state.erorr = null;
        },
        [ getItems.fulfilled ]: ( state, action ) => {
            state.items = action.payload;
            state.isLoading = false;
            state.erorr = null;
        }
        , [ getItems.rejected ]: ( state, action ) => {
            state.isLoading = false;
            state.erorr = action?.error?.message;
        }
    }
} )


const initialStateGetAllStore = {
    stores: [],
    isLoading: false,
    erorr: null,
}
export const getAllStoreSlice = createSlice( {
    name: 'AllStore',
    initialState: initialStateGetAllStore
    , extraReducers: {
        [ getStores.pending ]: ( state, action ) => {
            state.isLoading = true;
            state.erorr = null;
        },
        [ getStores.fulfilled ]: ( state, action ) => {
            state.stores = action.payload;
            state.isLoading = false;
            state.erorr = null;
        }
        , [ getStores.rejected ]: ( state, action ) => {
            state.isLoading = false;
            state.erorr = action?.error?.message;
        }
    }
} )


const initialStateAddAds = {
    response: [],
    isLoading: false,
    erorr: null,
}
export const addAdsSlice = createSlice( {
    name: 'AddAds',
    initialState: initialStateAddAds
    , extraReducers: {
        [ postAd.pending ]: ( state, action ) => {
            state.isLoading = true;
            state.erorr = null;
        },
        [ postAd.fulfilled ]: ( state, action ) => {
            state.response = action.payload;
            state.isLoading = false;
            state.erorr = null;
        }
        , [ postAd.rejected ]: ( state, action ) => {
            state.isLoading = false;
            state.erorr = action?.error?.message;
        }
    }
} )


const initialStateDelete = {
    response: [],
    isLoading: false,
    erorr: null,
}
export const deleteAdSlice = createSlice( {
    name: 'DeleteAd',
    initialState: initialStateAddAds
    , extraReducers: {
        [ postAd.pending ]: ( state, action ) => {
            state.isLoading = true;
            state.erorr = null;
        },
        [ postAd.fulfilled ]: ( state, action ) => {
            state.response = action.payload;
            state.isLoading = false;
            state.erorr = null;
        }
        , [ postAd.rejected ]: ( state, action ) => {
            state.isLoading = false;
            state.erorr = action?.error?.message;
        }
    }
} )
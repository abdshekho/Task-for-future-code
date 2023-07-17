import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//@post @Login @all
export const postLogin = createAsyncThunk( 'api/login', async ( url, thunkAPI ) => {
    const { rejectWithValue } = thunkAPI;
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    try {
        const res = await axios.post( `http://helpco.futurecode-projects.com/${url[ 0 ]}`, url[ 1 ], config );

        return res.data;
    } catch ( err ) {
        return rejectWithValue( err.payload );
    }
} )

//@get @Ads @Admin
export const getItems = createAsyncThunk( 'api/getAllAds', async ( url, thunkAPI ) => {
    const { rejectWithValue } = thunkAPI;

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem( "token" )}` }
    }
    try {
        const res = await axios.get( `http://helpco.futurecode-projects.com/${url}`, config );

        return res.data;
    } catch ( err ) {
        return rejectWithValue( err.payload );
    }
} )


//@get @Store @Admin
export const getStores = createAsyncThunk( 'api/getAllStores', async ( url, thunkAPI ) => {
    const { rejectWithValue } = thunkAPI;
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem( "token" )}` }
    }
    try {
        const res = await axios.get( `http://helpco.futurecode-projects.com/${url}`, config );
        return res.data;
    } catch ( err ) {
        return rejectWithValue( err.payload );
    }
} )


//@post @Ad @Admin
export const postAd = createAsyncThunk( 'api/postAds', async ( url, thunkAPI ) => {
    const { rejectWithValue } = thunkAPI;
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem( "token" )}`,
            "Content-Type": "multipart/form-data"
        }
    }
    try {
        const res = await axios.post( `http://helpco.futurecode-projects.com/${url[ 0 ]}`, url[ 1 ], config );
        return res.data;
    } catch ( err ) {
        return rejectWithValue( err.payload );
    }
} )


//@delete @Ad @Admin
export const deleteAd = createAsyncThunk( 'api/postAds', async ( url, thunkAPI ) => {
    const { rejectWithValue } = thunkAPI;
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem( "token" )}`
        }
    }
    try {
        const res = await axios.delete( `http://helpco.futurecode-projects.com/${url}`, config );
        return res.data;
    } catch ( err ) {
        return rejectWithValue( err.payload );
    }
} )
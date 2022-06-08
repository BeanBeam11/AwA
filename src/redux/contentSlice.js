import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSightsAPI } from '../api/openData';

// Define an async function
const getSightsAsync = createAsyncThunk('content/getSights', async () => {
    try {
        const { data } = await getSightsAPI();
        // The value we return becomes the `fulfilled` action payload
        // console.log(data.XML_Head.Infos.Info);
        return data.XML_Head.Infos.Info;
    } catch (err) {
        console.log(err);
    }
});

// Part1: Define Slice (including reducers and actions)
const initialState = {
    sightsData: [],
    status: 'idle',
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSightsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSightsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.sightsData = [...state.sightsData, ...action.payload];
            })
            .addCase(getSightsAsync.rejected, (state, action) => {
                state.status = 'error';
            });
    },
});

// export state to global
export const selectSightsData = (state) => state.content.sightsData;
export const selectStatus = (state) => state.content.status;

// export async function to global
export { getSightsAsync };

// export reducer to global
export default contentSlice.reducer;

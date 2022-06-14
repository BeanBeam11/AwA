import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCitySpots, getRecommendSpots } from '../api';

// Define async functions
const getRecommendSpotsAsync = createAsyncThunk('spot/getRecommendSpots', async () => {
    try {
        const { data } = await getRecommendSpots();
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

const getCitySpotsAsync = createAsyncThunk('spot/getCitySpots', async (city) => {
    try {
        const { data } = await getCitySpots(city);
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

// Part1: Define Slice (including reducers and actions)
const initialState = {
    recommendSpots: [],
    citySpots: [],
    status: 'loading',
};

const spotSlice = createSlice({
    name: 'spot',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setRecommendSpots: (state, action) => {
            state.recommendSpots = action.payload;
        },
        setCitySpots: (state, action) => {
            state.citySpots = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getRecommendSpotsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getRecommendSpotsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.recommendSpots = action.payload;
            })
            .addCase(getRecommendSpotsAsync.rejected, (state, action) => {
                state.status = 'error';
            })
            .addCase(getCitySpotsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCitySpotsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.citySpots = action.payload;
            })
            .addCase(getCitySpotsAsync.rejected, (state, action) => {
                state.status = 'error';
            });
    },
});

// export state to global
export const selectRecommendSpots = (state) => state.spot.recommendSpots;
export const selectCitySpots = (state) => state.spot.citySpots;
export const selectSpotStatus = (state) => state.spot.status;

// export actions to global
export const { setCitySpots, setRecommendSpots } = spotSlice.actions;

// export async function to global
export { getRecommendSpotsAsync, getCitySpotsAsync };

// export reducer to global
export default spotSlice.reducer;

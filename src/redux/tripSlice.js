import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllTrips, getUserTrips } from '../api';

// Define async functions
const getAllTripsAsync = createAsyncThunk('trip/getAllTrips', async () => {
    try {
        const { data } = await getAllTrips();
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

const getUserTripsAsync = createAsyncThunk('trip/getUserTrips', async ({ token, userId }) => {
    try {
        const { data } = await getUserTrips({ token, userId });
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

// Part1: Define Slice (including reducers and actions)
const initialState = {
    allTrips: [],
    userTrips: [],
    status: 'loading',
};

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAllTrips: (state, action) => {
            state.allTrips = action.payload;
        },
        setUserTrips: (state, action) => {
            state.userTrips = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTripsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllTripsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allTrips = action.payload;
            })
            .addCase(getAllTripsAsync.rejected, (state, action) => {
                state.status = 'error';
            })
            .addCase(getUserTripsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserTripsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userTrips = action.payload;
            })
            .addCase(getUserTripsAsync.rejected, (state, action) => {
                state.status = 'error';
            });
    },
});

// export state to global
export const selectAllTrips = (state) => state.trip.allTrips;
export const selectUserTrips = (state) => state.trip.userTrips;
export const selectTripStatus = (state) => state.trip.status;

// export actions to global
export const { setAllTrips, setUserTrips } = tripSlice.actions;

// export async function to global
export { getAllTripsAsync, getUserTripsAsync };

// export reducer to global
export default tripSlice.reducer;

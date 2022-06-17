import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllTrips, getUserTrips, createUserTrip, updateUserTripDetail } from '../api';

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

const createUserTripAsync = createAsyncThunk(
    'trip/createUserTrip',
    async ({ token, name, cover_image, start_date, end_date, duration, owner_id, owner_image, trips }) => {
        try {
            const { data } = await createUserTrip({
                token,
                name,
                cover_image,
                start_date,
                end_date,
                duration,
                owner_id,
                owner_image,
                trips,
            });
            // The value we return becomes the `fulfilled` action payload
            return data.data;
        } catch (err) {
            // The value we return becomes the `rejected` action payload
            return rejectWithValue(err);
        }
    }
);

const updateUserTripDetailAsync = createAsyncThunk('trip/updateUserTripDetail', async ({ token, tripId, trips }) => {
    try {
        const { data } = await updateUserTripDetail({ token, tripId, trips });
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
    createdTrip: {},
    status: 'loading',
    createStatus: 'loading',
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
        setCreatedTrip: (state, action) => {
            state.createdTrip = action.payload;
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
            })
            .addCase(createUserTripAsync.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createUserTripAsync.fulfilled, (state, action) => {
                state.createStatus = 'idle';
                state.createdTrip = { ...state.createdTrip, ...action.payload };
            })
            .addCase(createUserTripAsync.rejected, (state, action) => {
                state.createStatus = 'error';
            })
            .addCase(updateUserTripDetailAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserTripDetailAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userTrips = state.userTrips.map((item, index) => {
                    if (item._id === action.payload._id) {
                        return { ...item, ...action.payload };
                    } else return item;
                });
            })
            .addCase(updateUserTripDetailAsync.rejected, (state, action) => {
                state.status = 'error';
            });
    },
});

// export state to global
export const selectAllTrips = (state) => state.trip.allTrips;
export const selectUserTrips = (state) => state.trip.userTrips;
export const selectCreatedTrip = (state) => state.trip.createdTrip;
export const selectTripStatus = (state) => state.trip.status;
export const selectCreateTripStatus = (state) => state.trip.createStatus;

// export actions to global
export const { setAllTrips, setUserTrips, setCreatedTrip } = tripSlice.actions;

// export async function to global
export { getAllTripsAsync, getUserTripsAsync, createUserTripAsync, updateUserTripDetailAsync };

// export reducer to global
export default tripSlice.reducer;

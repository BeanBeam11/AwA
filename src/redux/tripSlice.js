import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getAllTrips,
    getUserTrips,
    createUserTrip,
    updateUserTripInfo,
    updateUserTripDetail,
    updateUserTripShared,
    deleteUserTrip,
} from '../api';

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
    async ({
        token,
        name,
        cover_image,
        start_date,
        end_date,
        duration,
        owner_id,
        owner_image,
        trips,
        days_start_time,
    }) => {
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
                days_start_time,
            });
            // The value we return becomes the `fulfilled` action payload
            return data.data;
        } catch (err) {
            // The value we return becomes the `rejected` action payload
            return rejectWithValue(err);
        }
    }
);

const updateUserTripInfoAsync = createAsyncThunk(
    'trip/updateUserTripInfo',
    async ({ token, tripId, name, cover_image, start_date, end_date, duration, trips, days_start_time }) => {
        try {
            const { data } = await updateUserTripInfo({
                token,
                tripId,
                name,
                cover_image,
                start_date,
                end_date,
                duration,
                trips,
                days_start_time,
            });
            // The value we return becomes the `fulfilled` action payload
            return data.data;
        } catch (err) {
            // The value we return becomes the `rejected` action payload
            return rejectWithValue(err);
        }
    }
);

const updateUserTripDetailAsync = createAsyncThunk(
    'trip/updateUserTripDetail',
    async ({ token, tripId, trips, days_start_time }) => {
        try {
            const { data } = await updateUserTripDetail({ token, tripId, trips, days_start_time });
            // The value we return becomes the `fulfilled` action payload
            return data.data;
        } catch (err) {
            // The value we return becomes the `rejected` action payload
            return rejectWithValue(err);
        }
    }
);

const updateUserTripSharedAsync = createAsyncThunk(
    'trip/updateUserTripShared',
    async ({ token, tripId, shared_users }) => {
        try {
            const { data } = await updateUserTripShared({ token, tripId, shared_users });
            // The value we return becomes the `fulfilled` action payload
            return data.data;
        } catch (err) {
            // The value we return becomes the `rejected` action payload
            return rejectWithValue(err);
        }
    }
);

const deleteUserTripAsync = createAsyncThunk('trip/deleteUserTrip', async ({ token, tripId }) => {
    try {
        const { data } = await deleteUserTrip({ token, tripId });
        // The value we return becomes the `fulfilled` action payload
        return data;
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
    deleteStatus: 'loading',
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
                state.createdTrip = action.payload;
            })
            .addCase(createUserTripAsync.rejected, (state, action) => {
                state.createStatus = 'error';
            })
            .addCase(updateUserTripInfoAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserTripInfoAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userTrips = state.userTrips.map((item, index) => {
                    if (item._id === action.payload._id) {
                        return { ...item, ...action.payload };
                    } else return item;
                });
            })
            .addCase(updateUserTripInfoAsync.rejected, (state, action) => {
                state.status = 'error';
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
            })
            .addCase(updateUserTripSharedAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserTripSharedAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userTrips = state.userTrips.map((item, index) => {
                    if (item._id === action.payload._id) {
                        return { ...item, ...action.payload };
                    } else return item;
                });
            })
            .addCase(updateUserTripSharedAsync.rejected, (state, action) => {
                state.status = 'error';
            })
            .addCase(deleteUserTripAsync.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteUserTripAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'idle';
            })
            .addCase(deleteUserTripAsync.rejected, (state, action) => {
                state.deleteStatus = 'error';
            });
    },
});

// export state to global
export const selectAllTrips = (state) => state.trip.allTrips;
export const selectUserTrips = (state) => state.trip.userTrips;
export const selectCreatedTrip = (state) => state.trip.createdTrip;
export const selectTripStatus = (state) => state.trip.status;
export const selectCreateTripStatus = (state) => state.trip.createStatus;
export const selectDeleteTripStatus = (state) => state.trip.deleteStatus;

// export actions to global
export const { setAllTrips, setUserTrips, setCreatedTrip } = tripSlice.actions;

// export async function to global
export {
    getAllTripsAsync,
    getUserTripsAsync,
    createUserTripAsync,
    updateUserTripInfoAsync,
    updateUserTripDetailAsync,
    deleteUserTripAsync,
    updateUserTripSharedAsync,
};

// export reducer to global
export default tripSlice.reducer;

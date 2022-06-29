import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getAllTrips,
    getUserTrips,
    getUserSharedTrips,
    getUserSavedTrips,
    createUserTrip,
    updateUserTripInfo,
    updateUserTripDetail,
    updateUserTripShared,
    updateUserTripSaved,
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

const getUserSharedTripsAsync = createAsyncThunk('trip/getUserSharedTrips', async ({ token, userId }) => {
    try {
        const { data } = await getUserSharedTrips({ token, userId });
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

const getUserSavedTripsAsync = createAsyncThunk('trip/getUserSavedTrips', async ({ token, userId }) => {
    try {
        const { data } = await getUserSavedTrips({ token, userId });
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

const updateUserTripSavedAsync = createAsyncThunk('trip/updateUserTripSaved', async ({ token, tripId, saved_by }) => {
    try {
        const { data } = await updateUserTripSaved({ token, tripId, saved_by });
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

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
    userSharedTrips: [],
    userSavedTrips: [],
    createdTrip: {},
    status: 'loading',
    sharedStatus: 'loading',
    savedStatus: 'loading',
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
        setUserSavedTrips: (state, action) => {
            state.userSavedTrips = action.payload;
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
            .addCase(getUserSharedTripsAsync.pending, (state) => {
                state.sharedStatus = 'loading';
            })
            .addCase(getUserSharedTripsAsync.fulfilled, (state, action) => {
                state.sharedStatus = 'idle';
                state.userSharedTrips = action.payload;
            })
            .addCase(getUserSharedTripsAsync.rejected, (state, action) => {
                state.sharedStatus = 'error';
            })
            .addCase(getUserSavedTripsAsync.pending, (state) => {
                state.savedStatus = 'loading';
            })
            .addCase(getUserSavedTripsAsync.fulfilled, (state, action) => {
                state.savedStatus = 'idle';
                state.userSavedTrips = action.payload;
            })
            .addCase(getUserSavedTripsAsync.rejected, (state, action) => {
                state.savedStatus = 'error';
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
            .addCase(updateUserTripSavedAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserTripSavedAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(updateUserTripSavedAsync.rejected, (state, action) => {
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
export const selectUserSharedTrips = (state) => state.trip.userSharedTrips;
export const selectUserSavedTrips = (state) => state.trip.userSavedTrips;
export const selectCreatedTrip = (state) => state.trip.createdTrip;
export const selectTripStatus = (state) => state.trip.status;
export const selectSharedTripStatus = (state) => state.trip.sharedStatus;
export const selectSavedTripStatus = (state) => state.trip.savedStatus;
export const selectCreateTripStatus = (state) => state.trip.createStatus;
export const selectDeleteTripStatus = (state) => state.trip.deleteStatus;

// export actions to global
export const { setAllTrips, setUserTrips, setCreatedTrip, setUserSavedTrips } = tripSlice.actions;

// export async function to global
export {
    getAllTripsAsync,
    getUserTripsAsync,
    getUserSharedTripsAsync,
    getUserSavedTripsAsync,
    createUserTripAsync,
    updateUserTripInfoAsync,
    updateUserTripDetailAsync,
    updateUserTripSavedAsync,
    deleteUserTripAsync,
    updateUserTripSharedAsync,
};

// export reducer to global
export default tripSlice.reducer;

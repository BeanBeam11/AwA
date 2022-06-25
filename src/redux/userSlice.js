import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByEmail } from '../api';

// Define async functions
const getUserByEmailAsync = createAsyncThunk('user/getUserByEmail', async ({ token, email }) => {
    try {
        const { data } = await getUserByEmail({ token, email });
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

// Part1: Define Slice (including reducers and actions)
const initialState = {
    shared_user: {},
    status: 'loading',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSharedUser: (state, action) => {
            state.shared_user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserByEmailAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserByEmailAsync.fulfilled, (state, action) => {
                if (action.payload.length === 0) {
                    state.status = 'error';
                    alert('找不到使用者...');
                } else {
                    state.status = 'idle';
                    state.shared_user = action.payload[0];
                }
            })
            .addCase(getUserByEmailAsync.rejected, (state, action) => {
                state.status = 'error';
            });
    },
});

// export state to global
export const selectSharedUser = (state) => state.user.shared_user;
export const selectUserStatus = (state) => state.user.status;

// export actions to global
export const { setSharedUser } = userSlice.actions;

// export async function to global
export { getUserByEmailAsync };

// export reducer to global
export default userSlice.reducer;

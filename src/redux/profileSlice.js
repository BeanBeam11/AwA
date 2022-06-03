import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const initialState = {
    info: {
        avatar: 'https://firebasestorage.googleapis.com/v0/b/awa---trip-planner.appspot.com/o/logo_tripcan.png?alt=media&token=eb5cdb11-31a5-4c95-93a9-37273fbb4c58',
        name: '未設定',
        interest: '未填寫',
        type: '未設定',
        transportation: '未設定',
        gender: '未設定',
        age: '未設定',
    },
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileInfo: (state, action) => {
            state.info = action.payload;
        },
    },
});

// export state to global
export const selectProfile = (state) => state.profile.info;

// export actions to global
export const { setProfileInfo } = profileSlice.actions;

// export reducer to global
export default profileSlice.reducer;

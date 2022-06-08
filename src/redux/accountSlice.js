import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, signup, getCurrentUser, updateCurrentUser } from '../api';

// Define async functions
const loginAsync = createAsyncThunk('account/login', async ({ email, password }) => {
    try {
        const { data } = await login({ email, password });
        // The value we return becomes the `fulfilled` action payload
        return data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

const signupAsync = createAsyncThunk('account/signup', async ({ name, email, password, passwordConfirm }) => {
    try {
        const { data } = await signup({ name, email, password, passwordConfirm });
        // The value we return becomes the `fulfilled` action payload
        return data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

const readUserAsync = createAsyncThunk('account/readUser', async ({ token }) => {
    try {
        const { data } = await getCurrentUser({ token });
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

const updateUserAsync = createAsyncThunk('account/updateUser', async ({ token, photo, name }) => {
    try {
        const { data } = await updateCurrentUser({ token, photo, name });
        // The value we return becomes the `fulfilled` action payload
        return data.data;
    } catch (err) {
        // The value we return becomes the `rejected` action payload
        return rejectWithValue(err);
    }
});

// Part1: Define Slice (including reducers and actions)
const initialState = {
    user: {
        _id: '',
        email: '',
        name: '',
        photo: 'https://firebasestorage.googleapis.com/v0/b/awa---trip-planner.appspot.com/o/logo_tripcan.png?alt=media&token=eb5cdb11-31a5-4c95-93a9-37273fbb4c58',
    },
    profile: {
        interest: '未填寫',
        type: '未設定',
        transportation: '未設定',
        gender: '未設定',
        age: '未設定',
    },
    login: {
        hasLogin: false,
        hasAccount: true,
    },
    token: '',
    status: 'idle',
    errMsg: '',
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload;
        },
        setUserProfile: (state, action) => {
            state.profile = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        signOut: (state) => {
            state.token = '';
            state.login.hasLogin = false;
        },
        goToSignup: (state) => {
            state.login.hasAccount = false;
        },
        goToLogin: (state) => {
            state.login.hasAccount = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
                state.errMsg = '';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.login.hasLogin = true;
                state.token = action.payload.token;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'error';
                state.login.hasLogin = false;
                state.errMsg = String(action.payload).slice(15);
            })
            .addCase(signupAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.login.hasLogin = true;
                state.token = action.payload.token;
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.status = 'error';
                state.login.hasLogin = false;
                state.errMsg = String(action.payload).slice(15);
            })
            .addCase(readUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = { ...state.user, ...action.payload };
                state.profile = { ...state.profile, ...action.payload };
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = { ...state.user, ...action.payload };
                state.profile = { ...state.profile, ...action.payload };
            });
    },
});

// export state to global
export const selectUser = (state) => state.account.user;
export const selectProfile = (state) => state.account.profile;
export const selectLogin = (state) => state.account.login;
export const selectToken = (state) => state.account.token;
export const selectErrorMsg = (state) => state.account.errMsg;
export const selectStatus = (state) => state.account.status;

// export actions to global
export const { setUserInfo, setUserProfile, goToSignup, goToLogin, signOut } = accountSlice.actions;

// export async function to global
export { loginAsync, signupAsync, readUserAsync, updateUserAsync };

// export reducer to global
export default accountSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout, readUser, updateUser } from '../api/firebase';
import { login, signup } from '../api';

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

const readUserAsync = createAsyncThunk('account/readUser', async () => {
    return await readUser();
});

const updateUserAsync = createAsyncThunk('account/updateUser', async (userInfo) => {
    return await updateUser(userInfo);
});

// Part1: Define Slice (including reducers and actions)
const initialState = {
    general: {
        name: '',
        email: '',
        adrs: '',
        tel: '',
    },
    login: {
        hasLogin: false,
        hasAccount: true,
    },
    status: 'idle',
    errMsg: '',
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setGeneralAccountInfo: (state, action) => {
            state.general = action.payload;
        },
        signOut: (state) => {
            logout();
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
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.status = 'error';
                state.login.hasLogin = false;
                state.errMsg = String(action.payload).slice(15);
            })
            .addCase(readUserAsync.fulfilled, (state, action) => {
                state.general = { ...state.general, ...action.payload };
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.general = { ...state.general, ...action.payload };
            });
    },
});

// export state to global
export const selectGeneral = (state) => state.account.general;
export const selectLogin = (state) => state.account.login;
export const selectErrorMsg = (state) => state.account.errMsg;
export const selectStatus = (state) => state.account.status;

// export actions to global
export const { setGeneralAccountInfo, goToSignup, goToLogin, signOut } = accountSlice.actions;

// export async function to global
export { loginAsync, signupAsync, readUserAsync, updateUserAsync };

// export reducer to global
export default accountSlice.reducer;

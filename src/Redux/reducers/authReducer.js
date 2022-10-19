import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {admins} from "../../Constant/admin";
import React from "react";
import {users} from "../../Constant/user";

const initialState = {
    user: null,
    adminLoginError: '',
    userLoginError: '',
};

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (credential, { rejectWithValue }) => {
        try {
            let currentUser = null
            users.map((user) => {
                if(user.email === credential.email && user.password === credential.password) {
                    currentUser = user
                    localStorage.setItem('user', JSON.stringify(user));
                }
            })
            return currentUser;
        } catch (e) {
            console.log(e)
        }
    }
);

export const adminLogin = createAsyncThunk(
    'auth/adminLogin',
    async (credential, { rejectWithValue }) => {
        try {
            let user = null
            admins.map((admin) => {
                if(admin.email === credential.email && admin.password === credential.password) {
                    user = admin
                    localStorage.setItem('user', JSON.stringify(admin));
                }
            })
            return user;
        } catch (e) {
            console.log(e)
        }
    }
);

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state) {
            state.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null
        },

        logOut(state) {
            localStorage.getItem('user') && localStorage.removeItem('user');
            state.user = null;

        },
        clearError(state) {
            state.userLoginError = null;
            state.adminLoginError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.rejected, (state, action) => {
                console.log('rejected')
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                if(!action.payload) state.userLoginError = "check your credential"
                state.user = action.payload
            })
            .addCase(adminLogin.rejected, (state, action) => {
                console.log('rejected')
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                if(!action.payload) state.adminLoginError = "check your credential"
                state.user = action.payload
            })
    },
})

export const {logOut, setAuthUser, clearError} = authReducer.actions;

export const loggedInUser = (state) => state.auth.user ? state.auth.user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null;
export const adminError = (state) => state.auth.adminLoginError ? state.auth.adminLoginError: null;
export const userError = (state) => state.auth.userLoginError ? state.auth.userLoginError: null;
export default authReducer.reducer
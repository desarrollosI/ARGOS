import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
     initialState: {
         status: 'not-authenticated', // 'authenticated','not-authenticated',
         user: {},
         errorMessage: '',
     },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user   = {};
            state.errorMessage = '';
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = '';
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = '';
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: ( state, /*action*/ ) => {
            state.status = 'checking'
            state.user = {}
            state.errorMessage = undefined
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        }
    }
})

export const { onChecking, onLogin } = authSlice.actions
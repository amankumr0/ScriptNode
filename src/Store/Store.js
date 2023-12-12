import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice"
// import postReducer from './postSlice'

// const allReducer = combineReducers({ authReducer, postReducer })

export const store = configureStore({
    reducer: authReducer
})
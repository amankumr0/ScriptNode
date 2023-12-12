import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        userData: null,
        status: false
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload.userData) {
                state.user.status = true;
                state.user.userData = action.payload.userData
            }
        },
        logout: (state) => {
            state.user.status = false;
            state.user.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer;
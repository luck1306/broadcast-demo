import { createSlice } from "@reduxjs/toolkit";

const initialState = { accessToken: "", refreshToken: "", nickname: "" };

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value: initialState,
    },
    reducers: {
        setTokens: (state, action) => {
            state.value = action.payload;
        },
        resetTokens: (state) => {
            state.value = initialState;
        },
    },
});

export const { setTokens, resetTokens } = tokenSlice.actions;

export default tokenSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    image: "",
    username: "",
    _id: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            state._id = action.payload.data._id
            state.email = action.payload.data.email
            state.username = action.payload.data.username
            state.image = action.payload.data.image
        },
        logoutRedux: (state, action) => {
            state._id = ''
            state.email = ''
            state.username = ''
            state.image = ''
        },
    },
})

export const { loginRedux, logoutRedux } = userSlice.actions

export default userSlice.reducer
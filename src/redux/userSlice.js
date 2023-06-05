import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  image: "",
  username: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state._id = action.payload.data._id;
      state.email = action.payload.data.email;
      state.username = action.payload.data.username;
      state.image = action.payload.data.image;
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.image = "";
    },
    updateUser: (state, action) => {
      // Update the user state with the new data
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { loginRedux, logoutRedux, updateUser } = userSlice.actions;

export default userSlice.reducer;

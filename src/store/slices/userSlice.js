import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = "";
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
const user = userSlice.reducer;
export default user;

import { createSlice } from "@reduxjs/toolkit";
import { IReduxAction, IReduxAuthState } from "../types";

const initialState = {
  token: null,
  user: null,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state: any, action: IReduxAction<IReduxAuthState>) => {
      state[action.payload?.key] = action.payload?.data;
    },
  },
});

export const { setAuthState } = AuthSlice.actions;
export default AuthSlice.reducer;

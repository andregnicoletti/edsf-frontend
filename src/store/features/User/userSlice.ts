import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { removeToken } from "@/utils/cookies";

export enum UserType {
  ADMIN = "admin",
  USER = "user",
}

export type UserStatus = {
  email: string;
  organization: string;
  userType: UserType;
};

const initialState: UserStatus = {
  email: "",
  organization: "",
  userType: UserType.ADMIN
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{email: string; organization: string}>) => {
      state.email = action.payload.email;
      state.organization = action.payload.organization;
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    logout: () => {
      removeToken();
      return initialState;
    },
  },
});

export const userSliceActions = userSlice.actions;

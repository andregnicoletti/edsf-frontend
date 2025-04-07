import { createSlice } from "@reduxjs/toolkit";

export interface ConfigsState {
  sideMenuExpanded: boolean;
}

const initialState: ConfigsState = {
  sideMenuExpanded: true,
};

export const configsSlice = createSlice({
  name: "configs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
  },
  reducers: {
    toggleSideMenu: (state) => {
      state.sideMenuExpanded = !state.sideMenuExpanded;
    },
  },
});

const { toggleSideMenu } = configsSlice.actions;
export const configsActions = {
  toggleSideMenu,
};

export default configsSlice.reducer;

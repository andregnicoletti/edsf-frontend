import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SnackbarSeverities = "error" | "success" | "info" | "warning";

export type SnackbarComponentProps = {
  message: string;
  severity?: SnackbarSeverities;
};

export type SnackbarStatus = {
  open: boolean;
} & SnackbarComponentProps;

const initialState: SnackbarStatus = {
  message: "",
  severity: undefined,
  open: false,
};

export const snackbarSlice = createSlice({
  name: "snackbarSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
  },
  reducers: {
    openNewSnackbar: (state, action: PayloadAction<SnackbarComponentProps>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

const { closeSnackbar, openNewSnackbar } = snackbarSlice.actions;
export const snackbarSliceActions = {
  closeSnackbar,
  openNewSnackbar,
};

export default snackbarSlice.reducer;

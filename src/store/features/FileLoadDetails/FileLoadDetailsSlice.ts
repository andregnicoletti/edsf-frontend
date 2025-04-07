import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FileLoadDetail } from "@/types/FileLoad";

export interface FileLoadDetailsState {
  uploadDetails: Array<FileLoadDetail>;
  lastUploadDetails: Array<FileLoadDetail>;
}

const initialState: FileLoadDetailsState = {
  uploadDetails: [],
  lastUploadDetails: [],
};

export const fileLoadDetailsSlice = createSlice({
  name: "fileLoadDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
  },
  reducers: {
    setUploadDetails: (state, action: PayloadAction<Array<FileLoadDetail>>) => {
      state.uploadDetails = action.payload;
    },
    setLastUploadDetails: (
      state,
      action: PayloadAction<Array<FileLoadDetail>>
    ) => {
      state.lastUploadDetails = action.payload;
    },
  },
});

const { setLastUploadDetails, setUploadDetails } = fileLoadDetailsSlice.actions;
export const fileLoadDetailsActions = {
  setLastUploadDetails,
  setUploadDetails,
};

export default fileLoadDetailsSlice.reducer;

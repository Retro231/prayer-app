import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppStateProps {
  location: string | null;
  defaultLocation: string | null;
}

const initialState: AppStateProps = {
  location: null,
  defaultLocation: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setDefalutLocation: (state, action: PayloadAction<string>) => {
      state.defaultLocation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation, setDefalutLocation } = appSlice.actions;

export default appSlice.reducer;

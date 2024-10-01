import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppStateProps {
  location: string | null;
  defaultLocation: string | null;
  is24HourFormat: boolean;
}

const initialState: AppStateProps = {
  location: null,
  defaultLocation: null,
  is24HourFormat: true,
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
    setIs24HourFormat: (state, action: PayloadAction<boolean>) => {
      state.is24HourFormat = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation, setDefalutLocation, setIs24HourFormat } =
  appSlice.actions;

export default appSlice.reducer;

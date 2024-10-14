import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppStateProps {
  location: string | null;
  defaultLocation: string | null;
  is24HourFormat: boolean;
  prayerTimeConventions: number | null;
  menualCorrections: any;
  juristicMethod: number | null;
}

const initialState: AppStateProps = {
  location: null,
  defaultLocation: null,
  is24HourFormat: true,
  prayerTimeConventions: 0,
  menualCorrections: {
    Fajr: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  },
  juristicMethod: 1,
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
    setPrayerTimeConventions: (state, action: PayloadAction<number>) => {
      state.prayerTimeConventions = action.payload;
    },
    setMenualCorrections: (state, action: PayloadAction<object>) => {
      state.menualCorrections = action.payload;
    },
    setJuristicMethod: (state, action: PayloadAction<number>) => {
      state.juristicMethod = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLocation,
  setDefalutLocation,
  setIs24HourFormat,
  setPrayerTimeConventions,
  setMenualCorrections,
  setJuristicMethod,
} = appSlice.actions;

export default appSlice.reducer;

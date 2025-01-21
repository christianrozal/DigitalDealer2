// app/lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import consultantReducer from "./features/consultantSlice";
import bookingDateReducer from "./features/bookingDateSlice";
import bookingFormReducer from "./features/bookingFormSlice";

export const store = configureStore({
  reducer: {
    consultant: consultantReducer,
    bookingDate: bookingDateReducer,
    bookingForm: bookingFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
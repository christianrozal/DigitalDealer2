// app/lib/features/bookingDateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingDateState {
  selectedDate: string | null;
  selectedTime: string | null;
  consultantId: string | null;
}

const initialState: BookingDateState = {
  selectedDate: null,
  selectedTime: null,
  consultantId: null,
};

export const bookingDateSlice = createSlice({
  name: "bookingDate",
  initialState,
  reducers: {
    setBookingDateTime: (
      state,
      action: PayloadAction<{
        date: string;
        time: string;
        consultantId: string;
      }>
    ) => {
      state.selectedDate = action.payload.date;
      state.selectedTime = action.payload.time;
      state.consultantId = action.payload.consultantId;
    },
    clearBookingDate: (state) => {
      state.selectedDate = null;
      state.selectedTime = null;
      state.consultantId = null;
    },
  },
});

export const { setBookingDateTime, clearBookingDate } = bookingDateSlice.actions;
export default bookingDateSlice.reducer;
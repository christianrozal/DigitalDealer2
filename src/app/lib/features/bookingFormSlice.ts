// app/lib/features/bookingFormSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { databases, databaseId } from "../appwrite";

interface BookingFormState {
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: BookingFormState = {
  formData: {
    name: "",
    email: "",
    phone: "",
    message: "",
  },
  loading: false,
  error: null,
};

export const submitBooking = createAsyncThunk(
  "bookingForm/submit",
  async (
    {
      bookingData,
      consultantId,
    }: {
      bookingData: {
        date: string;
        time: string;
        name: string;
        email: string;
        phone: string;
      };
      consultantId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await databases.createDocument(
        databaseId,
        "YOUR_BOOKINGS_COLLECTION_ID",
        "unique()",
        {
          ...bookingData,
          consultantId,
          status: "pending",
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue("Failed to submit booking");
    }
  }
);

const bookingFormSlice = createSlice({
  name: "bookingForm",
  initialState,
  reducers: {
    setFormField: (
      state,
      action: PayloadAction<{
        field: keyof typeof initialState.formData;
        value: string;
      }>
    ) => {
      state.formData[action.payload.field] = action.payload.value;
    },
    clearForm: (state) => {
      state.formData = initialState.formData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.loading = false;
        state.formData = initialState.formData;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFormField, clearForm } = bookingFormSlice.actions;
export default bookingFormSlice.reducer;
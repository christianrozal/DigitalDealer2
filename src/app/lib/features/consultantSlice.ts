// app/lib/features/consultantSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases, databaseId, consultantsId } from '../appwrite';
import { Models } from 'appwrite'; // Import Document type from Appwrite SDK

interface ConsultantState {
  data: Models.Document | null; // Replace 'any' with Document type
  loading: boolean;
  error: string | null;
}

const initialState: ConsultantState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchConsultant = createAsyncThunk(
  'consultant/fetchConsultant',
  async (consultantId: string) => {
    try {
      const response = await databases.getDocument(
        databaseId,
        consultantsId,
        consultantId
      );
      return response;
    } catch (error) {
      // Use the caught error in the message
      throw new Error(`Failed to fetch consultant: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
);

const consultantSlice = createSlice({
  name: 'consultant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultant.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchConsultant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch consultant';
      });
  },
});

export default consultantSlice.reducer;
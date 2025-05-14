import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addAppointment, deleteAppointment, fetchAppointments } from './thunks';
import type { Appointment, AppointmentState } from '../../types/scheduler';

const initialState: AppointmentState = {
  items: [],
  status: null,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch appointments.';
      })
      .addCase(addAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export default appointmentSlice.reducer;

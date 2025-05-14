import appointmentReducer from '../';
import { fetchAppointments, addAppointment, deleteAppointment } from '../thunks';
import { describe, expect, it } from 'vitest';
import type { AppointmentState } from '../../../types/scheduler';


describe('appointmentsSlice Reducer', () => {
  it('should handle fetchAppointments.pending', () => {
    const initialState = {
      items: [],
      status: null,
      error: null,
    };

    const action = { type: fetchAppointments.pending.type };

    const newState = appointmentReducer(initialState, action);

    expect(newState.status).toBe('loading');
  });

  it('should handle fetchAppointments.fulfilled', () => {
    const initialState: AppointmentState = {
      items: [],
      status: "loading",
      error: null,
    };

    const action = { type: fetchAppointments.fulfilled.type, payload: [{ id: 1, name: 'Appointment' }] };

    const newState = appointmentReducer(initialState, action);

    expect(newState.status).toBe('succeeded');
    expect(newState.items).toEqual([{ id: 1, name: 'Appointment' }]);
  });

  it('should handle fetchAppointments.rejected', () => {
    const initialState: AppointmentState = {
      items: [],
      status: 'loading',
      error: null,
    };

    const action = { type: fetchAppointments.rejected.type, error: { message: 'Error fetching appointments' } };

    const newState = appointmentReducer(initialState, action);

    expect(newState.status).toBe('failed');
    expect(newState.error).toBe('Error fetching appointments');
  });

  it('should handle addAppointment.fulfilled', () => {
    const initialState: AppointmentState = {
      items: [{ id: 1, name: 'Existing Appointment', date: '', time: '', reason: '' }],
      status: 'succeeded',
      error: null,
    };

    const newAppointment = { id: 2, name: 'New Appointment', date: '', time: '', reason: '' };

    const action = { type: addAppointment.fulfilled.type, payload: newAppointment };

    const newState = appointmentReducer(initialState, action);

    expect(newState.items).toEqual([
      { id: 1, name: 'Existing Appointment', date: '', time: '', reason: '' },
      { id: 2, name: 'New Appointment', date: '', time: '', reason: '' },
    ]);
  });

  it('should handle deleteAppointment.fulfilled', () => {
    const initialState: AppointmentState = {
      items: [{ id: 1, name: 'Appointment to Delete', date: '', time: '', reason: ''  }],
      status: 'succeeded',
      error: null,
    };

    const action = { type: deleteAppointment.fulfilled.type, payload: 1 };

    const newState = appointmentReducer(initialState, action);

    expect(newState.items).toEqual([]);
  });
});

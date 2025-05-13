import { screen, fireEvent, waitFor } from '@testing-library/react';
import * as thunks from '../../../store/appointmentsSlice/thunks';
import type { Appointment } from '../../../types/scheduler';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Scheduler from '../../Scheduler';
import renderWithStore from '../../../test/utils'; // Adjust the path to where you defined renderWithStore


const mockAppointments: Appointment[] = [
  { id: 1, name: 'Akram', date: '2025-05-15', time: '14:00', reason: 'Interview' },
  { id: 2, name: 'Jane', date: '2025-05-16', time: '10:00', reason: 'Check-up' },
];

vi.mock('../../../store/appointmentsSlice/thunks', async () => {
  const actual = await vi.importActual<typeof thunks>('../../../store/appointmentsSlice/thunks');

  const mockThunk = (type: string) => {
    const thunkFn = vi.fn(() => async () => {}) as any;
    thunkFn.pending = { type: `${type}/pending` };
    thunkFn.fulfilled = { type: `${type}/fulfilled` };
    thunkFn.rejected = { type: `${type}/rejected` };
    return thunkFn;
  };

  return {
    ...actual,
    fetchAppointments: mockThunk('appointments/fetchAppointments'),
    addAppointment: mockThunk('appointments/addAppointment'),
    deleteAppointment: mockThunk('appointments/deleteAppointment'),
  };
});

function RenderStore(initialState: any) {
  return renderWithStore(<Scheduler />, initialState)
}

describe('Scheduler Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header and form', () => {
    RenderStore({
      appointments: {
        items: [],
        status: 'idle',
        error: null,
      },
    });

    expect(screen.getByText(/Appointment Scheduler/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Reason/i)).toBeInTheDocument();
  });

  it('dispatches fetchAppointments on mount', () => {
    RenderStore({
      appointments: {
        items: [],
        status: 'idle',
        error: null,
      },
    });

    expect(thunks.fetchAppointments).toHaveBeenCalled();
  });

  it('displays loading message', () => {
    RenderStore({
      appointments: {
        items: [],
        status: 'loading',
        error: null,
      },
    });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    RenderStore({
      appointments: {
        items: [],
        status: 'failed',
        error: 'Failed to fetch',
      },
    });

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it('displays a list of appointments', () => {
    RenderStore({
      appointments: {
        items: mockAppointments,
        status: 'succeeded',
        error: null,
      },
    });

    expect(screen.getByText(/Akram/i)).toBeInTheDocument();
    expect(screen.getByText(/Interview/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane/i)).toBeInTheDocument();
    expect(screen.getByText(/Check-up/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    RenderStore({
      appointments: {
        items: [],
        status: 'idle',
        error: null,
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByPlaceholderText(/Reason/i), { target: { value: 'Consultation' } });
    fireEvent.change(screen.getByPlaceholderText(/date/i), { target: { value: '2025-05-17' } });
    fireEvent.change(screen.getByPlaceholderText(/time/i), { target: { value: '13:00' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Appointment/i }));

    await waitFor(() => {
      expect(thunks.addAppointment).toHaveBeenCalledWith({
        name: 'New User',
        date: '2025-05-17',
        time: '13:00',
        reason: 'Consultation',
      });
    });
  });

  it('handles deleting an appointment', () => {
    RenderStore({
      appointments: {
        items: mockAppointments,
        status: 'succeeded',
        error: null,
      },
    });

    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]);

    expect(thunks.deleteAppointment).toHaveBeenCalledWith(1);
  });
});

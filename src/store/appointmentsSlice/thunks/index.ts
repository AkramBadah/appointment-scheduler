import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Appointment } from '../../../types/scheduler';

const API_URL = 'http://localhost:3001/appointments';

export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAppointments',
    async () => {
        const response = await fetch(API_URL);
        return (await response.json()) as Appointment[];
    }
);

export const addAppointment = createAsyncThunk(
    'appointments/addAppointment',
    async (appointment: Omit<Appointment, 'id'>) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointment),
        });
        return (await response.json()) as Appointment;
    }
);

export const deleteAppointment = createAsyncThunk(
    'appointments/deleteAppointment',
    async (id: number) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        return id;
    }
);
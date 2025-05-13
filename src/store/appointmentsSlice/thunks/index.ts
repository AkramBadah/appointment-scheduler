import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Appointment } from '../../../types/scheduler';
import { del, get, post } from '../../../utils/fetchUtils';


export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAppointments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get("/appointments");
            return response as Appointment[];
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const addAppointment = createAsyncThunk(
    'appointments/addAppointment',
    async (appointment: Omit<Appointment, 'id'>, { rejectWithValue }) => {
        try {
            const response = await post("/appointments", appointment);
            return response as Appointment;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const deleteAppointment = createAsyncThunk(
    'appointments/deleteAppointment',
    async (id: number, { rejectWithValue }) => {
        try {
            await del(`/appointments/${id}`, {
                method: 'DELETE',
            });
            return id;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
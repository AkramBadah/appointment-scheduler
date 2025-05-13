import { useAppDispatch, useAppSelector } from '../../store';
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { addAppointment, deleteAppointment, fetchAppointments } from '../../store/appointmentsSlice/thunks';
import type { Appointment } from '../../types/scheduler';
import { AppointmentCreation, Appoitment } from '../../components/Scheduler';


export default function Scheduler() {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector(state => state.appointments);
    const [form, setForm] = useState<Omit<Appointment, "id">>({ name: '', date: '', time: '', reason: '' });

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addAppointment(form));
        setForm({ name: '', date: '', time: '', reason: '' });
    }, [dispatch, form]);

    const handleDelete = useCallback((id: number) => {
        dispatch(deleteAppointment(id));
    }, [dispatch]);

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Appointment Scheduler</h1>

            <AppointmentCreation
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                form={form}
            />

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

            <ul className="space-y-2">
                {items.map((a) => (
                    <Appoitment
                        key={a.id}
                        item={a}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
}

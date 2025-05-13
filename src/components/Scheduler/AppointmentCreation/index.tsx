import React from 'react'
import type { Appointment } from '../../../types/scheduler';
import { getDateAfterDays, getToday } from '../../../utils/dateUtils';


interface IDateSelector {
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    form: Omit<Appointment, "id">
}
export const AppointmentCreation: React.FC<IDateSelector> = ({ handleSubmit, handleInput, form }) => {
    return (
        <form aria-label="appointment form" onSubmit={handleSubmit} className="space-y-2 mb-6">
            <input
                value={form.name}
                name="name"
                onChange={handleInput}
                placeholder="Name"
                className="border p-2 w-full"
                required
            />
            <input
                type="date"
                value={form.date}
                onChange={handleInput}
                placeholder="date"
                name="date"
                className="border p-2 w-full"
                required
                min={getToday()}
                max={getDateAfterDays(13)}
            />
            <input
                type="time"
                value={form.time}
                onChange={handleInput}
                placeholder="time"
                name="time"
                className="border p-2 w-full"
                required
            />
            <input
                value={form.reason}
                name="reason"
                onChange={handleInput}
                placeholder="Reason"
                className="border p-2 w-full"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Appointment</button>
        </form>
    )
}

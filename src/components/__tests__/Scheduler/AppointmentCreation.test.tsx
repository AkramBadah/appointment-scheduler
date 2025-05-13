import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { Appointment } from '../../../types/scheduler'
import { AppointmentCreation } from '../../Scheduler'

const formData: Omit<Appointment, 'id'> = {
  name: 'Alice',
  date: '2025-05-20',
  time: '15:00',
  reason: 'Checkup',
}

describe('AppointmentCreation Component', () => {
  it('renders all form fields with correct values', () => {
    const handleInput = vi.fn()
    const handleSubmit = vi.fn()
    render(<AppointmentCreation handleInput={handleInput} handleSubmit={handleSubmit} form={formData} />)

    expect(screen.getByPlaceholderText('Name')).toHaveValue(formData.name)
    expect(screen.getByPlaceholderText('Reason')).toHaveValue(formData.reason)
    expect(screen.getByPlaceholderText("date")).toHaveValue(formData.date)
    expect(screen.getByPlaceholderText("time")).toHaveValue(formData.time)
    expect(screen.getByRole('button', { name: /add appointment/i })).toBeInTheDocument()
  })

  it('calls handleInput on typing in each input', () => {
    const handleInput = vi.fn()
    const handleSubmit = vi.fn()
    render(<AppointmentCreation handleInput={handleInput} handleSubmit={handleSubmit} form={formData} />)

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Bob' } })
    fireEvent.change(screen.getByPlaceholderText('Reason'), { target: { value: 'Consultation' } })
    fireEvent.change(screen.getByPlaceholderText('date'), { target: { value: '2025-05-21' } })
    fireEvent.change(screen.getByPlaceholderText('time'), { target: { value: '16:00' } })

    expect(handleInput).toHaveBeenCalledTimes(4)
  })

  it('calls handleSubmit on form submission', () => {
    const handleInput = vi.fn()
    const handleSubmit = vi.fn((e) => e.preventDefault()) // prevent real submission
    render(<AppointmentCreation handleInput={handleInput} handleSubmit={handleSubmit} form={formData} />)

    fireEvent.submit(screen.getByRole('form') || screen.getByRole('button', { name: /add appointment/i }).closest('form')!)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('all fields have required attribute', () => {
    const handleInput = vi.fn()
    const handleSubmit = vi.fn()
    render(<AppointmentCreation handleInput={handleInput} handleSubmit={handleSubmit} form={formData} />)

    expect(screen.getByPlaceholderText('Name')).toBeRequired()
    expect(screen.getByPlaceholderText('Reason')).toBeRequired()
    expect(screen.getByDisplayValue(formData.date)).toBeRequired()
    expect(screen.getByDisplayValue(formData.time)).toBeRequired()
  })
})

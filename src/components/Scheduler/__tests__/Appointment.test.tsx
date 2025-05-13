import { fireEvent, render, screen } from '@testing-library/react'
import { Appoitment } from '../'
import { describe, expect, it, vi } from 'vitest'
import type { Appointment } from '../../../types/scheduler'

const mockAppointment: Appointment = {
    id: 1,
    name: 'John Doe',
    date: '2025-05-20',
    time: '10:00 AM',
    reason: 'Consultation',
}

describe('Appointment Component', () => {
    it('renders appointment details correctly', () => {
      const handleDelete = vi.fn()
      render(<Appoitment handleDelete={handleDelete} item={mockAppointment} />)
  
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('2025-05-20 at 10:00 AM - Consultation')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  
    it('calls handleDelete with correct ID when delete is clicked', () => {
      const handleDelete = vi.fn()
      render(<Appoitment handleDelete={handleDelete} item={mockAppointment} />)
  
      const deleteButton = screen.getByText('Delete')
      fireEvent.click(deleteButton)
  
      expect(handleDelete).toHaveBeenCalledOnce()
      expect(handleDelete).toHaveBeenCalledWith(mockAppointment.id)
    })
  
    it('handles empty reason', () => {
      const handleDelete = vi.fn()
      const appointment: Appointment = { ...mockAppointment, reason: '' }
  
      render(<Appoitment handleDelete={handleDelete} item={appointment} />)
  
      expect(screen.getByText(/at 10:00 AM -/)).toBeInTheDocument()
    })
  
    it('handles long names and reasons', () => {
      const handleDelete = vi.fn()
      const appointment: Appointment = {
        ...mockAppointment,
        name: 'A very very long patient name that should still render',
        reason: 'A detailed explanation of the patient’s issue that might span multiple words or lines.',
      }
  
      render(<Appoitment handleDelete={handleDelete} item={appointment} />)
  
      expect(screen.getByText(/A very very long patient name/)).toBeInTheDocument()
      expect(screen.getByText(/detailed explanation of the patient’s issue/)).toBeInTheDocument()
    })
  })
  

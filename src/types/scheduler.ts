export interface Appointment {
    id: number;
    name: string;
    date: string;
    time: string;
    reason: string;
}

export interface AppointmentState {
    items: Appointment[];
    status: null | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
import { type FC } from 'react'
import type { Appointment } from '../../../types/scheduler'

interface ITime {
  handleDelete: (string: number) => void,
  item: Appointment,
}

export const Appoitment: FC<ITime> = ({ handleDelete, item }) => {
  function onDelete() {
    handleDelete(item.id)
  }
  return (
    <li className="border p-3 rounded flex justify-between items-center">
        <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm">{item.date} at {item.time} - {item.reason}</p>
        </div>
        <button onClick={onDelete} className="text-red-600 hover:underline">Delete</button>
    </li>
  )
}

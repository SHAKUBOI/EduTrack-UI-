import React, { useState } from 'react';
import { Schedule, TimeSlot, User, Course } from '../../types';
import { courses, users } from '../../data/mockData';

interface TimetableEditorProps {
  schedule: Schedule;
  onSave: (schedule: Schedule) => void;
}

export default function TimetableEditor({ schedule, onSave }: TimetableEditorProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(schedule.timeSlots);
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const times = ['09:00-10:30', '10:30-12:00', '14:00-15:30', '15:30-17:00'];
  const rooms = ['2A', '2B', '6A', '6B'];

  const handleSlotChange = (day: string, time: string, changes: Partial<TimeSlot>) => {
    setTimeSlots(slots => {
      const slotIndex = slots.findIndex(s => s.day === day && s.time === time);
      if (slotIndex === -1 && changes.courseId) {
        return [...slots, { day, time, ...changes } as TimeSlot];
      }
      return slots.map((slot, index) => 
        index === slotIndex ? { ...slot, ...changes } : slot
      );
    });
  };

  const handleSave = () => {
    onSave({
      ...schedule,
      timeSlots: timeSlots.filter(slot => slot.courseId)
    });
  };

  const getSlot = (day: string, time: string) => {
    return timeSlots.find(slot => slot.day === day && slot.time === time);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Horaire
              </th>
              {days.map(day => (
                <th key={day} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {times.map(time => (
              <tr key={time}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {time}
                </td>
                {days.map(day => {
                  const slot = getSlot(day, time);
                  return (
                    <td key={`${day}-${time}`} className="px-4 py-3">
                      <div className="space-y-2">
                        <select
                          value={slot?.courseId || ''}
                          onChange={(e) => handleSlotChange(day, time, { courseId: e.target.value })}
                          className="block w-full text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Aucun cours</option>
                          {courses.map(course => (
                            <option key={course.id} value={course.id}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                        {slot?.courseId && (
                          <select
                            value={slot.room}
                            onChange={(e) => handleSlotChange(day, time, { room: e.target.value })}
                            className="block w-full text-sm border-gray-300 rounded-md"
                          >
                            {rooms.map(room => (
                              <option key={room} value={room}>
                                Salle {room}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
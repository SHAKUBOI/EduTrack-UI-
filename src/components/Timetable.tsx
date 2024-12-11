import React from 'react';
import { Schedule, Course } from '../types';
import { courses } from '../data/mockData';

interface TimetableProps {
  schedule: Schedule;
}

export default function Timetable({ schedule }: TimetableProps) {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const times = [
    '09:00-10:30',
    '10:30-12:00',
    '14:00-15:30',
    '15:30-17:00'
  ];

  const getCourseDetails = (day: string, time: string) => {
    const slot = schedule.timeSlots.find(
      slot => slot.day === day && slot.time === time
    );
    if (!slot) return null;

    const course = courses.find(c => c.id === slot.courseId);
    return course ? { ...course, room: slot.room } : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Emploi du Temps</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horaire
              </th>
              {days.map(day => (
                <th
                  key={day}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {times.map(time => (
              <tr key={time}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {time}
                </td>
                {days.map(day => {
                  const courseDetails = getCourseDetails(day, time);
                  return (
                    <td
                      key={`${day}-${time}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {courseDetails ? (
                        <div>
                          <div className="font-medium text-gray-900">
                            {courseDetails.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Salle {courseDetails.room}
                          </div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Schedule, User } from '../../types';
import { users } from '../../data/mockData';
import TimetableEditor from './TimetableEditor';

interface TimetableManagerProps {
  schedules: Schedule[];
  onUpdateSchedule: (schedule: Schedule) => void;
}

export default function TimetableManager({ schedules, onUpdateSchedule }: TimetableManagerProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  
  const teachers = users.filter(u => u.role === 'teacher');
  const students = users.filter(u => u.role === 'student');

  const getSchedule = (userId: string) => {
    return schedules.find(s => s.userId === userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professeurs
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="block w-full rounded-md border-gray-300"
          >
            <option value="">Sélectionner un professeur</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Élèves
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="block w-full rounded-md border-gray-300"
          >
            <option value="">Sélectionner un élève</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedUserId && getSchedule(selectedUserId) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">
            Emploi du temps - {users.find(u => u.id === selectedUserId)?.name}
          </h3>
          <TimetableEditor
            schedule={getSchedule(selectedUserId)!}
            onSave={onUpdateSchedule}
          />
        </div>
      )}
    </div>
  );
}
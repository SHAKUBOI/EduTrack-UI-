import React, { useState } from 'react';
import { Users, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { User, Attendance, Schedule } from '../../types';
import { users, attendance, schedules as initialSchedules } from '../../data/mockData';
import StatsCard from '../ui/StatsCard';
import TimetableManager from '../timetable/TimetableManager';

interface CpeDashboardProps {
  user: User;
}

export default function CpeDashboard({ user }: CpeDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [showTimetable, setShowTimetable] = useState(false);
  
  const students = users.filter(u => u.role === 'student');
  const todayAttendance = attendance.filter(a => a.date === selectedDate);
  const absentCount = todayAttendance.filter(a => a.status === 'absent').length;
  const lateCount = todayAttendance.filter(a => a.status === 'late').length;

  const handleJustifyAbsence = (attendanceId: string) => {
    // This would typically update the backend
    console.log('Justifying absence:', attendanceId);
  };

  const handleUpdateSchedule = (updatedSchedule: Schedule) => {
    setSchedules(current => 
      current.map(schedule => 
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord CPE</h1>
        <button
          onClick={() => setShowTimetable(!showTimetable)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Calendar className="h-4 w-4 mr-2" />
          {showTimetable ? 'Voir les présences' : 'Gérer les emplois du temps'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Élèves"
          value={students.length}
          icon={<Users className="h-6 w-6 text-blue-600" />}
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Absences"
          value={absentCount}
          icon={<AlertCircle className="h-6 w-6 text-red-600" />}
          bgColor="bg-red-100"
        />
        <StatsCard
          title="Retards"
          value={lateCount}
          icon={<CheckCircle className="h-6 w-6 text-yellow-600" />}
          bgColor="bg-yellow-100"
        />
      </div>

      {showTimetable ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Gestion des Emplois du Temps</h2>
          <TimetableManager
            schedules={schedules}
            onUpdateSchedule={handleUpdateSchedule}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Gestion des Présences</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Élève
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Justification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance
                  .filter(a => a.date === selectedDate)
                  .map(record => {
                    const student = users.find(u => u.id === record.studentId);
                    return (
                      <tr key={record.id} className={record.status === 'absent' && !record.justified ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {student?.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {student?.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Mathématiques</div>
                          <div className="text-xs text-gray-500">Prof: M. Diop</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : record.status === 'late'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status === 'present' ? 'Présent' : 
                             record.status === 'late' ? 'En retard' : 'Absent'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {record.justification || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {!record.justified && (record.status === 'absent' || record.status === 'late') && (
                            <button
                              onClick={() => handleJustifyAbsence(record.id)}
                              className="text-indigo-600 hover:text-indigo-900 bg-white border border-indigo-600 rounded-md px-3 py-1 text-sm"
                            >
                              Justifier
                            </button>
                          )}
                          {record.justified && (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Justifié
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { User } from '../../types';
import { Book, GraduationCap, Clock } from 'lucide-react';
import { getChildInfo, getChildGrades, getChildAttendance } from '../../utils/parentUtils';
import StatsCard from '../ui/StatsCard';

interface ParentDashboardProps {
  user: User;
}

export default function ParentDashboard({ user }: ParentDashboardProps) {
  const childInfo = getChildInfo(user.id);
  const grades = getChildGrades(childInfo?.id || '');
  const attendance = getChildAttendance(childInfo?.id || '');

  const averageGrade = grades.length
    ? Math.round(grades.reduce((acc, grade) => acc + grade.score, 0) / grades.length)
    : 0;

  const attendanceRate = attendance.length
    ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Parent</h1>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Information de l'élève: {childInfo?.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Moyenne Générale"
          value={`${averageGrade}%`}
          icon={<GraduationCap className="h-6 w-6 text-blue-600" />}
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Taux de Présence"
          value={`${attendanceRate}%`}
          icon={<Clock className="h-6 w-6 text-green-600" />}
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Cours Suivis"
          value={grades.length}
          icon={<Book className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Notes Récentes</h2>
          <div className="space-y-4">
            {grades.map(grade => (
              <div key={grade.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Devoir {grade.assignmentId}</h3>
                    <p className="text-sm text-gray-500">{grade.feedback}</p>
                  </div>
                  <span className="text-lg font-semibold text-blue-600">
                    {grade.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Présence</h2>
          <div className="space-y-4">
            {attendance.map(record => (
              <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      {new Date(record.date).toLocaleDateString('fr-FR')}
                    </h3>
                    <p className="text-sm text-gray-500">Cours {record.courseId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    record.status === 'present' 
                      ? 'bg-green-100 text-green-800'
                      : record.status === 'late'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status === 'present' ? 'Présent' : record.status === 'late' ? 'En retard' : 'Absent'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
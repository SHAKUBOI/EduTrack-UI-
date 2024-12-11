import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, ClipboardList } from 'lucide-react';
import { User } from '../../types';
import { getTeacherCourses, getTeacherAssignments } from '../../utils/teacherUtils';
import { schedules, users } from '../../data/mockData';
import StatsCard from '../ui/StatsCard';
import Timetable from '../Timetable';

interface TeacherDashboardProps {
  user: User;
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  const teacherCourses = getTeacherCourses(user.id);
  const teacherAssignments = getTeacherAssignments(user.id);
  const schedule = schedules.find(s => s.userId === user.id);
  const students = users.filter(u => u.role === 'student');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Enseignant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Cours"
          value={teacherCourses.length}
          icon={<Book className="h-6 w-6 text-blue-600" />}
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Élèves"
          value={students.length}
          icon={<Users className="h-6 w-6 text-green-600" />}
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Devoirs"
          value={teacherAssignments.length}
          icon={<ClipboardList className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-100"
        />
      </div>

      {schedule && <Timetable schedule={schedule} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Mes Cours</h2>
          <div className="space-y-4">
            {teacherCourses.map(course => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.schedule}</p>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                    Salle {course.room}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Devoirs à Noter</h2>
          <div className="space-y-4">
            {teacherAssignments.map(assignment => (
              <div key={assignment.id} className="p-4 rounded-lg hover:bg-gray-50">
                <h3 className="font-medium">{assignment.title}</h3>
                <p className="text-sm text-gray-500">
                  Date limite: {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { User } from '../types';
import TeacherDashboard from './dashboards/TeacherDashboard';
import StudentDashboard from './dashboards/StudentDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import AccountantDashboard from './dashboards/AccountantDashboard';
import CpeDashboard from './dashboards/CpeDashboard';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const getDashboardByRole = () => {
    switch (user.role) {
      case 'teacher':
        return <TeacherDashboard user={user} />;
      case 'student':
        return <StudentDashboard user={user} />;
      case 'parent':
        return <ParentDashboard user={user} />;
      case 'accountant':
        return <AccountantDashboard user={user} />;
      case 'cpe':
        return <CpeDashboard user={user} />;
      default:
        return <div>Role non reconnu</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {getDashboardByRole()}
    </div>
  );
}
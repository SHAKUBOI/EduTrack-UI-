import { users, grades, attendance } from '../data/mockData';

export const getChildInfo = (parentId: string) => {
  // In this example, we're assuming the parent's child has the same last name
  const parent = users.find(u => u.id === parentId);
  if (!parent) return null;
  
  const parentLastName = parent.name.split(' ')[1];
  return users.find(u => u.role === 'student' && u.name.includes(parentLastName));
};

export const getChildGrades = (childId: string) => {
  return grades.filter(grade => grade.studentId === childId);
};

export const getChildAttendance = (childId: string) => {
  return attendance.filter(record => record.studentId === childId);
};
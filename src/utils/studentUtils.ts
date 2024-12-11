import { courses, assignments, grades } from '../data/mockData';

export const getStudentCourses = (studentId: string) => {
  return courses;
};

export const getStudentGrades = (studentId: string) => {
  return grades.filter(grade => grade.studentId === studentId);
};

export const getUpcomingAssignments = (studentId: string) => {
  return assignments.filter(assignment => 
    new Date(assignment.dueDate) > new Date()
  );
};
import { courses, assignments, users } from '../data/mockData';

export const students = users.filter(user => user.role === 'student');

export const getTeacherCourses = (teacherId: string) => {
  return courses.filter(course => course.teacherId === teacherId);
};

export const getTeacherAssignments = (teacherId: string) => {
  const teacherCourses = getTeacherCourses(teacherId);
  return assignments.filter(assignment => 
    teacherCourses.some(course => course.id === assignment.courseId)
  );
};

export { courses, assignments };
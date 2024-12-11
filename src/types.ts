export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'parent' | 'accountant' | 'cpe';
  email: string;
  username?: string;
}

export interface Course {
  id: string;
  name: string;
  teacherId: string;
  schedule: string;
  room: string;
  fees: number;
  class?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

export interface Grade {
  id: string;
  studentId: string;
  assignmentId: string;
  score: number;
  feedback?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  courseId: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  justification?: string;
  justified?: boolean;
}

export interface TimeSlot {
  day: string;
  time: string;
  courseId: string;
  room: string;
}

export interface Schedule {
  id: string;
  userId: string;
  timeSlots: TimeSlot[];
}
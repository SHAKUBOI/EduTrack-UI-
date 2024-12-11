import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Assignment, Course, Grade, Message, User } from '../types';
import GradeManager from './GradeManager';
import Chat from './Chat';
import { grades as allGrades, messages as allMessages, users, courses } from '../data/mockData';

interface CourseDetailsProps {
  currentUser: User;
  assignments: Assignment[];
}

export default function CourseDetails({ currentUser, assignments }: CourseDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const [grades, setGrades] = useState<Grade[]>(allGrades);
  const [messages, setMessages] = useState<Message[]>(allMessages);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  const course = courses.find(c => c.id === id);
  if (!course) {
    return <div className="p-8">Course not found</div>;
  }

  const isTeacher = currentUser.role === 'teacher' || currentUser.role === 'cpe';
  const students = users.filter(u => u.role === 'student');
  const teacher = users.find(u => u.id === course.teacherId)!;

  const courseAssignments = assignments.filter(a => a.courseId === course.id);

  const handleSaveGrade = (newGrade: Partial<Grade>) => {
    const updatedGrades = grades.map(g => 
      g.studentId === newGrade.studentId && g.assignmentId === newGrade.assignmentId
        ? { ...g, ...newGrade }
        : g
    );
    if (!grades.some(g => g.studentId === newGrade.studentId && g.assignmentId === newGrade.assignmentId)) {
      updatedGrades.push(newGrade as Grade);
    }
    setGrades(updatedGrades);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      senderId: currentUser.id,
      receiverId: isTeacher ? selectedStudent!.id : teacher.id,
      content,
      timestamp: new Date().toISOString(),
      courseId: course.id,
    };
    setMessages([...messages, newMessage]);
  };

  const filteredMessages = messages.filter(
    m => m.courseId === course.id && 
    ((m.senderId === currentUser.id && m.receiverId === (selectedStudent?.id || teacher.id)) ||
     (m.receiverId === currentUser.id && m.senderId === (selectedStudent?.id || teacher.id)))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">{course.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {isTeacher ? 'Manage Grades' : 'Your Grades'}
          </h2>
          <div className="space-y-4">
            {courseAssignments.map(assignment => (
              <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium mb-4">{assignment.title}</h3>
                {isTeacher ? (
                  <div className="space-y-4">
                    {students.map(student => (
                      <GradeManager
                        key={student.id}
                        assignment={assignment}
                        grade={grades.find(g => g.studentId === student.id && g.assignmentId === assignment.id)}
                        student={student}
                        onSaveGrade={handleSaveGrade}
                      />
                    ))}
                  </div>
                ) : (
                  <div>
                    {grades
                      .filter(g => g.studentId === currentUser.id && g.assignmentId === assignment.id)
                      .map(grade => (
                        <div key={grade.id} className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium">Score: {grade.score} / {assignment.points}</p>
                          {grade.feedback && (
                            <p className="text-gray-600 mt-2">Feedback: {grade.feedback}</p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Messages</h2>
            {isTeacher && (
              <select
                value={selectedStudent?.id || ''}
                onChange={(e) => setSelectedStudent(students.find(s => s.id === e.target.value) || null)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {(isTeacher ? selectedStudent : true) && (
            <Chat
              messages={filteredMessages}
              currentUser={currentUser}
              otherUser={isTeacher ? selectedStudent! : teacher}
              courseId={course.id}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
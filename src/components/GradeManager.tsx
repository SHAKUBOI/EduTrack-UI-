import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { Assignment, Grade, User } from '../types';

interface GradeManagerProps {
  assignment: Assignment;
  grade?: Grade;
  student: User;
  onSaveGrade: (grade: Partial<Grade>) => void;
}

export default function GradeManager({ assignment, grade, student, onSaveGrade }: GradeManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [score, setScore] = useState(grade?.score?.toString() || '');
  const [feedback, setFeedback] = useState(grade?.feedback || '');

  const handleSave = () => {
    onSaveGrade({
      id: grade?.id,
      studentId: student.id,
      assignmentId: assignment.id,
      score: parseInt(score),
      feedback,
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
        <div>
          <h3 className="font-medium">{student.name}</h3>
          <p className="text-sm text-gray-500">
            Score: {grade?.score || 'Not graded'} / {assignment.points}
          </p>
          {grade?.feedback && (
            <p className="text-sm text-gray-600 mt-1">Feedback: {grade.feedback}</p>
          )}
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <Edit2 className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{student.name}</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="p-2 text-green-600 hover:text-green-700"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Score (out of {assignment.points})
          </label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            max={assignment.points}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
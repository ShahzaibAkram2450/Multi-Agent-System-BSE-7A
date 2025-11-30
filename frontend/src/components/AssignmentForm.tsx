import { useState, FormEvent } from 'react';
import { AssignmentRequest } from '../types';
import { TagInput } from './TagInput';
import { Calendar, BookOpen, User, TrendingUp } from 'lucide-react';

interface AssignmentFormProps {
  onSubmit: (request: AssignmentRequest) => void;
  isLoading: boolean;
}

export function AssignmentForm({ onSubmit, isLoading }: AssignmentFormProps) {
  const [studentId, setStudentId] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [learningStyle, setLearningStyle] = useState<'visual' | 'hands-on' | 'reading' | 'auditory'>('hands-on');
  const [progress, setProgress] = useState(30);
  const [skills, setSkills] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const request: AssignmentRequest = {
      student_id: studentId,
      assignment_title: assignmentTitle,
      assignment_description: assignmentDescription,
      subject,
      deadline,
      difficulty,
      student_profile: {
        learning_style: learningStyle,
        progress: progress / 100,
        skills,
        weaknesses,
      },
    };

    onSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Student ID
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="stu_101"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Machine Learning"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assignment Title
        </label>
        <input
          type="text"
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Customer Churn Prediction Model"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assignment Description
        </label>
        <textarea
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Build a machine learning model to predict customer churn using Python and scikit-learn"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Learning Style
          </label>
          <select
            value={learningStyle}
            onChange={(e) => setLearningStyle(e.target.value as 'visual' | 'hands-on' | 'reading' | 'auditory')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="visual">Visual</option>
            <option value="hands-on">Hands-on</option>
            <option value="reading">Reading</option>
            <option value="auditory">Auditory</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Progress: {progress}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills (press Enter or comma to add)
        </label>
        <TagInput
          tags={skills}
          onChange={setSkills}
          placeholder="e.g., Python, statistics, data analysis"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weaknesses (press Enter or comma to add)
        </label>
        <TagInput
          tags={weaknesses}
          onChange={setWeaknesses}
          placeholder="e.g., feature engineering, model evaluation"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isLoading ? 'Generating Guidance...' : 'Get Assignment Guidance'}
      </button>
    </form>
  );
}

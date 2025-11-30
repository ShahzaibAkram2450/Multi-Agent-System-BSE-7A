import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AssignmentForm } from './AssignmentForm';
import { ResultsDisplay } from './ResultsDisplay';
import { LoadingState } from './LoadingState';
import { ErrorDisplay } from './ErrorDisplay';
import { apiService } from '../services/api';
import { AssignmentRequest, ApiResponse } from '../types';
import { LogOut, BookOpen } from 'lucide-react';

export function Dashboard() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ApiResponse | null>(null);

  const handleSubmit = async (request: AssignmentRequest) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await apiService.submitAssignment(request);
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit assignment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Assignment Coach</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Assignment</h2>
              <AssignmentForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>

          <div>
            {isLoading && <LoadingState />}
            {error && <ErrorDisplay message={error} onRetry={handleRetry} />}
            {results && !isLoading && !error && <ResultsDisplay data={results} />}
            {!isLoading && !error && !results && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-500">
                  Fill out the form to receive personalized assignment guidance powered by AI
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

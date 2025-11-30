import { Loader2, Brain, Sparkles } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Brain className="w-16 h-16 text-blue-600 animate-pulse" />
          <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Generating Your Assignment Guidance
      </h3>
      <p className="text-gray-600 mb-6">
        Our AI is analyzing your assignment and creating a personalized plan...
      </p>
      <div className="flex justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
      <p className="text-sm text-gray-500 mt-4">This usually takes 8-12 seconds</p>
    </div>
  );
}

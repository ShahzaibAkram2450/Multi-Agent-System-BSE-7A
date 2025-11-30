import { AssignmentGuidance, ApiResponse } from "../types";
import {
  Clock,
  CheckCircle,
  BookOpen,
  Lightbulb,
  ExternalLink,
  Database,
  Zap,
} from "lucide-react";

interface ResultsDisplayProps {
  data: ApiResponse;
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Advanced: "bg-red-100 text-red-800 border-red-200",
};

const resourceTypeIcons = {
  documentation: BookOpen,
  tutorial: Lightbulb,
  article: ExternalLink,
};

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  // Parse the nested JSON response
  let guidance: AssignmentGuidance;

  try {
    // Parse the response string to get the wrapper object
    const parsedResponse =
      typeof data.response === "string"
        ? JSON.parse(data.response)
        : data.response;

    // Extract the actual guidance from the nested response field
    if (parsedResponse.response) {
      guidance =
        typeof parsedResponse.response === "string"
          ? JSON.parse(parsedResponse.response)
          : parsedResponse.response;
    } else {
      // Fallback: if response field doesn't exist, use the parsed response directly
      guidance = parsedResponse;
    }
  } catch (error) {
    console.error("Failed to parse response:", error, data);
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-red-900 mb-2">
          Error Parsing Response
        </h3>
        <p className="text-red-700">
          Unable to display results. Please try again.
        </p>
        <pre className="mt-2 text-xs text-red-600 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  if (!guidance || !guidance.task_plan || !guidance.recommended_resources) {
    console.log("Incomplete guidance:", guidance);
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-yellow-900 mb-2">
          Incomplete Response
        </h3>
        <p className="text-yellow-700 mb-2">
          The response is missing required data. Please try again.
        </p>
        <pre className="text-xs text-yellow-600 overflow-auto">
          {JSON.stringify(guidance, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Assignment Summary</h2>
        <p className="text-blue-50 leading-relaxed">
          {guidance.assignment_summary}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          Task Plan
        </h3>
        <div className="space-y-4">
          {guidance.task_plan.map((task) => (
            <div
              key={task.step}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {task.step}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium mb-2">{task.task}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{task.estimated_time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Recommended Resources
        </h3>
        <div className="space-y-3">
          {guidance.recommended_resources.map((resource, index) => {
            const Icon =
              resourceTypeIcons[
                resource.type as keyof typeof resourceTypeIcons
              ] || ExternalLink;
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition group">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium group-hover:text-blue-600 transition">
                      {resource.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {resource.url}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-600" />
          Personalized Feedback
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          {guidance.feedback}
        </p>
        {guidance.motivation && (
          <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-amber-200">
            <p className="text-gray-700 font-medium">{guidance.motivation}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-2xl shadow p-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Execution time: {(data.metadata.executionTime / 1000).toFixed(2)}s
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                data.metadata.cached
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}>
              {data.metadata.cached ? "Cached" : "Fresh"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Agent: {data.agentId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

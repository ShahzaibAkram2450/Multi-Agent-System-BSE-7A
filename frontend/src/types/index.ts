export interface StudentProfile {
  learning_style: 'visual' | 'hands-on' | 'reading' | 'auditory';
  progress: number;
  skills: string[];
  weaknesses: string[];
}

export interface AssignmentRequest {
  student_id: string;
  assignment_title: string;
  assignment_description: string;
  subject: string;
  deadline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  student_profile: StudentProfile;
}

export interface TaskStep {
  step: number;
  task: string;
  estimated_time: string;
}

export interface Resource {
  type: string;
  title: string;
  url: string;
}

export interface AssignmentGuidance {
  assignment_summary: string;
  task_plan: TaskStep[];
  recommended_resources: Resource[];
  feedback: string;
  motivation?: string;
}

export interface ApiResponse {
  response: string;
  agentId: string;
  timestamp: string;
  metadata: {
    executionTime: number;
    agentTrace: string[];
    participatingAgents: string[];
    cached: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
  };
}

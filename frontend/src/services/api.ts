import {
  LoginCredentials,
  AuthResponse,
  AssignmentRequest,
  ApiResponse,
} from "../types";

const API_BASE_URL = "http://localhost:8000";

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("authToken");
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("authToken");
  }

  getToken(): string | null {
    return this.token;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Login failed" }));
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  async submitAssignment(request: AssignmentRequest): Promise<ApiResponse> {
    if (!this.token) {
      throw new Error("Not authenticated");
    }

    const payload = {
      agentId: "assignment-coach",
      request: JSON.stringify({
        agent_name: "assignment_coach_agent",
        intent: "generate_assignment_guidance",
        payload: request,
      }),
      priority: 1,
      autoRoute: false,
    };

    const response = await fetch(`${API_BASE_URL}/api/supervisor/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || "Failed to submit assignment");
    }

    return await response.json();
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();

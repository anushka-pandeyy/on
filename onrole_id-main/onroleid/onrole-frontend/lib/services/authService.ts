// lib/services/authService.ts
import api from "../api";

interface LoginRequest {
  username: string;
  password: string;
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

interface AuthResponse {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  message: string;
}

class AuthService {
  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/signup", {
      username: data.username,
      email: data.email,
      password: data.password,
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      role: data.role || "user",
    });

    return response.data;
  }

  async signin(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/signin", data);
    return response.data;
  }

  async getProfile() {
    const response = await api.get("/profile");
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await api.put("/profile", data);
    return response.data;
  }

  async logout() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.log("Logout error:", error);
    }
  }
}

export default new AuthService();

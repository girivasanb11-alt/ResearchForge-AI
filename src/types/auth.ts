export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  role: "researcher" | "admin" | "enterprise_analyst";
  provider?: "google" | "github" | "email";
  createdAt: string;
}

export interface AuthSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  token?: string;
}

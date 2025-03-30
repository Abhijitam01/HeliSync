import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export type User = {
  id: number;
  username: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<AuthResponse, Error, LoginCredentials>;
  signupMutation: UseMutationResult<AuthResponse, Error, SignupCredentials>;
  logout: () => void;
  googleSignIn: () => void;
};

type LoginCredentials = {
  username: string;
  password: string;
};

type SignupCredentials = {
  username: string;
  email: string;
  password: string;
  displayName?: string;
};

type AuthResponse = {
  user: User;
  token: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  );
  
  // Set token in local storage and headers
  const setAuthToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("auth_token");
      setToken(null);
      navigate("/login");
    }
  };
  
  // Get current user data
  const {
    data,
    error,
    isLoading,
    refetch: refetchUser,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user/profile"],
    queryFn: async ({ queryKey }) => {
      if (!token) return null;
      try {
        const headers: Record<string, string> = {
          "Authorization": `Bearer ${token}`
        };
        
        const res = await fetch(queryKey[0] as string, {
          headers,
          credentials: "include",
        });
        
        if (res.status === 401) {
          setAuthToken(null);
          return null;
        }
        
        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }
        
        return await res.json();
      } catch (error) {
        console.error("Profile fetch error:", error);
        if (error instanceof Error && error.message.includes("401")) {
          setAuthToken(null);
          return null;
        }
        throw error;
      }
    },
    enabled: !!token,
  });

  // Login mutation
  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return await response.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      refetchUser();
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.displayName || data.user.username}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  // Signup mutation
  const signupMutation = useMutation<AuthResponse, Error, SignupCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiRequest("POST", "/api/auth/signup", credentials);
      return await response.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      refetchUser();
      toast({
        title: "Account created",
        description: `Welcome, ${data.user.displayName || data.user.username}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Signup failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    },
  });

  // Logout function
  const logout = async () => {
    try {
      // Immediately clear token and invalidate queries
      setAuthToken(null);
      queryClient.clear();
      
      // Make request to the server logout endpoint
      await apiRequest("POST", "/api/auth/logout");
      
      // Redirect to login page
      window.location.href = "/login";
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      
      // Force redirect to login page
      window.location.href = "/login";
      
      toast({
        title: "Logged out",
        description: "Your session has been ended",
      });
    }
  };
  
  // Google sign-in function
  const googleSignIn = () => {
    toast({
      title: "Google Sign-In",
      description: "Redirecting to Google authentication...",
    });
    
    // We would normally implement actual Firebase Google sign-in here
    // For now, we'll just simulate it with a successful toast
    setTimeout(() => {
      toast({
        title: "Demo Mode",
        description: "Google Sign-In is currently in demo mode",
      });
    }, 1500);
  };

  // Update user profile on token change
  useEffect(() => {
    if (token) {
      refetchUser();
    }
  }, [token, refetchUser]);

  // Create a user reference that's properly typed
  const user: User | null = data ?? null;
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        loginMutation,
        signupMutation,
        logout,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
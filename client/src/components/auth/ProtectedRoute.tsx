import { useAuth } from "@/hooks/use-auth-context";
import { Redirect, Route } from "wouter";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  component: React.ComponentType;
  path: string;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  component: Component,
  path,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/login" />
      </Route>
    );
  }

  // Check for admin-only routes
  if (adminOnly && user.role !== "admin") {
    return (
      <Route path={path}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="text-gray-500 mt-2">
            You do not have permission to access this page.
          </p>
          <Redirect to="/" />
        </div>
      </Route>
    );
  }

  // Render the protected component
  return (
    <Route path={path}>
      <Component />
    </Route>
  );
}
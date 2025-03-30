import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth-context";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Documentation from "@/pages/documentation";
import About from "@/pages/about";
import Settings from "@/pages/settings";
import IndexingOptions from "@/pages/indexing";
import Analytics from "@/pages/analytics";
import LogsPage from "@/pages/logs";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/settings" component={Settings} />
            <ProtectedRoute path="/indexing" component={IndexingOptions} />
            <ProtectedRoute path="/analytics" component={Analytics} />
            <ProtectedRoute path="/logs" component={LogsPage} />
            <Route path="/documentation" component={Documentation} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

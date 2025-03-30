import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth-context";
import { motion } from "framer-motion";

export default function SignupForm() {
  const [, navigate] = useLocation();
  const { signupMutation, user, googleSignIn } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = () => {
    googleSignIn();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    // Use the display name or username if display name is not provided
    const displayName = formData.displayName || formData.username;
    
    signupMutation.mutate(
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        displayName
      },
      {
        onSuccess: () => {
          navigate("/dashboard");
        }
      }
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0f0f0f]/80 rounded-xl border border-[#222] p-6 max-w-md mx-auto backdrop-blur-sm"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold gradient-text">Create a HeliSync Account</h3>
        <p className="text-[#aaa] text-sm mt-2">
          Start indexing blockchain data with ease
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="username" className="text-[#aaa]">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] border-[#333] text-white"
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="email" className="text-[#aaa]">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] border-[#333] text-white"
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="displayName" className="text-[#aaa]">Display Name (optional)</Label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="How you'll appear to others"
            value={formData.displayName}
            onChange={handleChange}
            className="bg-[#1e1e1e] border-[#333] text-white"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="password" className="text-[#aaa]">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] border-[#333] text-white"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="confirmPassword" className="text-[#aaa]">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] border-[#333] text-white"
          />
        </div>

        <Button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-[#5b7def] hover:bg-[#4a6cde] text-white font-medium px-4 py-3 rounded-lg transition-colors"
        >
          {signupMutation.isPending ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-[#333] absolute w-full"></div>
        <span className="bg-[#0f0f0f] text-[#666] text-sm px-4 relative z-10">
          OR
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-[#333] bg-[#1a1a1a] hover:bg-[#252525] transition-colors p-2.5 rounded-lg mt-2 text-white"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Sign up with Google</span>
      </motion.button>

      <div className="mt-6 text-center">
        <p className="text-[#aaa] text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#5b7def] hover:text-[#4a6cde] transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth-context";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was a problem logging you out.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <nav className="mx-auto max-w-7xl bg-gradient-to-r from-[#0f0f0f]/70 via-[#1a1a1a]/70 to-[#0f0f0f]/70 backdrop-blur-xl border border-indigo-500/20 rounded-full px-5 py-3 flex items-center justify-between shadow-lg shadow-indigo-500/10">
        <Link href="/">
          <div className="flex items-center group cursor-pointer">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text group-hover:from-indigo-300 group-hover:to-blue-400 transition-all duration-300">HeliSync</span>
          </div>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/">
            <span className="text-gray-100 hover:text-indigo-300 transition-colors duration-200 text-sm font-medium cursor-pointer">Home</span>
          </Link>
          <Link href="/documentation">
            <span className="text-gray-100 hover:text-indigo-300 transition-colors duration-200 text-sm font-medium cursor-pointer">Documentation</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-100 hover:text-indigo-300 transition-colors duration-200 text-sm font-medium cursor-pointer">About</span>
          </Link>
        </div>
        
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="text-white bg-gradient-to-r from-indigo-500/10 to-blue-500/5 border-indigo-500/30 hover:border-indigo-500/80 hover:from-indigo-500/20 hover:to-blue-500/15 transition-all duration-300 shadow-sm backdrop-blur-sm"
                >
                  Dashboard
                </Button>
              </Link>
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                className="text-white bg-gradient-to-r from-red-500/5 to-pink-500/5 hover:from-red-500/10 hover:to-pink-500/10 border border-red-500/10 hover:border-red-500/30 hover:text-white transition-all duration-300 shadow-sm backdrop-blur-sm"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="text-white bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border-blue-500/20 hover:border-blue-500/50 hover:from-blue-500/10 hover:to-indigo-500/10 transition-all duration-300 shadow-sm backdrop-blur-sm"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white transition-all duration-300 shadow-md shadow-indigo-500/20 border border-indigo-400/20">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="md:hidden">
          <button 
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-indigo-500/20 overflow-hidden">
          {/* Glowing accents */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col space-y-3">
            <Link href="/">
              <span className="text-gray-200 hover:text-indigo-300 transition-colors py-2 block text-sm font-medium cursor-pointer flex items-center">
                <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2"></span>
                Home
              </span>
            </Link>
            <Link href="/documentation">
              <span className="text-gray-200 hover:text-indigo-300 transition-colors py-2 block text-sm font-medium cursor-pointer flex items-center">
                <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2"></span>
                Documentation
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-200 hover:text-indigo-300 transition-colors py-2 block text-sm font-medium cursor-pointer flex items-center">
                <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2"></span>
                About
              </span>
            </Link>
            
            <div className="border-t border-indigo-500/20 my-3 pt-3">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <span className="text-white block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-indigo-500/10 to-blue-500/10 hover:from-indigo-500/20 hover:to-blue-500/20 border border-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer shadow-sm">
                      Dashboard
                    </span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="mt-3 text-gray-300 hover:text-white block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-red-500/5 to-pink-500/5 hover:from-red-500/10 hover:to-pink-500/10 border border-red-500/10 hover:border-red-500/20 transition-all duration-300 shadow-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <span className="text-gray-300 hover:text-white block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-blue-500/5 to-indigo-500/5 hover:from-blue-500/10 hover:to-indigo-500/10 border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 cursor-pointer shadow-sm">
                      Login
                    </span>
                  </Link>
                  <Link href="/signup">
                    <span className="mt-3 block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md shadow-indigo-500/20 text-white font-medium cursor-pointer">
                      Sign Up
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

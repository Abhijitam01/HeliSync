import { Link } from "wouter";
import SignupForm from "@/components/auth/SignupForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Signup() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <SignupForm />
          
          <div className="text-center mt-6">
            <p className="text-[#aaa] text-sm">
              By signing up, you agree to our{" "}
              <a
                href="/terms"
                className="text-[#5b7def] hover:text-[#4a6cde]"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-[#5b7def] hover:text-[#4a6cde]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

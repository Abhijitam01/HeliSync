import { Link } from "wouter";
import LoginForm from "@/components/auth/LoginForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <LoginForm />
          
          <div className="text-center mt-6">
            <p className="text-[#aaa] text-sm">
              New to HeliSync?{" "}
              <Link href="/signup" className="text-[#5b7def] hover:text-[#4a6cde]">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

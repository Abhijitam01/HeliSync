import { Link } from "wouter";

export default function AuthSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            <span className="secondary-gradient-text">Secure Authentication</span>
          </h2>
          <p className="text-[#aaa] mb-6">
            Our platform provides multiple secure authentication options,
            allowing you to choose the method that works best for you.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#2ce5c9] mr-3 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Sign in with Google OAuth for quick access</span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#2ce5c9] mr-3 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Traditional email/password authentication via Firebase
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#2ce5c9] mr-3 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Secure credential storage with AWS Secrets Manager</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#0f0f0f] rounded-xl border border-[#222] p-6 max-w-md mx-auto lg:mx-0">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold gradient-text">
              Sign In to HeliSync
            </h3>
            <p className="text-[#aaa] text-sm mt-2">
              Access your blockchain indexing dashboard
            </p>
          </div>

          <button className="w-full bg-white text-black font-medium flex items-center justify-center gap-3 px-4 py-3 rounded-lg mb-4 hover:bg-opacity-90 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#333] absolute w-full"></div>
            <span className="bg-[#0f0f0f] text-[#666] text-sm px-4 relative">
              OR
            </span>
          </div>

          <form>
            <div className="mb-4">
              <label className="block text-[#aaa] text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#aaa] text-sm mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5b7def] hover:bg-[#4a6cde] text-white font-medium px-4 py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="#"
              className="text-[#5b7def] hover:text-[#4a6cde] text-sm"
            >
              Forgot password?
            </a>
            <p className="text-[#aaa] text-sm mt-4">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#5b7def] hover:text-[#4a6cde]">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

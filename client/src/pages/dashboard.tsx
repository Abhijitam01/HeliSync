import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import DatabaseConfig from "@/components/dashboard/DatabaseConfig";
import IndexingOptions from "@/components/dashboard/IndexingOptions";
import { UserProfile } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth-context";
import { apiRequest } from "@/lib/queryClient";
import OnboardingTour from "@/components/onboarding/OnboardingTour";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlockchainBasics from "@/components/onboarding/BlockchainBasics";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [showBasicsTab, setShowBasicsTab] = useState(false);

  // Fetch user profile data
  const { data: profile, isLoading, error, refetch } = useQuery<UserProfile>({
    queryKey: ["/api/user/profile"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/user/profile");
        return await response.json();
      } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-[#aaa]">Failed to load dashboard data.</p>
          <p className="text-[#666] text-sm mt-2">{(error as Error).message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#080808] text-white">
      {/* Onboarding Tour */}
      <OnboardingTour isOpen={isTourOpen} setIsOpen={setIsTourOpen} />

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 border-r border-[#222] h-screen fixed overflow-y-auto">
          <Sidebar username={user?.displayName || user?.username} />
        </div>

        {/* Content area */}
        <div className="flex-1 p-8 ml-64 overflow-y-auto">
          {/* Help button (tour) */}
          <div className="fixed bottom-6 right-6 z-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTourOpen(true)}
              className="bg-[#5b7def] text-white p-3 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm bg-opacity-90"
            >
              <HelpCircle size={20} />
            </motion.button>
          </div>
          <div className="py-6">
            <div className="flex justify-between items-center mb-8" id="tour-dashboard">
              <h2 className="text-3xl font-bold gradient-text">Dashboard</h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#222] bg-[#0a0a0a] hover:bg-[#151515] text-[#aaa]"
                  onClick={() => setShowBasicsTab(!showBasicsTab)}
                >
                  {showBasicsTab ? "Hide Blockchain Basics" : "Learn Blockchain Basics"}
                </Button>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${profile?.credentials?.isValidated ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                  {profile?.credentials?.isValidated ? "Database Connected" : "Database Not Connected"}
                </div>
              </div>
            </div>

            {/* Blockchain Basics Tab */}
            {showBasicsTab && (
              <div className="mb-10 animate-fadeIn">
                <BlockchainBasics />
              </div>
            )}

            {/* Welcome Card */}
            <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6 mb-10">
              <h3 className="text-xl font-semibold mb-2">Welcome to HeliSync</h3>
              <p className="text-[#aaa] mb-4">Use this dashboard to configure your blockchain data indexing settings and monitor your indexing process.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div id="tour-database" className="flex items-center p-3 bg-[#0f0f0f] rounded-md border border-[#222]">
                  <div className="bg-[#5b7def]/20 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#5b7def]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Quick Start</p>
                    <p className="text-[#777]">Configure database settings</p>
                  </div>
                </div>
                <div id="tour-indexing-options" className="flex items-center p-3 bg-[#0f0f0f] rounded-md border border-[#222]">
                  <div className="bg-[#7c3aed]/20 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#7c3aed]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Setup Indexing</p>
                    <p className="text-[#777]">Choose data to track</p>
                  </div>
                </div>
                <div id="tour-analytics" className="flex items-center p-3 bg-[#0f0f0f] rounded-md border border-[#222]">
                  <div className="bg-[#ec4899]/20 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#ec4899]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">View Analytics</p>
                    <p className="text-[#777]">Monitor indexing metrics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Database Configuration Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold secondary-gradient-text">Database Configuration</h3>
              </div>
              <DatabaseConfig credentials={profile?.credentials} />
            </div>

            {/* Indexing Preferences Section */}
            <div className="mb-10" id="tour-indexing">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold secondary-gradient-text">Indexing Preferences</h3>
              </div>
              <IndexingOptions preferences={profile?.preferences} />
            </div>

            {/* Webhook Section */}
            <div className="mb-10" id="tour-helius">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold secondary-gradient-text">Webhook Status</h3>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#aaa] mb-2">Webhook URL</p>
                    <div className="bg-[#0f0f0f] border border-[#222] rounded p-2 text-sm font-mono text-[#aaa]">
                      {window.location.origin}/webhook/{user?.id}
                    </div>
                  </div>
                  <div id="tour-logs" className="text-right">
                    <p className="text-[#aaa] mb-2">Status</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                      <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></span> Waiting for Configuration
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Started Button */}
            <div className="text-center p-6 bg-gradient-to-r from-[#0f0f0f] to-[#0a0a0a] border border-[#222] rounded-lg" id="tour-finish">
              <h3 className="text-xl font-semibold gradient-text mb-2">Ready to start indexing?</h3>
              <p className="text-[#aaa] mb-4">Configure your database connection and select your indexing preferences to get started.</p>
              <Button className="bg-[#5b7def] hover:bg-[#4a6ade]">
                Set Up Database
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

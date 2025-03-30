import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth-context";
import { LogOut, Settings, Home, Sliders, BarChart3, Clock } from "lucide-react";

interface SidebarProps {
  username?: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const [location, navigate] = useLocation();
  const { logout } = useAuth();
  
  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-[#0a0a0a] h-full border-r border-[#222] p-4 flex flex-col">
      <div className="gradient-text text-xl font-bold mb-6">HeliSync</div>

      <div className="mb-6">
        <p className="text-[#aaa] text-sm">Welcome,</p>
        <p className="font-medium">{username || "User"}</p>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <div 
              className={`flex items-center ${
                location === "/dashboard"
                  ? "text-[#5b7def] bg-[#111]"
                  : "text-[#aaa] hover:text-white"
              } rounded-lg px-4 py-2 transition-colors cursor-pointer`}
              onClick={() => navigateTo("/dashboard")}
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </div>
          </li>
          <li>
            <div
              className={`flex items-center ${
                location === "/settings"
                  ? "text-[#5b7def] bg-[#111]"
                  : "text-[#aaa] hover:text-white"
              } rounded-lg px-4 py-2 transition-colors cursor-pointer`}
              onClick={() => navigateTo("/settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </div>
          </li>
          <li>
            <div
              className={`flex items-center ${
                location === "/indexing"
                  ? "text-[#5b7def] bg-[#111]"
                  : "text-[#aaa] hover:text-white"
              } rounded-lg px-4 py-2 transition-colors cursor-pointer`}
              onClick={() => navigateTo("/indexing")}
            >
              <Sliders className="h-5 w-5 mr-3" />
              Indexing Options
            </div>
          </li>
          <li>
            <div
              className={`flex items-center ${
                location === "/analytics"
                  ? "text-[#5b7def] bg-[#111]"
                  : "text-[#aaa] hover:text-white"
              } rounded-lg px-4 py-2 transition-colors cursor-pointer`}
              onClick={() => navigateTo("/analytics")}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Analytics
            </div>
          </li>
          <li>
            <div
              className={`flex items-center ${
                location === "/logs"
                  ? "text-[#5b7def] bg-[#111]"
                  : "text-[#aaa] hover:text-white"
              } rounded-lg px-4 py-2 transition-colors cursor-pointer`}
              onClick={() => navigateTo("/logs")}
            >
              <Clock className="h-5 w-5 mr-3" />
              Logs
            </div>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto pt-8">
        <button 
          onClick={logout}
          className="flex items-center w-full text-[#aaa] hover:text-white rounded-lg px-4 py-2 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}

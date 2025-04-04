import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart, 
  Area,
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Scatter
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Download, 
  RefreshCw, 
  ArrowLeft,
  Activity,
  BarChart2,
  PieChart as PieChartIcon,
  Database,
  Clock,
  Shield,
  ChevronUp,
  ChevronDown,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth-context";

// Constants for colors and chart styling
const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#0ea5e9", "#06b6d4", "#14b8a6"];
const CHART_BG = "#0a0a0a";
const CHART_GRID = "#222";
const CHART_AXIS = "#444";

// Custom chart tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-[#0a0a0a] border border-[#222] rounded shadow-lg">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center text-sm">
            <div
              className="h-2 w-2 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#aaa] mr-2">{entry.name}:</span>
            <span className="text-white font-medium">
              {entry.dataKey === "SOL" || entry.dataKey === "JTO" || entry.dataKey === "PYTH" 
                ? `$${Number(entry.value).toFixed(2)}` 
                : entry.dataKey === "BONK" 
                  ? `$${Number(entry.value).toFixed(6)}` 
                  : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Types for analytics data
interface AnalyticsSummary {
  nftBids: {
    total: number;
    change: number;
    platforms: {
      magicEden: number;
      tensor: number;
      hadeswap: number;
      other: number;
    }
  };
  tokenPrices: {
    total: number;
    change: number;
    tokens: {
      SOL: number;
      BONK: number;
      JTO: number;
      PYTH: number;
    }
  };
  lendingEvents: {
    total: number;
    change: number;
    platforms: {
      solend: number;
      mango: number;
      drift: number;
    }
  };
  indexingStatus: {
    recordsIndexed: number;
    dbSize: string;
    avgResponseTime: string;
    webhookSuccessRate: string;
  }
}

interface ChartDataPoint {
  date: string;
  [key: string]: any;
}

export default function Analytics() {
  const { toast } = useToast();
  const { user, token } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeframe, setTimeframe] = useState("7d");
  const [activeTab, setActiveTab] = useState("nft-bids");

  // Query for analytics summary data
  const { 
    data: summaryData, 
    isLoading: isSummaryLoading, 
    error: summaryError, 
    refetch: refetchSummary 
  } = useQuery<AnalyticsSummary>({
    queryKey: ["/api/analytics/summary"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/analytics/summary");
        return await response.json();
      } catch (error) {
        console.error("Error fetching analytics summary:", error);
        throw error;
      }
    },
    enabled: !!token,
  });

  // Query for historical chart data
  const { 
    data: chartData, 
    isLoading: isChartLoading, 
    error: chartError, 
    refetch: refetchChart 
  } = useQuery<ChartDataPoint[]>({
    queryKey: ["/api/analytics/historical-data", activeTab, timeframe],
    queryFn: async () => {
      try {
        const metric = activeTab === "nft-bids" 
          ? "nft-bids" 
          : activeTab === "token-prices" 
            ? "token-prices" 
            : activeTab === "borrowable-tokens" 
              ? "lending" 
              : "nft-bids";
              
        const response = await apiRequest(
          "GET", 
          `/api/analytics/historical-data?metric=${metric}&timeframe=${timeframe}`
        );
        return await response.json();
      } catch (error) {
        console.error("Error fetching historical data:", error);
        throw error;
      }
    },
    enabled: !!token,
  });

  // Refresh data function
  const refreshData = () => {
    toast({
      title: "Refreshing data",
      description: "Fetching the latest analytics data...",
    });
    
    refetchSummary();
    refetchChart();
  };

  // Data mapping for Platform Distribution chart
  const platformDistribution = summaryData ? [
    { name: "Magic Eden", value: summaryData.nftBids.platforms.magicEden },
    { name: "Tensor", value: summaryData.nftBids.platforms.tensor },
    { name: "Hadeswap", value: summaryData.nftBids.platforms.hadeswap },
    { name: "Other", value: summaryData.nftBids.platforms.other },
  ] : [];

  // Format token values for display
  const formatTokenValue = (token: string, value: number): string => {
    if (token === "BONK") return `$${value.toFixed(6)}`;
    return `$${value.toFixed(2)}`;
  };

  // Loading state components
  const LoadingCard = () => (
    <Card className="bg-[#0f0f0f] border border-[#222]">
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-32 bg-[#222]" />
        <Skeleton className="h-3 w-24 bg-[#222] mt-1" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24 bg-[#222]" />
        <Skeleton className="h-3 w-36 bg-[#222] mt-2" />
      </CardContent>
    </Card>
  );

  const LoadingChart = () => (
    <Card className="bg-[#0f0f0f] border border-[#222]">
      <CardHeader>
        <Skeleton className="h-6 w-48 bg-[#222]" />
        <Skeleton className="h-3 w-64 bg-[#222] mt-1" />
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#6366f1]" />
        </div>
      </CardContent>
    </Card>
  );

  // Error state
  if (summaryError || chartError) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 max-w-7xl">
          <div className="text-center py-12">
            <div className="bg-red-500/10 p-4 rounded-lg inline-block mb-4">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Error Loading Analytics</h2>
            <p className="text-[#aaa] mb-6">We encountered an issue fetching your analytics data.</p>
            <Button 
              onClick={refreshData}
              className="bg-[#6366f1] hover:bg-[#4f46e5]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="mr-4 border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold gradient-text"
              >
                Analytics Dashboard
              </motion.h1>
              <p className="text-[#aaa] mt-2">Monitor and analyze your indexed blockchain data</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]"
              onClick={refreshData}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {date ? format(date, "MMM dd, yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-[#222] bg-[#0a0a0a]">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-[#0a0a0a] text-white border-[#222]"
                />
              </PopoverContent>
            </Popover>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[110px] border-[#222] bg-[#0a0a0a] text-[#aaa] h-9">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent className="border-[#222] bg-[#0a0a0a]">
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {isSummaryLoading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="bg-[#0f0f0f] border border-[#222] h-full transform transition-all duration-200 hover:border-[#6366f1]/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Total NFT Bids</CardTitle>
                      <div className="h-8 w-8 bg-[#6366f1]/10 rounded-full flex items-center justify-center">
                        <Activity className="h-4 w-4 text-[#6366f1]" />
                      </div>
                    </div>
                    <CardDescription className="text-[#aaa]">
                      Last {timeframe === "24h" ? "24 hours" : timeframe === "30d" ? "30 days" : timeframe === "90d" ? "90 days" : "7 days"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#6366f1]">
                      {summaryData?.nftBids.total.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      {summaryData && summaryData.nftBids.change > 0 ? (
                        <>
                          <ChevronUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-green-400 font-medium">{summaryData.nftBids.change}%</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 text-red-400 mr-1" />
                          <span className="text-red-400 font-medium">{Math.abs(summaryData?.nftBids.change || 0)}%</span>
                        </>
                      )}
                      <span className="text-[#aaa] ml-1">from previous period</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
                
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="bg-[#0f0f0f] border border-[#222] h-full transform transition-all duration-200 hover:border-[#7c3aed]/30 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Token Price Updates</CardTitle>
                      <div className="h-8 w-8 bg-[#7c3aed]/10 rounded-full flex items-center justify-center">
                        <BarChart2 className="h-4 w-4 text-[#7c3aed]" />
                      </div>
                    </div>
                    <CardDescription className="text-[#aaa]">
                      Last {timeframe === "24h" ? "24 hours" : timeframe === "30d" ? "30 days" : timeframe === "90d" ? "90 days" : "7 days"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#7c3aed]">
                      {summaryData?.tokenPrices.total.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      {summaryData && summaryData.tokenPrices.change > 0 ? (
                        <>
                          <ChevronUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-green-400 font-medium">{summaryData.tokenPrices.change}%</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 text-red-400 mr-1" />
                          <span className="text-red-400 font-medium">{Math.abs(summaryData?.tokenPrices.change || 0)}%</span>
                        </>
                      )}
                      <span className="text-[#aaa] ml-1">from previous period</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="bg-[#0f0f0f] border border-[#222] h-full transform transition-all duration-200 hover:border-[#ec4899]/30 hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Lending Protocol Events</CardTitle>
                      <div className="h-8 w-8 bg-[#ec4899]/10 rounded-full flex items-center justify-center">
                        <PieChartIcon className="h-4 w-4 text-[#ec4899]" />
                      </div>
                    </div>
                    <CardDescription className="text-[#aaa]">
                      Last {timeframe === "24h" ? "24 hours" : timeframe === "30d" ? "30 days" : timeframe === "90d" ? "90 days" : "7 days"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#ec4899]">
                      {summaryData?.lendingEvents.total.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      {summaryData && summaryData.lendingEvents.change > 0 ? (
                        <>
                          <ChevronUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-green-400 font-medium">{summaryData.lendingEvents.change}%</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 text-red-400 mr-1" />
                          <span className="text-red-400 font-medium">{Math.abs(summaryData?.lendingEvents.change || 0)}%</span>
                        </>
                      )}
                      <span className="text-[#aaa] ml-1">from previous period</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>
        
        {/* Token Price Quick View */}
        {summaryData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Token Prices</CardTitle>
                <CardDescription className="text-[#aaa]">Latest token prices from tracked oracles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#222] flex flex-col">
                    <div className="text-[#aaa] text-sm mb-1 font-semibold">SOL</div>
                    <div className="text-xl font-bold">${summaryData.tokenPrices.tokens.SOL.toFixed(2)}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#222] flex flex-col">
                    <div className="text-[#aaa] text-sm mb-1 font-semibold">BONK</div>
                    <div className="text-xl font-bold">${summaryData.tokenPrices.tokens.BONK.toFixed(6)}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#222] flex flex-col">
                    <div className="text-[#aaa] text-sm mb-1 font-semibold">JTO</div>
                    <div className="text-xl font-bold">${summaryData.tokenPrices.tokens.JTO.toFixed(2)}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#222] flex flex-col">
                    <div className="text-[#aaa] text-sm mb-1 font-semibold">PYTH</div>
                    <div className="text-xl font-bold">${summaryData.tokenPrices.tokens.PYTH.toFixed(2)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Chart Tabs */}
        <Tabs defaultValue="nft-bids" className="mb-10" onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-[#121212] border border-[#222]">
            <TabsTrigger value="nft-bids">NFT Bids</TabsTrigger>
            <TabsTrigger value="token-prices">Token Prices</TabsTrigger>
            <TabsTrigger value="borrowable-tokens">Lending Activity</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
          
          {/* NFT Bids Tab */}
          <TabsContent value="nft-bids">
            {isChartLoading ? (
              <LoadingChart />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#0f0f0f] border border-[#222]">
                  <CardHeader>
                    <CardTitle>NFT Bid Activity</CardTitle>
                    <CardDescription className="text-[#aaa]">
                      Total bid activity by marketplace over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={chartData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorMagicEden" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#5b7def" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#5b7def" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorTensor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" stroke={CHART_AXIS} />
                          <YAxis stroke={CHART_AXIS} />
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="magicEden" 
                            name="Magic Eden"
                            stroke="#5b7def" 
                            fillOpacity={1} 
                            fill="url(#colorMagicEden)" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="tensor" 
                            name="Tensor"
                            stroke="#7c3aed" 
                            fillOpacity={1} 
                            fill="url(#colorTensor)" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="other" 
                            name="Other"
                            stroke="#ec4899" 
                            fillOpacity={1} 
                            fill="url(#colorOther)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
          
          {/* Token Prices Tab */}
          <TabsContent value="token-prices">
            {isChartLoading ? (
              <LoadingChart />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#0f0f0f] border border-[#222]">
                  <CardHeader>
                    <CardTitle>Token Price Movements</CardTitle>
                    <CardDescription className="text-[#aaa]">
                      Tracked token price changes in USD
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart 
                          data={chartData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <XAxis dataKey="date" stroke={CHART_AXIS} />
                          <YAxis yAxisId="left" stroke={CHART_AXIS} />
                          <YAxis yAxisId="right" orientation="right" stroke={CHART_AXIS} />
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="SOL" 
                            name="SOL"
                            stroke="#5b7def" 
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }} 
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="JTO" 
                            name="JTO"
                            stroke="#ec4899" 
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="PYTH" 
                            name="PYTH"
                            stroke="#f97316" 
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                          <Scatter 
                            yAxisId="right"
                            dataKey="BONK" 
                            name="BONK"
                            fill="#7c3aed" 
                            shape="circle"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
          
          {/* Lending Activity Tab */}
          <TabsContent value="borrowable-tokens">
            {isChartLoading ? (
              <LoadingChart />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#0f0f0f] border border-[#222]">
                  <CardHeader>
                    <CardTitle>Lending Protocol Activity</CardTitle>
                    <CardDescription className="text-[#aaa]">
                      Events by lending platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={chartData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <XAxis dataKey="date" stroke={CHART_AXIS} />
                          <YAxis stroke={CHART_AXIS} />
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar 
                            dataKey="solend" 
                            name="Solend"
                            fill="#5b7def" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="mango" 
                            name="Mango"
                            fill="#7c3aed" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="drift" 
                            name="Drift"
                            fill="#ec4899" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
          
          {/* Distribution Tab */}
          <TabsContent value="distribution">
            {isSummaryLoading ? (
              <LoadingChart />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-[#0f0f0f] border border-[#222]">
                    <CardHeader>
                      <CardTitle>Marketplace Distribution</CardTitle>
                      <CardDescription className="text-[#aaa]">
                        Breakdown of NFT bid activity by marketplace
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={platformDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {platformDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#0f0f0f] border border-[#222]">
                    <CardHeader>
                      <CardTitle>Lending Platform Analysis</CardTitle>
                      <CardDescription className="text-[#aaa]">
                        Comparing metrics across lending platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center">
                        {summaryData && (
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                              {
                                platform: "Solend",
                                events: summaryData.lendingEvents.platforms.solend,
                                volume: summaryData.lendingEvents.platforms.solend * 1.2,
                                users: summaryData.lendingEvents.platforms.solend * 0.8,
                                assets: summaryData.lendingEvents.platforms.solend * 0.6,
                              },
                              {
                                platform: "Mango",
                                events: summaryData.lendingEvents.platforms.mango,
                                volume: summaryData.lendingEvents.platforms.mango * 1.5,
                                users: summaryData.lendingEvents.platforms.mango * 0.9,
                                assets: summaryData.lendingEvents.platforms.mango * 0.7,
                              },
                              {
                                platform: "Drift",
                                events: summaryData.lendingEvents.platforms.drift,
                                volume: summaryData.lendingEvents.platforms.drift * 2.0,
                                users: summaryData.lendingEvents.platforms.drift * 0.6,
                                assets: summaryData.lendingEvents.platforms.drift * 0.5,
                              }
                            ]}>
                              <PolarGrid stroke={CHART_GRID} />
                              <PolarAngleAxis dataKey="platform" tick={{ fill: '#aaa' }} />
                              <PolarRadiusAxis stroke={CHART_AXIS} />
                              <Radar name="Events" dataKey="events" stroke="#5b7def" fill="#5b7def" fillOpacity={0.6} />
                              <Radar name="Volume" dataKey="volume" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
                              <Radar name="Users" dataKey="users" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                              <Radar name="Assets" dataKey="assets" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                              <Tooltip content={<CustomTooltip />} />
                              <Legend />
                            </RadarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Data Indexing Status */}
        {summaryData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Data Indexing Status</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Latest indexing metrics for your database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-[#5b7def]/10 rounded-full flex items-center justify-center mr-3">
                        <Database className="h-4 w-4 text-[#5b7def]" />
                      </div>
                      <h3 className="text-sm font-medium text-[#aaa]">Records Indexed</h3>
                    </div>
                    <p className="text-2xl font-bold">{summaryData.indexingStatus.recordsIndexed.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-[#7c3aed]/10 rounded-full flex items-center justify-center mr-3">
                        <Database className="h-4 w-4 text-[#7c3aed]" />
                      </div>
                      <h3 className="text-sm font-medium text-[#aaa]">Database Size</h3>
                    </div>
                    <p className="text-2xl font-bold">{summaryData.indexingStatus.dbSize}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-[#ec4899]/10 rounded-full flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-[#ec4899]" />
                      </div>
                      <h3 className="text-sm font-medium text-[#aaa]">Avg. Response Time</h3>
                    </div>
                    <p className="text-2xl font-bold">{summaryData.indexingStatus.avgResponseTime}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-[#10b981]/10 rounded-full flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-[#10b981]" />
                      </div>
                      <h3 className="text-sm font-medium text-[#aaa]">Webhook Success Rate</h3>
                    </div>
                    <p className="text-2xl font-bold">{summaryData.indexingStatus.webhookSuccessRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
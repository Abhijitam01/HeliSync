import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IndexingLog, LogType } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle2, Download, Info, RefreshCw, Search, XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { format } from "date-fns";

// Sample log data
const sampleLogs: IndexingLog[] = [
  {
    id: "log-001",
    timestamp: "2023-07-15T12:30:45Z",
    message: "Webhook registered successfully with Helius",
    type: LogType.SUCCESS,
  },
  {
    id: "log-002",
    timestamp: "2023-07-15T12:31:12Z",
    message: "Started indexing NFT bid data",
    type: LogType.INFO,
  },
  {
    id: "log-003",
    timestamp: "2023-07-15T12:32:05Z",
    message: "Processed 5 NFT bid events from Magic Eden",
    type: LogType.SUCCESS,
  },
  {
    id: "log-004",
    timestamp: "2023-07-15T12:33:17Z",
    message: "Processed 3 token price updates from Jupiter",
    type: LogType.SUCCESS,
  },
  {
    id: "log-005",
    timestamp: "2023-07-15T12:34:22Z",
    message: "Warning: Duplicate NFT bid event detected",
    type: LogType.WARNING,
  },
  {
    id: "log-006",
    timestamp: "2023-07-15T12:35:41Z",
    message: "Error connecting to database - connection reset",
    type: LogType.ERROR,
  },
  {
    id: "log-007",
    timestamp: "2023-07-15T12:36:19Z",
    message: "Database connection restored",
    type: LogType.SUCCESS,
  },
  {
    id: "log-008",
    timestamp: "2023-07-15T12:37:05Z",
    message: "Reconnected to Helius webhook service",
    type: LogType.INFO,
  },
  {
    id: "log-009",
    timestamp: "2023-07-15T12:38:14Z",
    message: "Processed 2 borrowable token events from Solend",
    type: LogType.SUCCESS,
  },
  {
    id: "log-010",
    timestamp: "2023-07-15T12:39:27Z",
    message: "Warning: Slow query detected in token_prices table",
    type: LogType.WARNING,
  },
  {
    id: "log-011",
    timestamp: "2023-07-15T12:40:13Z",
    message: "Database schema updated for nft_bids table",
    type: LogType.INFO,
  },
  {
    id: "log-012",
    timestamp: "2023-07-15T12:41:45Z",
    message: "Error: Failed to parse event data from Helius",
    type: LogType.ERROR,
  },
  {
    id: "log-013",
    timestamp: "2023-07-15T12:42:31Z",
    message: "Indexing preferences updated by user",
    type: LogType.INFO,
  },
  {
    id: "log-014",
    timestamp: "2023-07-15T12:43:15Z",
    message: "Applied new webhook configuration",
    type: LogType.SUCCESS,
  },
  {
    id: "log-015",
    timestamp: "2023-07-15T12:44:02Z",
    message: "Processed 8 NFT bid events from Tensor",
    type: LogType.SUCCESS,
  },
];

export default function LogsPage() {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Mock query for logs - would be replaced with a real API call
  const { data: logs, isLoading, refetch } = useQuery<IndexingLog[]>({
    queryKey: ["/api/webhook/logs"],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return sampleLogs;
    },
  });
  
  // Filter logs based on selected type and search query
  const filteredLogs = React.useMemo(() => {
    if (!logs) return [];
    
    return logs.filter((log) => {
      const matchesType = filterType === "all" || log.type === filterType;
      const matchesSearch = searchQuery 
        ? log.message.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
        
      return matchesType && matchesSearch;
    });
  }, [logs, filterType, searchQuery]);
  
  // Sort logs by timestamp - newest first
  const sortedLogs = React.useMemo(() => {
    return [...filteredLogs].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [filteredLogs]);
  
  // Get counts by log type for the tabs
  const logCounts = React.useMemo(() => {
    if (!logs) return { all: 0, info: 0, success: 0, warning: 0, error: 0 };
    
    return {
      all: logs.length,
      info: logs.filter(log => log.type === LogType.INFO).length,
      success: logs.filter(log => log.type === LogType.SUCCESS).length,
      warning: logs.filter(log => log.type === LogType.WARNING).length,
      error: logs.filter(log => log.type === LogType.ERROR).length,
    };
  }, [logs]);
  
  // Function to render log message with icon based on type
  const renderLogMessage = (log: IndexingLog) => {
    let icon;
    let textColorClass;
    
    switch (log.type) {
      case LogType.INFO:
        icon = <Info className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />;
        textColorClass = "text-blue-400";
        break;
      case LogType.SUCCESS:
        icon = <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />;
        textColorClass = "text-green-400";
        break;
      case LogType.WARNING:
        icon = <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />;
        textColorClass = "text-yellow-400";
        break;
      case LogType.ERROR:
        icon = <XCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />;
        textColorClass = "text-red-400";
        break;
      default:
        icon = <Info className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />;
        textColorClass = "text-blue-400";
    }
    
    return (
      <div className="flex items-start">
        {icon}
        <span className={textColorClass}>{log.message}</span>
      </div>
    );
  };
  
  // Function to render log type badge
  const renderLogTypeBadge = (type: LogType) => {
    switch (type) {
      case LogType.INFO:
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>;
      case LogType.SUCCESS:
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Success</Badge>;
      case LogType.WARNING:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Warning</Badge>;
      case LogType.ERROR:
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Error</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>;
    }
  };
  
  // Function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return format(date, "MMM dd, yyyy HH:mm:ss");
    } catch (error) {
      return timestamp;
    }
  };
  
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="mr-4 border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]"
              onClick={() => window.history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="ml-2">Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Webhook Logs</h1>
              <p className="text-[#aaa] mt-2">Monitor and troubleshoot your data indexing process</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]"
              onClick={() => refetch()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" className="border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#555]" />
            <Input
              placeholder="Search logs..."
              className="pl-10 border-[#222] bg-[#0a0a0a] text-[#aaa]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px] border-[#222] bg-[#0a0a0a] text-[#aaa]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="border-[#222] bg-[#0a0a0a]">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={LogType.INFO}>Info</SelectItem>
              <SelectItem value={LogType.SUCCESS}>Success</SelectItem>
              <SelectItem value={LogType.WARNING}>Warning</SelectItem>
              <SelectItem value={LogType.ERROR}>Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="all" className="mb-10" onValueChange={setFilterType}>
          <TabsList className="mb-6 bg-[#121212] border border-[#222]">
            <TabsTrigger value="all">
              All <Badge className="ml-2 bg-[#222] text-[#aaa]">{logCounts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value={LogType.INFO}>
              Info <Badge className="ml-2 bg-blue-500/20 text-blue-400">{logCounts.info}</Badge>
            </TabsTrigger>
            <TabsTrigger value={LogType.SUCCESS}>
              Success <Badge className="ml-2 bg-green-500/20 text-green-400">{logCounts.success}</Badge>
            </TabsTrigger>
            <TabsTrigger value={LogType.WARNING}>
              Warnings <Badge className="ml-2 bg-yellow-500/20 text-yellow-400">{logCounts.warning}</Badge>
            </TabsTrigger>
            <TabsTrigger value={LogType.ERROR}>
              Errors <Badge className="ml-2 bg-red-500/20 text-red-400">{logCounts.error}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <Card className="bg-[#0f0f0f] border border-[#222]">
            <CardHeader>
              <CardTitle>Log Entries</CardTitle>
              <CardDescription className="text-[#aaa]">
                {isLoading ? "Loading logs..." : 
                  `Showing ${sortedLogs.length} of ${logs?.length || 0} log entries`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <RefreshCw className="animate-spin h-8 w-8 text-[#5b7def]" />
                </div>
              ) : sortedLogs.length === 0 ? (
                <div className="text-center py-12 text-[#aaa]">
                  <p>No logs found matching your criteria</p>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {sortedLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className="p-4 rounded-md border border-[#222] bg-[#0a0a0a]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#777]">
                            {formatTimestamp(log.timestamp)}
                          </span>
                          {renderLogTypeBadge(log.type)}
                        </div>
                        {renderLogMessage(log)}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </Tabs>
        
        <Card className="bg-[#0f0f0f] border border-[#222] mb-8">
          <CardHeader>
            <CardTitle>Troubleshooting Guide</CardTitle>
            <CardDescription className="text-[#aaa]">
              Common issues and how to resolve them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-yellow-500/30 rounded bg-yellow-500/10">
                <h3 className="text-yellow-400 font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Webhook Connection Issues
                </h3>
                <p className="text-sm text-[#aaa] mt-1">
                  If you see "Error connecting to webhook" messages, verify your Helius API key and ensure your webhook endpoint is publicly accessible.
                </p>
              </div>
              
              <div className="p-3 border border-red-500/30 rounded bg-red-500/10">
                <h3 className="text-red-400 font-medium flex items-center">
                  <XCircle className="h-4 w-4 mr-2" />
                  Database Connection Errors
                </h3>
                <p className="text-sm text-[#aaa] mt-1">
                  Database connection errors can occur if your credentials are incorrect or the database is unavailable. Verify your database settings in the dashboard.
                </p>
              </div>
              
              <div className="p-3 border border-blue-500/30 rounded bg-blue-500/10">
                <h3 className="text-blue-400 font-medium flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Data Processing Delays
                </h3>
                <p className="text-sm text-[#aaa] mt-1">
                  If you notice delays in data processing, check for any warnings about slow queries or performance issues in the logs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
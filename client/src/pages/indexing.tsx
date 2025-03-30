import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IndexingPreferences } from "@/lib/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Database, Webhook, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function IndexingOptions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<IndexingPreferences>({
    nftBids: false,
    tokenPrices: false,
    borrowableTokens: false,
  });

  // Fetch current preferences
  const { isLoading } = useQuery<IndexingPreferences>({
    queryKey: ["/api/indexing/preferences"],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) return { nftBids: false, tokenPrices: false, borrowableTokens: false };
      return await res.json();
    },
  });
  
  // Use this effect to update preferences when data is loaded
  React.useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch("/api/indexing/preferences");
        if (res.ok) {
          const data = await res.json();
          setPreferences(data);
        }
      } catch (error) {
        console.error("Failed to fetch preferences:", error);
      }
    };
    
    fetchPreferences();
  }, []);

  // Save preferences mutation
  const savePreferencesMutation = useMutation({
    mutationFn: async (data: IndexingPreferences) => {
      const response = await apiRequest("POST", "/api/indexing/preferences", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Preferences saved",
        description: "Your indexing preferences have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/indexing/preferences"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update indexing preferences",
        variant: "destructive",
      });
    },
  });

  // Register webhook mutation
  const registerWebhookMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/webhook/register", {
        webhookUrl: window.location.origin + "/webhook/" + user?.id,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Webhook registered",
        description: "Your webhook has been registered with Helius successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Failed to register webhook",
        variant: "destructive",
      });
    },
  });

  const handlePreferenceChange = (key: keyof IndexingPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const savePreferences = () => {
    savePreferencesMutation.mutate(preferences);
  };

  const registerWebhook = () => {
    registerWebhookMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 max-w-5xl">
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
              <h1 className="text-3xl font-bold gradient-text">Indexing Options</h1>
              <p className="text-[#aaa] mt-2">Configure which Solana blockchain data to index</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white">
            {isLoading ? "Loading..." : preferences.nftBids || preferences.tokenPrices || preferences.borrowableTokens ? "Active" : "Inactive"}
          </Badge>
        </div>
        
        <Alert className="mb-6 bg-[#131313] border-yellow-500/50">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-yellow-500">Database Required</AlertTitle>
          <AlertDescription className="text-[#aaa]">
            You must configure a valid database connection before activating indexing options.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="options" className="mb-10">
          <TabsList className="mb-6 bg-[#121212] border border-[#222]">
            <TabsTrigger value="options" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              <span>Indexing Options</span>
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center">
              <Webhook className="mr-2 h-4 w-4" />
              <span>Webhook Setup</span>
            </TabsTrigger>
            <TabsTrigger value="schema" className="flex items-center">
              <Database className="mr-2 h-4 w-4" />
              <span>Database Schema</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Indexing Options Tab */}
          <TabsContent value="options" className="space-y-6">
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Data Types</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Select which blockchain data types you want to index into your database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-[#222] rounded-md bg-[#0a0a0a]">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-[#5b7def]" />
                        <h4 className="font-medium">NFT Bids</h4>
                      </div>
                      <p className="text-sm text-[#aaa]">Index NFT bid data from popular Solana marketplaces</p>
                      <ul className="text-xs text-[#777] space-y-1 list-disc list-inside">
                        <li>Magic Eden bid events</li>
                        <li>Tensor bid events</li>
                        <li>Bid cancellations and acceptances</li>
                      </ul>
                    </div>
                    <Switch 
                      checked={preferences.nftBids}
                      onCheckedChange={(checked) => handlePreferenceChange("nftBids", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-[#222] rounded-md bg-[#0a0a0a]">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-[#5b7def]" />
                        <h4 className="font-medium">Token Prices</h4>
                      </div>
                      <p className="text-sm text-[#aaa]">Track real-time token price changes from DEXes</p>
                      <ul className="text-xs text-[#777] space-y-1 list-disc list-inside">
                        <li>Jupiter swap events</li>
                        <li>Raydium liquidity events</li>
                        <li>Price updates with USD and SOL values</li>
                      </ul>
                    </div>
                    <Switch 
                      checked={preferences.tokenPrices}
                      onCheckedChange={(checked) => handlePreferenceChange("tokenPrices", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-[#222] rounded-md bg-[#0a0a0a]">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-[#5b7def]" />
                        <h4 className="font-medium">Borrowable Tokens</h4>
                      </div>
                      <p className="text-sm text-[#aaa]">Monitor tokens available on lending protocols</p>
                      <ul className="text-xs text-[#777] space-y-1 list-disc list-inside">
                        <li>Solend supply/borrow events</li>
                        <li>Mango Markets updates</li>
                        <li>Interest rate changes</li>
                      </ul>
                    </div>
                    <Switch 
                      checked={preferences.borrowableTokens}
                      onCheckedChange={(checked) => handlePreferenceChange("borrowableTokens", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-[#5b7def] hover:bg-[#4a6ade]" 
                  onClick={savePreferences}
                  disabled={savePreferencesMutation.isPending}
                >
                  {savePreferencesMutation.isPending ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Webhook Setup Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Set up webhooks to receive blockchain data from Helius
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border border-[#222] rounded-md bg-[#0a0a0a]">
                    <h4 className="font-medium mb-2">Webhook URL</h4>
                    <div className="bg-[#0a0a0a] border border-[#222] rounded p-2 text-sm font-mono text-[#aaa]">
                      {window.location.origin}/webhook/{user?.id}
                    </div>
                    <p className="text-xs text-[#777] mt-2">
                      This is the URL that will receive webhook events from Helius
                    </p>
                  </div>
                  
                  <Separator className="bg-[#222]" />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Steps to Configure</h4>
                    
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">1</div>
                        </div>
                        <div>
                          <h4 className="text-base font-medium mb-1">Save Indexing Preferences</h4>
                          <p className="text-sm text-[#aaa]">Select which data types you want to index in the Indexing Options tab</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">2</div>
                        </div>
                        <div>
                          <h4 className="text-base font-medium mb-1">Register Webhook</h4>
                          <p className="text-sm text-[#aaa]">Click the button below to register your webhook with Helius</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">3</div>
                        </div>
                        <div>
                          <h4 className="text-base font-medium mb-1">Monitor Webhook Logs</h4>
                          <p className="text-sm text-[#aaa]">Check the Logs section to verify that data is being indexed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-[#5b7def] hover:bg-[#4a6ade]" 
                  onClick={registerWebhook}
                  disabled={registerWebhookMutation.isPending}
                >
                  {registerWebhookMutation.isPending ? "Registering..." : "Register Webhook"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Database Schema Tab */}
          <TabsContent value="schema" className="space-y-6">
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Database Schema</CardTitle>
                <CardDescription className="text-[#aaa]">
                  SQL schema created based on your indexing preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-[#0a0a0a] rounded-md overflow-hidden">
                      <div className="flex items-center bg-[#0f0f0f] px-4 py-2 border-b border-[#222]">
                        <Database className="text-[#5b7def] w-4 h-4 mr-2" />
                        <h4 className="font-medium">nft_bids</h4>
                      </div>
                      <pre className="text-sm text-[#aaa] overflow-x-auto p-4">{`
CREATE TABLE nft_bids (
  id SERIAL PRIMARY KEY,
  bid_id TEXT NOT NULL,
  bid_amount NUMERIC NOT NULL,
  bidder_address TEXT NOT NULL,
  nft_address TEXT NOT NULL,
  marketplace TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

CREATE INDEX idx_nft_bids_nft_address ON nft_bids(nft_address);
CREATE INDEX idx_nft_bids_timestamp ON nft_bids(timestamp);
                      `}</pre>
                    </div>
                    
                    <div className="bg-[#0a0a0a] rounded-md overflow-hidden">
                      <div className="flex items-center bg-[#0f0f0f] px-4 py-2 border-b border-[#222]">
                        <Database className="text-[#5b7def] w-4 h-4 mr-2" />
                        <h4 className="font-medium">token_prices</h4>
                      </div>
                      <pre className="text-sm text-[#aaa] overflow-x-auto p-4">{`
CREATE TABLE token_prices (
  id SERIAL PRIMARY KEY,
  token_address TEXT NOT NULL,
  price_usd NUMERIC NOT NULL,
  price_sol NUMERIC NOT NULL,
  source TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

CREATE INDEX idx_token_prices_token_address ON token_prices(token_address);
CREATE INDEX idx_token_prices_timestamp ON token_prices(timestamp);
                      `}</pre>
                    </div>
                    
                    <div className="bg-[#0a0a0a] rounded-md overflow-hidden">
                      <div className="flex items-center bg-[#0f0f0f] px-4 py-2 border-b border-[#222]">
                        <Database className="text-[#5b7def] w-4 h-4 mr-2" />
                        <h4 className="font-medium">borrowable_tokens</h4>
                      </div>
                      <pre className="text-sm text-[#aaa] overflow-x-auto p-4">{`
CREATE TABLE borrowable_tokens (
  id SERIAL PRIMARY KEY,
  token_address TEXT NOT NULL,
  token_name TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  supply_apy NUMERIC NOT NULL,
  borrow_apy NUMERIC NOT NULL,
  platform TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

CREATE INDEX idx_borrowable_tokens_platform ON borrowable_tokens(platform);
CREATE INDEX idx_borrowable_tokens_timestamp ON borrowable_tokens(timestamp);
                      `}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}
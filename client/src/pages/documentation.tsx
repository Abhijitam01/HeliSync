import React from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Database, Webhook, Code, Globe, ExternalLink, Terminal, Server, Shield, BarChart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="flex items-center mb-6">
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
        </div>
      
        <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text glow-text">HeliSync Documentation</h1>
        <p className="text-lg text-[#aaa] mb-10">
          A comprehensive guide to indexing Solana blockchain data into Neon Postgres
        </p>
        
        <Tabs defaultValue="getting-started" className="mb-10">
          <TabsList className="mb-6 bg-[#121212] border border-[#222]">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="database">Database Setup</TabsTrigger>
            <TabsTrigger value="indexing">Indexing Options</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
          </TabsList>
          
          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-6">
            <div className="dashboard-card">
              <h2 className="text-2xl font-semibold mb-4 pt-4 secondary-gradient-text">Overview</h2>
              <p className="text-[#ddd]">
                HeliSync is a blockchain indexing platform that enables developers to
                index Solana data into Neon Postgres using Helius webhooks. This
                documentation will guide you through setting up and using HeliSync
                effectively.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#5b7def]">Prerequisites</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[#222] rounded-lg p-4 bg-[#0a0a0a]">
                  <div className="flex items-center mb-3">
                    <Shield className="text-[#5b7def] w-5 h-5 mr-2" />
                    <h4 className="font-medium">Solana Wallet</h4>
                  </div>
                  <p className="text-sm text-[#aaa]">
                    A Solana wallet like Phantom or Solflare for authentication.
                  </p>
                </div>
                
                <div className="border border-[#222] rounded-lg p-4 bg-[#0a0a0a]">
                  <div className="flex items-center mb-3">
                    <Terminal className="text-[#5b7def] w-5 h-5 mr-2" />
                    <h4 className="font-medium">Helius API Key</h4>
                  </div>
                  <p className="text-sm text-[#aaa]">
                    An API key from Helius to access webhook functionality.
                  </p>
                </div>
                
                <div className="border border-[#222] rounded-lg p-4 bg-[#0a0a0a]">
                  <div className="flex items-center mb-3">
                    <Database className="text-[#5b7def] w-5 h-5 mr-2" />
                    <h4 className="font-medium">Neon Database</h4>
                  </div>
                  <p className="text-sm text-[#aaa]">
                    A Neon Postgres database to store indexed blockchain data.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#5b7def]">Setup Process</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">1</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Create an Account</h4>
                    <p className="text-[#aaa]">Sign up for a HeliSync account to access the dashboard and API.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">2</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Configure Database</h4>
                    <p className="text-[#aaa]">Connect HeliSync to your Neon Postgres database.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">3</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Select Indexing Preferences</h4>
                    <p className="text-[#aaa]">Choose which blockchain data you want to index.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">4</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Start Indexing</h4>
                    <p className="text-[#aaa]">HeliSync will begin indexing data to your database in real-time.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button className="bg-[#5b7def] hover:bg-[#4a6ade]">
                  <Link to="/signup">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Database Setup Tab */}
          <TabsContent value="database" className="space-y-6">
            <div className="dashboard-card">
              <h2 className="text-2xl font-semibold mb-4 pt-4 secondary-gradient-text">Setting Up Your Database</h2>
              <p className="text-[#ddd] mb-6">
                HeliSync requires a connection to your Neon Postgres database. 
                You'll need to provide your database credentials in the Dashboard.
              </p>
              
              <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-[#5b7def]">Required Database Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-1/4 text-[#aaa] font-medium">Hostname</div>
                    <div className="flex-grow">
                      <p>Your Neon database host URL</p>
                      <p className="text-sm text-[#777] mt-1">Example: <code>ep-cool-snow-123456.us-east-2.aws.neon.tech</code></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-1/4 text-[#aaa] font-medium">Port</div>
                    <div className="flex-grow">
                      <p>Usually 5432 for Postgres</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-1/4 text-[#aaa] font-medium">Username</div>
                    <div className="flex-grow">
                      <p>Your database username</p>
                      <p className="text-sm text-[#777] mt-1">Example: <code>neondb_owner</code></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-1/4 text-[#aaa] font-medium">Password</div>
                    <div className="flex-grow">
                      <p>Your database password</p>
                      <p className="text-sm text-[#777] mt-1">We encrypt your password and never share it</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-1/4 text-[#aaa] font-medium">Database Name</div>
                    <div className="flex-grow">
                      <p>The name of your database</p>
                      <p className="text-sm text-[#777] mt-1">Example: <code>solana_data</code></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#5b7def]">Database Schema</h3>
              <p className="text-[#ddd] mb-4">
                HeliSync automatically creates the following tables in your database based on your indexing preferences:
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="nft_bids" className="border-[#222]">
                  <AccordionTrigger className="hover:bg-[#0a0a0a] py-3 px-4">
                    <div className="flex items-center">
                      <Database className="text-[#5b7def] w-4 h-4 mr-2" />
                      <span>nft_bids</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0a0a0a] px-4 pt-0 pb-4">
                    <pre className="text-sm text-[#aaa] overflow-x-auto p-2">{`
CREATE TABLE nft_bids (
  id SERIAL PRIMARY KEY,
  bid_id TEXT NOT NULL,
  bid_amount NUMERIC NOT NULL,
  bidder_address TEXT NOT NULL,
  nft_address TEXT NOT NULL,
  marketplace TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);
                    `}</pre>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="token_prices" className="border-[#222]">
                  <AccordionTrigger className="hover:bg-[#0a0a0a] py-3 px-4">
                    <div className="flex items-center">
                      <Database className="text-[#5b7def] w-4 h-4 mr-2" />
                      <span>token_prices</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0a0a0a] px-4 pt-0 pb-4">
                    <pre className="text-sm text-[#aaa] overflow-x-auto p-2">{`
CREATE TABLE token_prices (
  id SERIAL PRIMARY KEY,
  token_address TEXT NOT NULL,
  price_usd NUMERIC NOT NULL,
  price_sol NUMERIC NOT NULL,
  source TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL
);
                    `}</pre>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="borrowable_tokens" className="border-[#222]">
                  <AccordionTrigger className="hover:bg-[#0a0a0a] py-3 px-4">
                    <div className="flex items-center">
                      <Database className="text-[#5b7def] w-4 h-4 mr-2" />
                      <span>borrowable_tokens</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0a0a0a] px-4 pt-0 pb-4">
                    <pre className="text-sm text-[#aaa] overflow-x-auto p-2">{`
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
                    `}</pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          {/* Indexing Options Tab */}
          <TabsContent value="indexing" className="space-y-6">
            <div className="dashboard-card">
              <h2 className="text-2xl font-semibold mb-4 pt-4 secondary-gradient-text">Configuring Indexing Options</h2>
              <p className="text-[#ddd] mb-6">
                HeliSync allows you to customize what Solana data gets indexed into your database.
                This is controlled through the Indexing Options in your Dashboard.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="border border-[#222] rounded-lg p-5 bg-[#0a0a0a]">
                  <div className="flex items-center mb-3">
                    <BarChart className="text-[#5b7def] w-5 h-5 mr-2" />
                    <h4 className="font-medium">NFT Bids</h4>
                  </div>
                  <p className="text-sm text-[#aaa] mb-3">
                    Index NFT bid data from popular Solana marketplaces.
                  </p>
                  <ul className="text-xs text-[#777] space-y-1 list-disc list-inside">
                    <li>Magic Eden bid events</li>
                    <li>Tensor bid events</li>
                    <li>Bid cancellations and acceptances</li>
                  </ul>
                </div>
                
                <div className="border border-[#222] rounded-lg p-5 bg-[#0a0a0a]">
                  <div className="flex items-center mb-3">
                    <BarChart className="text-[#5b7def] w-5 h-5 mr-2" />
                    <h4 className="font-medium">Token Prices</h4>
                  </div>
                  <p className="text-sm text-[#aaa] mb-3">
                    Track real-time token price changes from DEXes.
                  </p>
                  <ul className="text-xs text-[#777] space-y-1 list-disc list-inside">
                    <li>Jupiter swap events</li>
                    <li>Raydium liquidity events</li>
                    <li>Price updates with USD and SOL values</li>
                  </ul>
                </div>
                
                <div className="border border-[#222] rounded-lg p-5 bg-[#0a0a0a]">
                  <div className="flex items-center mb-3">
                    <BarChart className="text-[#5b7def] w-5 h-5 mr-2" />
                    <h4 className="font-medium">Borrowable Tokens</h4>
                  </div>
                  <p className="text-sm text-[#aaa] mb-3">
                    Monitor tokens available on lending protocols.
                  </p>
                  <ul className="text-xs text-[#777] space-y-1 list-disc list-inside">
                    <li>Solend supply/borrow events</li>
                    <li>Mango Markets updates</li>
                    <li>Interest rate changes</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#5b7def]">How It Works</h3>
              <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6">
                <ol className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">1</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Configure Preferences</h4>
                      <p className="text-[#aaa]">Select which data types you want to index in your dashboard.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">2</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Webhook Registration</h4>
                      <p className="text-[#aaa]">HeliSync registers webhooks with Helius based on your selections.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">3</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Data Processing</h4>
                      <p className="text-[#aaa]">When events occur on Solana, HeliSync processes the webhook data.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-8 w-8 rounded-full bg-[#5b7def]/20 flex items-center justify-center text-[#5b7def]">4</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Database Storage</h4>
                      <p className="text-[#aaa]">Processed data is stored in your Neon database in the appropriate tables.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </TabsContent>
          
          {/* API Reference Tab */}
          <TabsContent value="api" className="space-y-6">
            <div className="dashboard-card">
              <h2 className="text-2xl font-semibold mb-4 pt-4 secondary-gradient-text">API Reference</h2>
              <p className="text-[#ddd] mb-6">
                HeliSync exposes several API endpoints for programmatic access to your indexed data.
                All endpoints require authentication with your JWT token.
              </p>
              
              <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-[#5b7def]">Authentication</h3>
                <p className="text-[#aaa] mb-4">
                  All API requests require a valid JWT token in the Authorization header:
                </p>
                <pre className="bg-[#070707] p-3 rounded-md overflow-x-auto mb-4 text-sm">
                  <code className="text-green-400">Authorization: Bearer your-jwt-token</code>
                </pre>
                <p className="text-[#aaa]">
                  You can obtain a token by logging in via the <code className="text-green-400">/api/auth/login</code> endpoint.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-[#5b7def]">Available Endpoints</h3>
              
              <Accordion type="single" collapsible className="w-full mb-6">
                <AccordionItem value="user-endpoints" className="border-[#222]">
                  <AccordionTrigger className="hover:bg-[#0a0a0a] py-3 px-4">
                    <div className="flex items-center">
                      <Shield className="text-[#5b7def] w-4 h-4 mr-2" />
                      <span>User Endpoints</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0a0a0a] px-4 pt-0 pb-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1 text-white">GET /api/user/profile</h4>
                        <p className="text-sm text-[#aaa] mb-2">Returns the current user's profile information</p>
                        <pre className="bg-[#070707] p-2 rounded-md overflow-x-auto text-xs text-green-400">
                          {`
// Response
{
  "id": "123",
  "email": "user@example.com",
  "displayName": "Example User",
  "credentials": {
    "hostname": "db.neon.tech",
    "port": "5432",
    "username": "neondb_owner",
    "databaseName": "solana_data",
    "isValidated": true
  },
  "preferences": {
    "nftBids": true,
    "tokenPrices": true,
    "borrowableTokens": false
  }
}
                          `}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="database-endpoints" className="border-[#222]">
                  <AccordionTrigger className="hover:bg-[#0a0a0a] py-3 px-4">
                    <div className="flex items-center">
                      <Database className="text-[#5b7def] w-4 h-4 mr-2" />
                      <span>Database Endpoints</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0a0a0a] px-4 pt-0 pb-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1 text-white">POST /api/database/credentials</h4>
                        <p className="text-sm text-[#aaa] mb-2">Sets or updates database connection details</p>
                        <pre className="bg-[#070707] p-2 rounded-md overflow-x-auto text-xs text-green-400">
                          {`
// Request
{
  "hostname": "db.neon.tech",
  "port": "5432",
  "username": "neondb_owner",
  "password": "your-password",
  "databaseName": "solana_data"
}

// Response
{
  "id": 1,
  "userId": 123,
  "hostname": "db.neon.tech",
  "port": "5432",
  "username": "neondb_owner",
  "databaseName": "solana_data",
  "isValidated": false
}
                          `}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1 text-white">POST /api/database/validate</h4>
                        <p className="text-sm text-[#aaa] mb-2">Validates the database connection</p>
                        <pre className="bg-[#070707] p-2 rounded-md overflow-x-auto text-xs text-green-400">
                          {`
// Request
{
  "id": 1
}

// Response
{
  "success": true,
  "message": "Database connection validated successfully"
}
                          `}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="indexing-endpoints" className="border-[#222]">
                  <AccordionTrigger className="hover:bg-[#0a0a0a] py-3 px-4">
                    <div className="flex items-center">
                      <Server className="text-[#5b7def] w-4 h-4 mr-2" />
                      <span>Indexing Endpoints</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0a0a0a] px-4 pt-0 pb-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1 text-white">POST /api/indexing/preferences</h4>
                        <p className="text-sm text-[#aaa] mb-2">Updates indexing preferences</p>
                        <pre className="bg-[#070707] p-2 rounded-md overflow-x-auto text-xs text-green-400">
                          {`
// Request
{
  "nftBids": true,
  "tokenPrices": true,
  "borrowableTokens": false
}

// Response
{
  "id": 1,
  "userId": 123,
  "nftBids": true,
  "tokenPrices": true,
  "borrowableTokens": false,
  "updatedAt": "2023-07-15T16:30:22Z"
}
                          `}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="webhook-endpoints" className="border-[#222]">
                  <AccordionTrigger className="hover:bg-[#0a0a0a] py-3 px-4">
                    <div className="flex items-center">
                      <Webhook className="text-[#5b7def] w-4 h-4 mr-2" />
                      <span>Webhook Endpoints</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0a0a0a] px-4 pt-0 pb-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1 text-white">GET /api/webhook/logs</h4>
                        <p className="text-sm text-[#aaa] mb-2">Returns recent webhook activity logs</p>
                        <pre className="bg-[#070707] p-2 rounded-md overflow-x-auto text-xs text-green-400">
                          {`
// Response
{
  "logs": [
    {
      "id": "log123",
      "timestamp": "2023-07-15T16:35:22Z",
      "message": "Processed 5 NFT bid events",
      "type": "success"
    },
    {
      "id": "log122",
      "timestamp": "2023-07-15T16:30:12Z",
      "message": "Processed 3 token price updates",
      "type": "info"
    }
  ]
}
                          `}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1 text-white">POST /api/webhook/register</h4>
                        <p className="text-sm text-[#aaa] mb-2">Registers a new webhook with Helius</p>
                        <pre className="bg-[#070707] p-2 rounded-md overflow-x-auto text-xs text-green-400">
                          {`
// Request
{
  "webhookUrl": "https://your-app.com/webhook/123"
}

// Response
{
  "webhookId": "webhook123",
  "webhookUrl": "https://your-app.com/webhook/123",
  "status": "active"
}
                          `}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1 text-white">DELETE /api/webhook/:webhookId</h4>
                        <p className="text-sm text-[#aaa] mb-2">Deletes a webhook</p>
                        <pre className="bg-[#070707] p-2 rounded-md overflow-x-auto text-xs text-green-400">
                          {`
// Response
{
  "success": true
}
                          `}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#5b7def]">SQL Examples</h3>
              <p className="text-[#aaa] mb-4">
                Once data is indexed in your database, you can run SQL queries like these:
              </p>
              
              <div className="space-y-4">
                <div className="bg-[#070707] p-4 rounded-md overflow-x-auto">
                  <h4 className="text-sm font-medium mb-2 text-[#5b7def]">Get average NFT bid prices by day</h4>
                  <pre className="text-xs text-green-400">
                    {`
SELECT 
  DATE_TRUNC('day', timestamp) as day,
  AVG(bid_amount) as avg_bid_amount
FROM nft_bids
GROUP BY day
ORDER BY day DESC
LIMIT 7;
                    `}
                  </pre>
                </div>
                
                <div className="bg-[#070707] p-4 rounded-md overflow-x-auto">
                  <h4 className="text-sm font-medium mb-2 text-[#5b7def]">Find tokens with highest price volatility</h4>
                  <pre className="text-xs text-green-400">
                    {`
SELECT 
  token_address,
  MAX(price_usd) - MIN(price_usd) as price_range,
  AVG(price_usd) as avg_price,
  (MAX(price_usd) - MIN(price_usd)) / NULLIF(AVG(price_usd), 0) as volatility
FROM token_prices
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY token_address
ORDER BY volatility DESC
LIMIT 10;
                    `}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Additional Resources */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 secondary-gradient-text">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://docs.helius.xyz/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="dashboard-card hover:border-[#5b7def] transition-colors group"
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-lg bg-[#5b7def]/10 flex items-center justify-center text-[#5b7def] mr-4 group-hover:bg-[#5b7def]/20 transition-colors">
                  <Webhook className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 flex items-center">
                    Helius Webhooks 
                    <ExternalLink className="h-4 w-4 ml-2 opacity-50 group-hover:opacity-100" />
                  </h3>
                  <p className="text-[#aaa] text-sm">
                    Learn about Helius webhooks and how they capture blockchain data.
                  </p>
                </div>
              </div>
            </a>
            
            <a
              href="https://neon.tech/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="dashboard-card hover:border-[#5b7def] transition-colors group"
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-lg bg-[#5b7def]/10 flex items-center justify-center text-[#5b7def] mr-4 group-hover:bg-[#5b7def]/20 transition-colors">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 flex items-center">
                    Neon Postgres 
                    <ExternalLink className="h-4 w-4 ml-2 opacity-50 group-hover:opacity-100" />
                  </h3>
                  <p className="text-[#aaa] text-sm">
                    Explore Neon serverless Postgres documentation for database optimization.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </section>
        
        <Separator className="my-10 bg-[#222]" />
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-3 gradient-text">Ready to Start Indexing?</h2>
          <p className="text-[#aaa] mb-6 max-w-xl mx-auto">
            Create your account now and start indexing Solana blockchain data in minutes
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-[#5b7def] hover:bg-[#4a6ade]">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button variant="outline">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
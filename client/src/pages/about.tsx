import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Database, 
  BarChart3, 
  Zap, 
  Github, 
  Shield, 
  Clock, 
  ServerIcon, 
  Code, 
  Users,
  CheckCircle2,
  LineChart,
  ChevronsUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-block p-2 px-4 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 mb-6">
            <span className="text-indigo-400 text-sm font-medium">Transforming Blockchain Data</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text">
            Simplifying Solana Data for Developers
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            HeliSync is a comprehensive blockchain indexing platform that transforms raw Solana blockchain data 
            into structured, queryable information in your Neon Postgres database.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center bg-[#111] border border-gray-800 rounded-full px-4 py-2">
              <Database className="h-4 w-4 text-indigo-400 mr-2" />
              <span className="text-gray-300 text-sm">Modern Database Integration</span>
            </div>
            <div className="flex items-center bg-[#111] border border-gray-800 rounded-full px-4 py-2">
              <BarChart3 className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-gray-300 text-sm">Advanced Analytics</span>
            </div>
            <div className="flex items-center bg-[#111] border border-gray-800 rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-gray-300 text-sm">Real-time Processing</span>
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            {/* Mission */}
            <div className="mb-16">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4">
                  <ChevronsUp className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text m-0">Our Mission</h2>
              </div>
              <div className="pl-14">
                <p className="mb-6 text-gray-300 leading-relaxed">
                  We believe in making blockchain data accessible, manageable, and usable 
                  for developers. By providing an intuitive platform to index Solana data into 
                  Neon Postgres databases, we aim to empower developers to build innovative 
                  applications without having to manage complex blockchain data pipelines.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our goal is to democratize access to blockchain data by removing technical barriers
                  and providing tools that make working with Solana as straightforward as working with
                  traditional web2 applications.
                </p>
              </div>
            </div>
            
            {/* Problem Solving */}
            <div className="mb-16">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                  <LineChart className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text m-0">The Problem We're Solving</h2>
              </div>
              <div className="pl-14">
                <p className="mb-6 text-gray-300 leading-relaxed">
                  Blockchain data is inherently distributed and difficult to query efficiently. 
                  Developers building on Solana often need to access this data in a more 
                  traditional format to build user-friendly applications. 
                  HeliSync eliminates the complexity of setting up custom indexers by offering:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-5 rounded-xl border border-gray-800">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                      <h3 className="font-semibold text-white m-0">Real-time Data Integration</h3>
                    </div>
                    <p className="text-gray-300 text-sm ml-7">
                      Seamless integration with Helius webhooks for capturing real-time blockchain events
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-5 rounded-xl border border-gray-800">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                      <h3 className="font-semibold text-white m-0">Database Flexibility</h3>
                    </div>
                    <p className="text-gray-300 text-sm ml-7">
                      Direct connections to Neon Postgres with optimized schema designs
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-5 rounded-xl border border-gray-800">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                      <h3 className="font-semibold text-white m-0">Customizable Indexing</h3>
                    </div>
                    <p className="text-gray-300 text-sm ml-7">
                      Fine-tuned controls over what data to index and how to transform it
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-5 rounded-xl border border-gray-800">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                      <h3 className="font-semibold text-white m-0">Comprehensive Dashboard</h3>
                    </div>
                    <p className="text-gray-300 text-sm ml-7">
                      User-friendly monitoring and detailed logs for complete visibility
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Technology Stack */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
                  <Code className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text m-0">Technology Stack</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-indigo-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[0px_0px] border-b border-indigo-500/20" />
                  <CardContent className="p-6 pt-8 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-400">Frontend</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-indigo-400">R</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">React with TypeScript</span>
                          <p className="text-sm text-gray-400 mt-1">Type-safe component development</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-blue-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-blue-400">T</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">TailwindCSS</span>
                          <p className="text-sm text-gray-400 mt-1">Utility-first styling framework</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-yellow-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-yellow-400">F</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">Firebase Authentication</span>
                          <p className="text-sm text-gray-400 mt-1">Secure user authentication</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-red-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-red-400">RQ</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">React Query</span>
                          <p className="text-sm text-gray-400 mt-1">Efficient data fetching and caching</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-blue-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[0px_0px] border-b border-blue-500/20" />
                  <CardContent className="p-6 pt-8 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Backend</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-green-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-green-400">N</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">Node.js & Express</span>
                          <p className="text-sm text-gray-400 mt-1">Fast, scalable server architecture</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-purple-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-purple-400">D</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">Drizzle ORM</span>
                          <p className="text-sm text-gray-400 mt-1">TypeScript-first database toolkit</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-indigo-400">H</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">Helius API</span>
                          <p className="text-sm text-gray-400 mt-1">Blockchain data webhooks and queries</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded bg-cyan-500/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-semibold text-cyan-400">NP</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">Neon Postgres</span>
                          <p className="text-sm text-gray-400 mt-1">Serverless PostgreSQL database</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Core Values */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text m-0">Our Core Values</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0f0f0f] p-6 rounded-xl border border-[#222] hover:border-indigo-500/30 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-indigo-400" />
                  </div>
                  
                  <h3 className="font-semibold text-xl mb-3 text-white">Simplicity</h3>
                  <p className="text-gray-300 relative z-10">
                    We believe powerful tools should be simple to use. Our platform emphasizes 
                    intuitive design and clear workflows, allowing developers to focus on building rather than configuring.
                  </p>
                </div>
                
                <div className="bg-[#0f0f0f] p-6 rounded-xl border border-[#222] hover:border-blue-500/30 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  
                  <h3 className="font-semibold text-xl mb-3 text-white">Reliability</h3>
                  <p className="text-gray-300 relative z-10">
                    Blockchain data indexing requires consistent, reliable processing. 
                    We've built HeliSync to be dependable under all conditions, with robust error handling and recovery mechanisms.
                  </p>
                </div>
                
                <div className="bg-[#0f0f0f] p-6 rounded-xl border border-[#222] hover:border-cyan-500/30 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent flex items-center justify-center mb-4">
                    <ServerIcon className="h-6 w-6 text-cyan-400" />
                  </div>
                  
                  <h3 className="font-semibold text-xl mb-3 text-white">Transparency</h3>
                  <p className="text-gray-300 relative z-10">
                    We provide detailed logs and clear information about how your data 
                    is being processed and stored, giving you complete visibility into your indexing operations.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Team */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text m-0">The Team Behind HeliSync</h2>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed pl-14">
                HeliSync was built by a team of blockchain enthusiasts and database experts who 
                saw the need for better tools in the Solana ecosystem. 
                Our collective experience spans distributed systems, database optimization, 
                and blockchain development, bringing together the best practices from both traditional and Web3 development.
              </p>
              
              <div className="bg-gradient-to-br from-[#0f0f0f] to-[#080808] p-8 rounded-xl border border-[#222] relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[0px_0px]" />
                <div className="relative z-10">
                  <div className="flex justify-center mb-8">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center">
                      <Github className="h-6 w-6 text-indigo-400" />
                    </div>
                  </div>
                  <p className="italic text-lg text-gray-300 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
                    "We created HeliSync because we were tired of reinventing the wheel every time 
                    we needed to work with Solana data in traditional applications. We believe this 
                    tool will help bridge the gap between blockchain innovation and practical application development."
                  </p>
                  <p className="text-center text-gray-400">
                    — <span className="font-semibold text-indigo-400">Abhijitam Dubey</span> , Founder of HeliSync
                  </p>
                  <div className="flex justify-center mt-6 space-x-4">
                    <a 
                      href="https://github.com/Abhijitam01/HeliSync.git" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://x.com/DubeyAbhijitam" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/abhijitam-dubey-3ab794263/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Join */}
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Ready to transform how you work with Solana data?</p>
              <a 
                href="/signup" 
                className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-white font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
              >
                Start Building with HeliSync
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
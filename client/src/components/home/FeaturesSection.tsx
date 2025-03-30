import { Zap, Shield, Settings, Clock, Database, Search, Cpu, Globe } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20" id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="secondary-gradient-text glow-text">Powerful Blockchain Indexing</span>
        </h2>
        <p className="text-[#aaa] max-w-2xl mx-auto">
          HeliSync provides powerful tools to index, store, and analyze Solana blockchain data
          with enterprise-grade reliability and performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Feature 1 */}
        <div className="dashboard-card hover:border-[#5b7def] transition-all duration-300 group">
          <div className="w-12 h-12 bg-[#5b7def]/10 group-hover:bg-[#5b7def]/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
            <Zap className="h-6 w-6 text-[#5b7def]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[#5b7def] transition-colors">Real-Time Indexing</h3>
          <p className="text-[#aaa]">
            Process Solana blockchain data with under 1 second latency using 
            Helius webhooks for real-time analytics and monitoring.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start text-sm">
              <Clock className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Sub-second processing latency</span>
            </li>
            <li className="flex items-start text-sm">
              <Cpu className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Auto-scaling webhook processing</span>
            </li>
          </ul>
        </div>

        {/* Feature 2 */}
        <div className="dashboard-card hover:border-[#5b7def] transition-all duration-300 group">
          <div className="w-12 h-12 bg-[#5b7def]/10 group-hover:bg-[#5b7def]/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
            <Shield className="h-6 w-6 text-[#5b7def]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[#5b7def] transition-colors">Secure Data Pipeline</h3>
          <p className="text-[#aaa]">
            Your database credentials are encrypted and stored securely. 
            All communications use HTTPS for maximum security.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start text-sm">
              <Shield className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Encrypted database credentials</span>
            </li>
            <li className="flex items-start text-sm">
              <Globe className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">HTTPS-only communication</span>
            </li>
          </ul>
        </div>

        {/* Feature 3 */}
        <div className="dashboard-card hover:border-[#5b7def] transition-all duration-300 group">
          <div className="w-12 h-12 bg-[#5b7def]/10 group-hover:bg-[#5b7def]/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
            <Settings className="h-6 w-6 text-[#5b7def]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[#5b7def] transition-colors">Customizable Indexing</h3>
          <p className="text-[#aaa]">
            Configure exactly what blockchain data to track with intuitive
            toggles for NFT bids, token prices, and more.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start text-sm">
              <Settings className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Granular indexing control</span>
            </li>
            <li className="flex items-start text-sm">
              <Database className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Optimized database schemas</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
        {/* Feature 4 */}
        <div className="dashboard-card hover:border-[#5b7def] transition-all duration-300 group">
          <div className="w-12 h-12 bg-[#5b7def]/10 group-hover:bg-[#5b7def]/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
            <Database className="h-6 w-6 text-[#5b7def]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[#5b7def] transition-colors">Postgres Integration</h3>
          <p className="text-[#aaa]">
            Connect directly to your Neon Postgres database for seamless 
            blockchain data indexing and SQL-based analytics.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start text-sm">
              <Database className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Fast serverless Postgres</span>
            </li>
            <li className="flex items-start text-sm">
              <Search className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Complex SQL analytics</span>
            </li>
          </ul>
        </div>

        {/* Feature 5 */}
        <div className="dashboard-card hover:border-[#5b7def] transition-all duration-300 group">
          <div className="w-12 h-12 bg-[#5b7def]/10 group-hover:bg-[#5b7def]/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
            <Cpu className="h-6 w-6 text-[#5b7def]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[#5b7def] transition-colors">Helius Webhooks</h3>
          <p className="text-[#aaa]">
            Leverage Helius webhooks to monitor NFT trading, token prices, 
            and protocol activities on the Solana blockchain.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start text-sm">
              <Zap className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Enhanced transaction details</span>
            </li>
            <li className="flex items-start text-sm">
              <Clock className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Real-time event detection</span>
            </li>
          </ul>
        </div>

        {/* Feature 6 */}
        <div className="dashboard-card hover:border-[#5b7def] transition-all duration-300 group">
          <div className="w-12 h-12 bg-[#5b7def]/10 group-hover:bg-[#5b7def]/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
            <Search className="h-6 w-6 text-[#5b7def]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[#5b7def] transition-colors">Advanced Analytics</h3>
          <p className="text-[#aaa]">
            Query your indexed blockchain data using familiar SQL syntax for 
            powerful analytics and business intelligence.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start text-sm">
              <Search className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Complex SQL queries</span>
            </li>
            <li className="flex items-start text-sm">
              <Database className="h-4 w-4 text-[#5b7def] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#888]">Connect to your BI tools</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

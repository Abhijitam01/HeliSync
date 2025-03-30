import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Sparkles, Cpu } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#5b7def20_0,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#2ce5c920_0,transparent_50%)]"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="w-full md:w-3/5 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6">
            <a
              href="https://github.com/Abhijitam01/HeliSync.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-1.5 rounded-full border border-indigo-500/30 bg-gradient-to-r from-[#0f0f0f]/90 to-[#121212]/90 hover:from-indigo-500/10 hover:to-blue-500/10 transition-all duration-300 backdrop-blur-md text-sm group shadow-sm"
            >
              <svg
                className="w-4 h-4 mr-2 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              <span className="text-gray-300 group-hover:text-indigo-300 transition-colors">Open Source</span>
            </a>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <a 
              href="https://github.com/Abhijitam01/HeliSync.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <span className="bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text group-hover:from-indigo-300 group-hover:to-blue-400 transition-colors">Index Solana data</span>
              <br />
              <span className="text-white group-hover:text-gray-200 transition-colors">into your own database</span>
              <div className="mt-1 h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 rounded-full"></div>
            </a>
          </h1>

          <p className="text-lg md:text-xl text-[#aaa] max-w-2xl mx-auto md:mx-0 mb-8">
            HeliSync makes it easy to index and explore Solana blockchain data using 
            Helius webhooks and Neon Postgres, giving you real-time insights and complete
            control over your data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 px-6 text-white shadow-md shadow-indigo-500/20 font-medium"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/documentation">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-indigo-500/30 bg-[#0f0f0f]/50 hover:bg-indigo-500/5 hover:border-indigo-500/50 px-6 text-white transition-all duration-200"
              >
                Documentation
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <div className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/5 to-blue-500/5 border border-indigo-500/20">
              <Sparkles className="h-4 w-4 mr-2 text-indigo-400" />
              <span className="text-gray-300">Real-time indexing</span>
            </div>
            <div className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
              <Database className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-gray-300">Neon Postgres integration</span>
            </div>
            <div className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/5 to-indigo-500/5 border border-purple-500/20">
              <Cpu className="h-4 w-4 mr-2 text-purple-400" />
              <span className="text-gray-300">Helius webhooks</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/5">
          <div className="bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-indigo-500/20 rounded-xl p-6 shadow-lg relative overflow-hidden">
            {/* Glowing accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            {/* Code snippet */}
            <div className="relative">
              <div className="flex items-center mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm text-[#888] font-mono">webhook_example.ts</div>
              </div>
              
              <div className="text-sm text-[#ddd] overflow-x-auto p-4 bg-black/50 rounded-lg border border-indigo-500/20 font-mono leading-relaxed">
                <div className="text-blue-400">// Configure HeliSync to index NFT bids</div>
                <div>
                  <span className="text-indigo-400">await</span> <span className="text-yellow-400">fetch</span>(<span className="text-green-400">'/api/indexing/preferences'</span>, {"{"}
                </div>
                <div className="pl-2">method: <span className="text-green-400">'POST'</span>,</div>
                <div className="pl-2">headers: {"{"}</div>
                <div className="pl-4"><span className="text-green-400">'Content-Type'</span>: <span className="text-green-400">'application/json'</span>,</div>
                <div className="pl-4"><span className="text-green-400">'Authorization'</span>: <span className="text-yellow-400">`Bearer ${"{"}token{"}"}`</span></div>
                <div className="pl-2">{"}"},</div>
                <div className="pl-2">body: <span className="text-indigo-400">JSON</span>.<span className="text-yellow-400">stringify</span>({"{"}</div>
                <div className="pl-4">nftBids: <span className="text-purple-400">true</span>,</div>
                <div className="pl-4">tokenPrices: <span className="text-purple-400">true</span>,</div>
                <div className="pl-4">borrowableTokens: <span className="text-purple-400">false</span></div>
                <div className="pl-2">{"}"}</div>
                <div>{"}"});</div>
                <div className="mt-4 text-blue-400">// Query your database for insights</div>
                <div><span className="text-indigo-400">const</span> bids = <span className="text-indigo-400">await</span> db.<span className="text-yellow-400">query</span>(<span className="text-green-400">`</span></div>
                <div className="pl-2 text-green-400">SELECT AVG(bid_amount) as avg_bid</div>
                <div className="pl-2 text-green-400">FROM nft_bids</div>
                <div className="pl-2 text-green-400">WHERE timestamp {">"} NOW() - INTERVAL '1 day'</div>
                <div className="pl-2 text-green-400">GROUP BY nft_address</div>
                <div className="pl-2 text-green-400">ORDER BY avg_bid DESC</div>
                <div className="pl-2 text-green-400">LIMIT 10</div>
                <div><span className="text-green-400">`</span>);</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
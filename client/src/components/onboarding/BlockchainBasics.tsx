import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Cpu, 
  BarChart4, 
  Globe, 
  ShieldCheck, 
  Webhook,
  Landmark
} from 'lucide-react';

export default function BlockchainBasics() {
  return (
    <div className="space-y-6">
      <div id="tour-blockchain-basics" className="relative p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
        <div className="flex items-center mb-4">
          <Cpu className="text-[#5b7def] h-6 w-6 mr-3" />
          <h3 className="text-xl font-bold secondary-gradient-text">What is Blockchain?</h3>
        </div>
        <p className="text-[#ddd] mb-4">
          A blockchain is a distributed database or ledger shared among computer network nodes. It stores information in digital format, organized in blocks that are cryptographically linked together.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="bg-[#0f0f0f] border-[#222]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Database className="h-4 w-4 mr-2 text-[#5b7def]" /> Decentralized
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[#aaa]">
              No single entity controls the network, making it resistant to censorship and single points of failure.
            </CardContent>
          </Card>
          <Card className="bg-[#0f0f0f] border-[#222]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-[#5b7def]" /> Immutable
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[#aaa]">
              Once data is recorded, it cannot be altered or deleted without changing all subsequent blocks.
            </CardContent>
          </Card>
          <Card className="bg-[#0f0f0f] border-[#222]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Globe className="h-4 w-4 mr-2 text-[#5b7def]" /> Transparent
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[#aaa]">
              All transactions are visible to anyone with access to the network, providing transparency.
            </CardContent>
          </Card>
        </div>
      </div>

      <div id="tour-solana" className="relative p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
        <div className="flex items-center mb-4">
          <div className="h-6 w-6 mr-3 bg-[#9945FF] rounded-full"></div>
          <h3 className="text-xl font-bold secondary-gradient-text">Solana Blockchain</h3>
        </div>
        <p className="text-[#ddd] mb-4">
          Solana is a high-performance blockchain platform designed for decentralized applications and marketplaces. It's known for its speed, low cost, and energy efficiency.
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[#9945FF]/20 rounded-full flex items-center justify-center text-[#9945FF] mr-3">1</div>
            <div>
              <h4 className="font-medium text-white">Proof of History (PoH)</h4>
              <p className="text-sm text-[#aaa]">A unique time-keeping mechanism that creates a historical record proving that an event occurred at a specific moment in time.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[#9945FF]/20 rounded-full flex items-center justify-center text-[#9945FF] mr-3">2</div>
            <div>
              <h4 className="font-medium text-white">High Transaction Throughput</h4>
              <p className="text-sm text-[#aaa]">Capable of processing thousands of transactions per second, making it one of the fastest blockchains.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[#9945FF]/20 rounded-full flex items-center justify-center text-[#9945FF] mr-3">3</div>
            <div>
              <h4 className="font-medium text-white">Low Transaction Fees</h4>
              <p className="text-sm text-[#aaa]">Transactions on Solana typically cost fractions of a penny, making it accessible for various use cases.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div id="tour-indexing" className="relative p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
        <div className="flex items-center mb-4">
          <BarChart4 className="text-[#5b7def] h-6 w-6 mr-3" />
          <h3 className="text-xl font-bold secondary-gradient-text">Blockchain Indexing</h3>
        </div>
        <p className="text-[#ddd] mb-4">
          Blockchain indexing is the process of organizing and storing blockchain data in a structured format that's optimized for searching, filtering, and analyzing.
        </p>
        <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-4 mb-4">
          <h4 className="font-medium text-white mb-2">Why Indexing Matters</h4>
          <ul className="space-y-2 text-sm text-[#aaa]">
            <li className="flex items-start">
              <span className="text-[#5b7def] mr-2">•</span>
              <span><strong>Speed:</strong> Raw blockchain data is not optimized for quick queries. Indexing makes data retrieval much faster.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#5b7def] mr-2">•</span>
              <span><strong>Filtering:</strong> Enables filtering by specific criteria like token type, transaction amount, or time range.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#5b7def] mr-2">•</span>
              <span><strong>Real-time Updates:</strong> Allows applications to receive and process blockchain data as it's created.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#5b7def] mr-2">•</span>
              <span><strong>Application Development:</strong> Makes building blockchain applications much easier and more efficient.</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div id="tour-helius" className="relative p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
        <div className="flex items-center mb-4">
          <Webhook className="text-[#FC9965] h-6 w-6 mr-3" />
          <h3 className="text-xl font-bold secondary-gradient-text">Helius Webhooks</h3>
        </div>
        <p className="text-[#ddd] mb-4">
          Helius is a Solana infrastructure provider that offers webhooks to notify your application when specific blockchain events occur in real-time.
        </p>
        <div className="bg-gradient-to-r from-[#FC9965]/10 to-[#FF5D5D]/10 border border-[#FC9965]/30 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-white mb-2">How Helius Webhooks Work</h4>
          <ol className="space-y-3 text-sm text-[#ddd]">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FC9965]/20 flex items-center justify-center text-[#FC9965] mr-2">1</div>
              <div>
                <p>You configure a webhook URL in HeliSync that will receive blockchain data</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FC9965]/20 flex items-center justify-center text-[#FC9965] mr-2">2</div>
              <div>
                <p>When specific blockchain events occur (NFT bids, token swaps, etc.), Helius sends data to your webhook</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FC9965]/20 flex items-center justify-center text-[#FC9965] mr-2">3</div>
              <div>
                <p>HeliSync processes this data and stores it in your connected database based on your indexing preferences</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FC9965]/20 flex items-center justify-center text-[#FC9965] mr-2">4</div>
              <div>
                <p>You can query your database directly to access the indexed blockchain data</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      
      <div id="tour-finish" className="relative p-6 bg-[#0a0a0a] border border-[#1a2e6a] rounded-lg">
        <div className="flex items-center mb-4">
          <Landmark className="text-[#5b7def] h-6 w-6 mr-3" />
          <h3 className="text-xl font-bold gradient-text">Ready to Start Indexing?</h3>
        </div>
        <p className="text-[#ddd] mb-4">
          Now that you understand the basics of blockchain and indexing, you're ready to start using HeliSync to index Solana data into your database.
        </p>
        <div className="flex justify-center">
          <Button className="bg-[#5b7def] hover:bg-[#4a6ade]">Continue to Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] rounded-2xl p-12 border border-[#222]">
        <h2 className="text-3xl font-bold mb-6">
          <span className="gradient-text">
            Ready to start indexing blockchain data?
          </span>
        </h2>
        <p className="text-[#aaa] max-w-2xl mx-auto mb-10">
          Join developers already using HeliSync to power their applications with
          real-time Solana blockchain data.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup">
            <Button className="bg-[#2ce5c9] hover:bg-[#25c6ad] text-black font-medium px-6 py-6">
              Get Started Free
            </Button>
          </Link>
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border border-[#333] hover:border-[#555] text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
          >
            View Documentation
          </a>
        </div>
      </div>
    </section>
  );
}

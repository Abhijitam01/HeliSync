export default function DashboardPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 bg-[#0c0c0c]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          <span className="secondary-gradient-text">Sleek Dashboard Interface</span>
        </h2>
        <p className="text-[#aaa] max-w-2xl mx-auto">
          Monitor your blockchain data indexing in real-time with our modern,
          intuitive dashboard.
        </p>
      </div>

      <div className="bg-[#0f0f0f] border border-[#222] rounded-xl overflow-hidden shadow-2xl">
        <div className="border-b border-[#222] p-4 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
            <div className="w-3 h-3 bg-[#febc2e] rounded-full"></div>
            <div className="w-3 h-3 bg-[#28c840] rounded-full"></div>
          </div>
          <div className="ml-4 text-[#aaa] text-sm">HeliSync Dashboard</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
          {/* Sidebar */}
          <div className="bg-[#0a0a0a] border-r border-[#222] p-4">
            <div className="gradient-text text-xl font-bold mb-6">HeliSync</div>

            <nav>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[#5b7def] bg-[#111] rounded-lg px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[#aaa] hover:text-white transition-colors px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[#aaa] hover:text-white transition-colors px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Indexing Options
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[#aaa] hover:text-white transition-colors px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[#aaa] hover:text-white transition-colors px-4 py-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Logs
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-3 p-6">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold">Database Configuration</h3>
              <button className="bg-[#5b7def] hover:bg-[#4a6cde] text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Connection
              </button>
            </div>

            <div className="bg-[#121212] border border-[#222] rounded-lg p-6 mb-8">
              <h4 className="text-lg font-medium mb-4">
                Neon Postgres Credentials
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#aaa] text-sm mb-2">
                    Hostname
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white"
                    placeholder="db.neon.tech"
                  />
                </div>
                <div>
                  <label className="block text-[#aaa] text-sm mb-2">Port</label>
                  <input
                    type="text"
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white"
                    placeholder="5432"
                  />
                </div>
                <div>
                  <label className="block text-[#aaa] text-sm mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block text-[#aaa] text-sm mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#aaa] text-sm mb-2">
                    Database Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white"
                    placeholder="helisync_data"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-[#2ce5c9] hover:bg-[#25c6ad] text-black font-medium px-4 py-2 rounded-lg text-sm transition-colors">
                  Validate Connection
                </button>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#222] rounded-lg p-6">
              <h4 className="text-lg font-medium mb-4">Indexing Preferences</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-[#222] rounded-lg">
                  <div>
                    <h5 className="font-medium">NFT Bids</h5>
                    <p className="text-[#aaa] text-sm">
                      Track bidder, bid amount, NFT identifier, timestamp
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2ce5c9]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 border border-[#222] rounded-lg">
                  <div>
                    <h5 className="font-medium">Token Prices</h5>
                    <p className="text-[#aaa] text-sm">
                      Monitor token identifier, platform, price, timestamp
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2ce5c9]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 border border-[#222] rounded-lg">
                  <div>
                    <h5 className="font-medium">Borrowable Tokens</h5>
                    <p className="text-[#aaa] text-sm">
                      Capture token identifier, available amount, lender details
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#333] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2ce5c9]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

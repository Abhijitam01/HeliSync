# HeliSync - Solana Blockchain Indexing Platform

HeliSync is a powerful web-based platform that allows developers to efficiently explore and analyze Solana blockchain data with advanced visualization and integration capabilities.

## Features

- **User Authentication**: Secure signup and login system with role-based access control
- **Postgres Database Integration**: Connect your own PostgreSQL database for data storage
- **Customizable Data Indexing**: Choose what Solana blockchain data to index
  - NFT bids
  - Token prices
  - Borrowable tokens
  - And more
- **Automated Blockchain Data Retrieval**: Uses Helius webhooks for real-time data
- **Analytics Dashboard**: Visualize and monitor your indexed data
- **Interactive Onboarding**: Learn about blockchain indexing with our guided tour

## Technology Stack

- **Frontend**: React + TypeScript with Vite
- **UI Library**: Tailwind CSS with Shadcn components
- **Backend**: Express.js
- **Database ORM**: Drizzle ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Blockchain Integration**: Helius webhooks
- **Database**: PostgreSQL (user-provided)

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL database (can be hosted on services like Neon, AWS RDS, etc.)
- Helius API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/helisync.git
   cd helisync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@hostname:port/database

   # JWT Secret
   JWT_SECRET=your_jwt_secret_here

   # Helius API
   HELIUS_API_KEY=your_helius_api_key_here
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. Run database migrations:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Visit `http://localhost:5000` in your browser.

## Setting Up Your Database

HeliSync requires you to provide your own PostgreSQL database. Follow these steps to set it up:

1. Create a PostgreSQL database on your preferred hosting provider (e.g., Neon, AWS RDS, DigitalOcean)
2. Note down the following connection details:
   - Hostname
   - Port (typically 5432)
   - Username
   - Password
   - Database name
3. Log in to HeliSync and navigate to Settings
4. Enter your database credentials and click "Validate Connection"
5. Once validated, HeliSync will automatically create the necessary tables

## Configuring Indexing

1. Log in to your HeliSync account
2. Navigate to the "Indexing Options" section
3. Select the Solana blockchain data you want to index:
   - Currently available bids on an NFT
   - Current prices of an NFT
   - Currently available tokens to borrow
   - Current price of a specific token on various platforms
4. Click "Save Preferences"
5. HeliSync will automatically start indexing the selected data into your database

## Helius Webhook Configuration

HeliSync uses Helius webhooks to index Solana blockchain data. The application handles the webhook creation and management automatically, but you need to provide a valid Helius API key.

1. Sign up for a Helius account at [https://helius.xyz](https://helius.xyz)
2. Generate an API key from your Helius dashboard
3. Add your Helius API key to your environment variables
4. HeliSync will automatically create webhooks based on your indexing preferences

## Testing

Run the comprehensive test suite to verify the application's functionality:

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run end-to-end tests only
npm run test:e2e

# Get test coverage
npm run test:coverage
```

## Project Structure

```
helisync/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main App component
│   │   └── main.tsx      # Entry point
│   └── index.html        # HTML template
├── server/               # Backend Express.js server
│   ├── db.ts             # Database connection
│   ├── helius.ts         # Helius API integration
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite server configuration
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema
├── tests/                # Test suite
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── drizzle.config.ts     # Drizzle ORM configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Deployment

The application can be deployed to any platform that supports Node.js applications. Here are some recommended options:

- **Replit**: One-click deployment
- **Vercel**: Great for frontend deployment
- **Heroku**: Excellent for full-stack applications
- **Railway**: Simple deployment process

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Helius](https://helius.xyz) for providing the Solana blockchain webhook infrastructure
- [Solana](https://solana.com) for their incredible blockchain platform
- [Neon](https://neon.tech) for their serverless PostgreSQL database
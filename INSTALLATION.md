# HeliSync Installation Guide

This guide provides step-by-step instructions for setting up and running HeliSync on your local development environment or production server.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **PostgreSQL** (v12.0 or higher) - You can use a hosted solution like Neon
- **Git** (for cloning the repository)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/helisync.git
cd helisync
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@hostname:port/database

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_here

# Helius API Key (for Solana blockchain integration)
HELIUS_API_KEY=your_helius_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Configuration (for Google Authentication)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Firebase Web SDK Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Run Database Migrations

HeliSync uses Drizzle ORM for database migrations. Run the following command to set up your database schema:

```bash
npm run db:push
```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on http://localhost:5000 (or the port you specified in the .env file).

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Set Up Environment Variables for Production

In addition to the variables listed above, add:

```env
NODE_ENV=production
```

### 3. Run Database Migrations

```bash
npm run db:push
```

### 4. Start the Production Server

```bash
npm start
```

## Setting Up a PostgreSQL Database

### Using Neon Serverless PostgreSQL

1. Sign up for a Neon account at [neon.tech](https://neon.tech)
2. Create a new project
3. Create a new database
4. Note the connection string in the following format:
   ```
   postgresql://username:password@hostname:port/database
   ```
5. Add this connection string as the `DATABASE_URL` in your environment variables

### Other PostgreSQL Options

- **ElephantSQL**: Offers a free tier for small projects
- **AWS RDS**: Good for production deployments
- **DigitalOcean Managed Databases**: Simple setup with good performance
- **Local PostgreSQL**: You can install PostgreSQL locally for development

## Setting Up Helius API

HeliSync uses Helius for interacting with the Solana blockchain. Follow these steps to get an API key:

1. Sign up for a Helius account at [helius.xyz](https://helius.xyz)
2. Create a new API key from your dashboard
3. Add this API key as the `HELIUS_API_KEY` in your environment variables

## Setting Up Firebase Authentication

HeliSync uses Firebase for authentication, including Google sign-in. Follow these steps to set it up:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Navigate to Project Settings > Service Accounts
3. Generate a new private key and copy the values for:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
4. Navigate to Project Settings > General
5. Under "Your apps", add a web app by clicking the </> icon
6. Register the app and copy the values for:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
7. Go to Authentication > Sign-in method and enable Email/Password and Google authentication
8. Add your application domain to the authorized domains list:
   - For local development: `localhost`
   - For production: Your actual domain

## Troubleshooting

### Connection Issues with PostgreSQL

If you're having trouble connecting to your PostgreSQL database:

1. Make sure the `DATABASE_URL` environment variable is correctly formatted
2. Check that your database server is running and accessible
3. Verify that your database user has the necessary permissions
4. Ensure your firewall allows connections to the database port

### Authentication Issues

If you're experiencing problems with user authentication:

1. Make sure the `JWT_SECRET` environment variable is set
2. Check that your JWT token is being correctly sent in the Authorization header
3. Verify that your token has not expired

### Firebase Authentication Issues

If you're having trouble with Firebase authentication:

1. Make sure all Firebase-related environment variables are correctly set
2. Verify that the Firebase service account private key is properly formatted (it should include newlines)
3. Check that your application domain is added to the authorized domains in Firebase Console
4. Ensure that the authentication methods you want to use are enabled in Firebase Console
5. Check the browser console for any Firebase-related errors
6. Verify that your Firebase project has the correct API restrictions set (if using Google auth)

### Webhook Integration Issues

If you're having trouble with Helius webhooks:

1. Make sure the `HELIUS_API_KEY` environment variable is set correctly
2. Verify that your server is publicly accessible (webhooks can't reach localhost)
3. Check the webhook logs in your Helius dashboard

## Next Steps

After installation, you should:

1. Create an admin user account
2. Configure your database connection in the application settings
3. Set up your indexing preferences
4. Explore the analytics dashboard to monitor your indexed data

For more information, refer to the [API Reference](./API_REFERENCE.md) and [README](./README.md) documents.
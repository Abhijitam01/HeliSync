# HeliSync API Reference

This document provides detailed information about all the API endpoints available in the HeliSync platform.

## Base URL

```
https://your-helisync-instance.com/api
```

## Authentication

Most API endpoints require authentication. Send your JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

You can obtain a JWT token by logging in via the `/auth/login` endpoint.

## Response Format

All responses are in JSON format. Error responses include a `message` field.

## Error Codes

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid or missing authentication)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Endpoints

### Authentication

#### Register a new user

```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get current user

```
GET /user/profile
```

**Response:**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "role": "user",
  "lastLogin": "2023-05-15T10:30:00Z"
}
```

### Database Credentials

#### Save database credentials

```
POST /database/credentials
```

**Request Body:**
```json
{
  "hostname": "db.example.com",
  "port": "5432",
  "username": "postgres",
  "password": "dbPassword123",
  "databaseName": "helisync_data"
}
```

**Response:**
```json
{
  "id": 1,
  "hostname": "db.example.com",
  "port": "5432",
  "username": "postgres",
  "databaseName": "helisync_data",
  "isValidated": false,
  "createdAt": "2023-05-15T10:30:00Z"
}
```

#### Validate database credentials

```
POST /database/validate
```

**Request Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "success": true,
  "credentials": {
    "id": 1,
    "hostname": "db.example.com",
    "port": "5432",
    "username": "postgres",
    "databaseName": "helisync_data",
    "isValidated": true,
    "createdAt": "2023-05-15T10:30:00Z"
  }
}
```

### Indexing Preferences

#### Save indexing preferences

```
POST /indexing/preferences
```

**Request Body:**
```json
{
  "nftBids": true,
  "tokenPrices": true,
  "borrowableTokens": false
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "nftBids": true,
  "tokenPrices": true,
  "borrowableTokens": false,
  "createdAt": "2023-05-15T10:30:00Z"
}
```

### Webhook Management

#### Get webhook logs

```
GET /webhook/logs?limit=10
```

**Query Parameters:**
- `limit` (optional): Number of logs to return (default: 100)

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "message": "Received 25 new NFT bid events",
    "type": "info",
    "timestamp": "2023-05-15T10:30:00Z"
  },
  {
    "id": 2,
    "userId": 1,
    "message": "Successfully indexed 25 new NFT bid events",
    "type": "success",
    "timestamp": "2023-05-15T10:31:00Z"
  }
]
```

#### Register a new webhook

```
POST /webhook/register
```

**Request Body:**
```json
{
  "webhookUrl": "https://your-app.com/webhook"
}
```

**Response:**
```json
{
  "success": true,
  "webhookId": "abc123"
}
```

#### Delete a webhook

```
DELETE /webhook/:webhookId
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook deleted successfully"
}
```

### Webhook Event Processing

#### Process webhook events (called by Helius)

```
POST /webhook/:userId
```

**Request Body (sent by Helius):**
```json
{
  "accountData": [...],
  "events": [...],
  "slot": 12345,
  "blockTime": 1683883200
}
```

**Response:**
```json
{
  "success": true
}
```

### Analytics

#### Get Analytics Summary Data

```
GET /analytics/summary
```

**Response:**
```json
{
  "nftBids": {
    "total": 1458,
    "change": 12,
    "platforms": {
      "magicEden": 45,
      "tensor": 30,
      "hadeswap": 15,
      "other": 10
    }
  },
  "tokenPrices": {
    "total": 3275,
    "change": 8,
    "tokens": {
      "SOL": 115.80,
      "BONK": 0.00030,
      "JTO": 2.50,
      "PYTH": 0.55
    }
  },
  "lendingEvents": {
    "total": 895,
    "change": 5,
    "platforms": {
      "solend": 50,
      "mango": 42,
      "drift": 26
    }
  },
  "indexingStatus": {
    "recordsIndexed": 5628,
    "dbSize": "1.2 GB",
    "avgResponseTime": "95 ms",
    "webhookSuccessRate": "99.8%"
  }
}
```

#### Get Historical Chart Data

```
GET /analytics/historical-data?metric=nft-bids&timeframe=7d
```

**Query Parameters:**
- `metric`: Type of data to retrieve (options: `nft-bids`, `token-prices`, `lending`)
- `timeframe`: Time period (options: `24h`, `7d`, `30d`, `90d`)

**Response:**
```json
[
  {
    "date": "2023-05-15",
    "magicEden": 45,
    "tensor": 30,
    "other": 10
  },
  {
    "date": "2023-05-14",
    "magicEden": 50,
    "tensor": 25,
    "other": 12
  },
  ...
]
```

## Using the API with cURL

### Authentication

```bash
# Register a new user
curl -X POST https://your-helisync-instance.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"securePassword123"}'

# Login
curl -X POST https://your-helisync-instance.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"securePassword123"}'
```

### Database Configuration

```bash
# Save database credentials
curl -X POST https://your-helisync-instance.com/api/database/credentials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"hostname":"db.example.com","port":"5432","username":"postgres","password":"dbPassword123","databaseName":"helisync_data"}'

# Validate database credentials
curl -X POST https://your-helisync-instance.com/api/database/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"id":1}'
```

### Indexing Configuration

```bash
# Save indexing preferences
curl -X POST https://your-helisync-instance.com/api/indexing/preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"nftBids":true,"tokenPrices":true,"borrowableTokens":false}'
```

### Analytics

```bash
# Get analytics summary
curl -X GET https://your-helisync-instance.com/api/analytics/summary \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get historical data for NFT bids over the last 7 days
curl -X GET https://your-helisync-instance.com/api/analytics/historical-data?metric=nft-bids&timeframe=7d \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get historical data for token prices over the last 30 days
curl -X GET https://your-helisync-instance.com/api/analytics/historical-data?metric=token-prices&timeframe=30d \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Using the API with JavaScript

```javascript
// Authentication
async function register(username, email, password) {
  const response = await fetch('https://your-helisync-instance.com/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return await response.json();
}

async function login(username, password) {
  const response = await fetch('https://your-helisync-instance.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
}

// Database Configuration
async function saveDbCredentials(token, credentials) {
  const response = await fetch('https://your-helisync-instance.com/api/database/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(credentials),
  });
  return await response.json();
}

// Indexing Configuration
async function saveIndexingPreferences(token, preferences) {
  const response = await fetch('https://your-helisync-instance.com/api/indexing/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(preferences),
  });
  return await response.json();
}

// Analytics
async function getAnalyticsSummary(token) {
  const response = await fetch('https://your-helisync-instance.com/api/analytics/summary', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function getHistoricalData(token, metric, timeframe) {
  const response = await fetch(
    `https://your-helisync-instance.com/api/analytics/historical-data?metric=${metric}&timeframe=${timeframe}`, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
```

## Rate Limiting

The API is rate-limited to prevent abuse. The rate limits are as follows:

- Authentication endpoints: 10 requests per minute
- Other endpoints: 60 requests per minute

When a rate limit is exceeded, you'll receive a `429 Too Many Requests` response.
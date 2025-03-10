# Twitter Post Data Extractor - Setup Guide

## Overview

This application extracts data from Twitter/X posts using the official X Developer API. Due to CORS restrictions, the application requires a proxy server to make API calls to Twitter.

## Setup Instructions

### 1. Set Up X Developer API Credentials

1. Go to the [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a project and app
3. Navigate to the "Keys and Tokens" tab
4. Generate or copy your Bearer Token

### 2. Set Up the Proxy Server

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file:
   ```
   cp .env.example .env
   ```

4. Add your X Developer API Bearer Token to the `.env` file:
   ```
   X_BEARER_TOKEN=your_bearer_token_here
   ```

5. Start the proxy server:
   ```
   npm run dev
   ```

### 3. Configure the Frontend

1. In the root directory, make sure your `.env` file has the correct proxy URL:
   ```
   VITE_API_PROXY_URL=http://localhost:3001/api
   ```

2. Start the frontend application:
   ```
   npm run dev
   ```

## Troubleshooting

### Proxy Server Connection Issues

If you see an error like "Cannot connect to proxy server", make sure:

1. The proxy server is running
2. The `VITE_API_PROXY_URL` in your frontend `.env` file matches the URL where your proxy server is running

### API Authentication Issues

If you see "Unauthorized" errors:

1. Check that your Bearer Token is correctly set in the proxy server's `.env` file
2. Verify that your X Developer API credentials are valid and have the necessary permissions

### Using Test Mode

If you're having issues with the API or just want to test the application without making real API calls:

1. Toggle on "Test Mode" in the application interface
2. The application will use realistic mock data instead of making actual API calls

## Alternative Deployment Options

### Serverless Functions

Instead of running a separate proxy server, you can deploy the proxy as a serverless function:

- **Vercel**: Create an API route in the `/api` directory
- **Netlify**: Create a function in the `netlify/functions` directory
- **AWS Lambda**: Deploy the proxy code as a Lambda function behind API Gateway

This approach simplifies deployment as both frontend and backend can be deployed together.

### CORS Proxy Services

For development or testing, you can use public CORS proxy services like:

- [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)
- [AllOrigins](https://allorigins.win/)

Note: These services often have rate limits and should not be used in production.

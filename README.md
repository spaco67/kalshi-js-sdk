# Kalshi JavaScript SDK

A production-grade, beginner-friendly JavaScript/TypeScript SDK for the [Kalshi](https://kalshi.com) trading platform. This SDK provides a simple and intuitive interface for interacting with Kalshi's prediction markets API.

## Features

- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Universal**: Works in both Node.js and browser environments
- **Easy to Use**: Simple, intuitive API designed for developers of all skill levels
- **Production Ready**: Robust error handling, authentication, and request management
- **Comprehensive**: Full coverage of Kalshi's trading API functionality
- **Well Documented**: Extensive documentation and examples

## Installation

Install the SDK using npm, yarn, or pnpm:

```bash
# Using npm
npm install kalshi-js-sdk

# Using yarn
yarn add kalshi-js-sdk

# Using pnpm
pnpm add kalshi-js-sdk
```

## Quick Start

### 1. Get Your API Credentials

First, you'll need to get your API credentials from Kalshi:

1. Log in to your Kalshi account
2. Go to [Account Settings](https://kalshi.com/account/profile)
3. Navigate to the "API Keys" section
4. Click "Create New API Key"
5. Save your API Key ID and download the private key file

### 2. Initialize the Client

```typescript
import { KalshiClient } from 'kalshi-js-sdk';

// Initialize the client
const client = new KalshiClient({
  apiKeyId: 'your-api-key-id',
  privateKey: 'your-private-key-string',
  environment: 'demo' // Use 'production' for live trading
});

// Test the connection
const isConnected = await client.testConnection();
if (isConnected) {
  console.log('Successfully connected to Kalshi!');
} else {
  console.log('Failed to connect. Please check your credentials.');
}
```

### 3. Explore Markets

```typescript
// Get all open markets
const markets = await client.markets.getMarkets({ status: 'open' });
console.log(`Found ${markets.length} open markets`);

// Search for specific markets
const electionMarkets = await client.markets.searchMarkets('election');
electionMarkets.slice(0, 5).forEach(market => {
  console.log(`${market.ticker}: ${market.title}`);
});

// Get detailed market information
const market = await client.markets.getMarketByTicker('EXAMPLE-24-T1');
console.log(`Market: ${market.title}`);
console.log(`Yes Price: ${market.yesPrice}¢`);
console.log(`No Price: ${market.noPrice}¢`);
```

### 4. Check Your Portfolio

```typescript
// Get account balance
const balance = await client.portfolio.getBalance();
console.log(`Available Balance: $${balance.availableBalanceDollars.toFixed(2)}`);

// Get current positions
const positions = await client.portfolio.getPositions();
positions.forEach(position => {
  console.log(`${position.ticker}: ${position.position} contracts`);
  console.log(`  Unrealized P&L: $${(position.unrealizedPnl / 100).toFixed(2)}`);
});
```

### 5. Place Orders

```typescript
import { OrderParams } from 'kalshi-js-sdk';

// Place a buy order
try {
  const orderParams: OrderParams = {
    ticker: 'EXAMPLE-24-T1',
    side: 'yes',
    action: 'buy',
    count: 10,
    price: 0.55
  };

  const order = await client.trading.placeOrder(orderParams);
  console.log(`Order placed successfully! Order ID: ${order.orderId}`);
} catch (error) {
  console.error(`Failed to place order: ${error.message}`);
}

// Check order status
const orders = await client.trading.getOrders({ status: 'pending' });
orders.forEach(order => {
  console.log(`Order ${order.orderId}: ${order.status}`);
});
```

## TypeScript Support

The SDK is built with TypeScript and provides comprehensive type definitions:

```typescript
import { 
  KalshiClient, 
  Market, 
  Order, 
  Position, 
  Balance,
  MarketFilters,
  OrderParams,
  ClientConfig
} from 'kalshi-js-sdk';

// Type-safe configuration
const config: ClientConfig = {
  apiKeyId: process.env.KALSHI_API_KEY_ID!,
  privateKey: process.env.KALSHI_PRIVATE_KEY!,
  environment: 'demo'
};

const client = new KalshiClient(config);

// Type-safe market filtering
const filters: MarketFilters = {
  status: 'open',
  category: 'politics',
  limit: 20
};

const markets: Market[] = await client.markets.getMarkets(filters);
```

## Error Handling

The SDK provides specific exception types for different error scenarios:

```typescript
import { 
  AuthenticationError,
  APIError,
  RateLimitError,
  ValidationError,
  NetworkError
} from 'kalshi-js-sdk';

try {
  const markets = await client.markets.getMarkets();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Authentication failed. Check your API credentials.');
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded. Please wait before making more requests.');
  } else if (error instanceof APIError) {
    console.error(`API error: ${error.message} (Status: ${error.statusCode})`);
  } else if (error instanceof NetworkError) {
    console.error('Network error. Check your internet connection.');
  } else if (error instanceof ValidationError) {
    console.error(`Validation error: ${error.message}`);
  } else {
    console.error(`Unexpected error: ${error.message}`);
  }
}
```

## Environment Configuration

The SDK supports both demo and production environments:

```typescript
// Demo environment (for testing)
const demoClient = new KalshiClient({
  apiKeyId: 'your-demo-key',
  privateKey: 'your-demo-private-key',
  environment: 'demo'
});

// Production environment (for live trading)
const prodClient = new KalshiClient({
  apiKeyId: 'your-prod-key',
  privateKey: 'your-prod-private-key',
  environment: 'production'
});
```

## Browser Usage

The SDK works in browser environments with proper bundling:

```typescript
// In a React component
import { KalshiClient } from 'kalshi-js-sdk';
import { useEffect, useState } from 'react';

function MarketList() {
  const [markets, setMarkets] = useState([]);
  
  useEffect(() => {
    const client = new KalshiClient({
      apiKeyId: process.env.REACT_APP_KALSHI_API_KEY_ID!,
      privateKey: process.env.REACT_APP_KALSHI_PRIVATE_KEY!,
      environment: 'demo'
    });
    
    client.markets.getMarkets({ status: 'open', limit: 10 })
      .then(setMarkets)
      .catch(console.error);
  }, []);
  
  return (
    <div>
      {markets.map(market => (
        <div key={market.ticker}>
          <h3>{market.title}</h3>
          <p>Yes: {market.yesPrice}¢ | No: {market.noPrice}¢</p>
        </div>
      ))}
    </div>
  );
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [Full API Documentation](https://github.com/timdake4/kalshi-js-sdk/tree/main/docs) (Generated with TypeDoc)
- **Issues**: [GitHub Issues](https://github.com/timdake4/kalshi-js-sdk/issues)
- **Kalshi API Docs**: [Official API Documentation](https://trading-api.readme.io/)

## Disclaimer

This SDK is not officially affiliated with Kalshi. Use at your own risk. Always test thoroughly in the demo environment before using in production.

---

**Author**: Timothy John Dake (timdake4@gmail.com)  
**Version**: 1.0.0


/**
 * Kalshi JavaScript SDK
 * 
 * A production-grade, beginner-friendly JavaScript SDK for the Kalshi trading platform.
 * 
 * @author Timothy John Dake <timdake4@gmail.com>
 * @version 1.0.0
 */

export { KalshiClient } from './client';
export { Market } from './models/Market';
export { Order } from './models/Order';
export { Position } from './models/Position';
export { Balance } from './models/Balance';
export { 
  KalshiError, 
  AuthenticationError, 
  APIError, 
  ValidationError, 
  RateLimitError, 
  NetworkError 
} from './exceptions';

// Export types
export type {
  MarketData,
  OrderData,
  PositionData,
  BalanceData,
  OrderParams,
  ClientConfig
} from './types';

// Export services for advanced usage
export { MarketService } from './services/MarketService';
export { TradeService } from './services/TradeService';
export { PortfolioService } from './services/PortfolioService';


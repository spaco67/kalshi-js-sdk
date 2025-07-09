/**
 * Type definitions for the Kalshi JavaScript SDK.
 */

export interface ClientConfig {
  apiKeyId: string;
  privateKey: string;
  environment?: 'production' | 'demo';
  timeout?: number;
}

export interface MarketData {
  ticker: string;
  title: string;
  subtitle?: string;
  status: string;
  yes_price?: number;
  no_price?: number;
  volume: number;
  open_interest: number;
  close_time?: string;
  settle_time?: string;
  category: string;
  tags: string[];
  [key: string]: any;
}

export interface OrderData {
  order_id: string;
  client_order_id: string;
  ticker: string;
  side: 'yes' | 'no';
  action: 'buy' | 'sell';
  type: 'limit' | 'market';
  status: string;
  count: number;
  price?: number;
  filled_count: number;
  remaining_count: number;
  created_time?: string;
  updated_time?: string;
  [key: string]: any;
}

export interface PositionData {
  ticker: string;
  side: 'yes' | 'no';
  position: number;
  market_value: number;
  total_cost: number;
  unrealized_pnl: number;
  realized_pnl: number;
  [key: string]: any;
}

export interface BalanceData {
  balance: number;
  payout: number;
  fees: number;
  available_balance: number;
  pending_balance: number;
  [key: string]: any;
}

export interface OrderParams {
  ticker: string;
  side: 'yes' | 'no';
  action: 'buy' | 'sell';
  count: number;
  type?: 'limit' | 'market';
  price?: number;
  client_order_id?: string;
}

export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  status_code?: number;
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
}

export interface MarketFilters extends PaginationParams {
  status?: string;
  ticker?: string;
  category?: string;
}

export interface OrderFilters extends PaginationParams {
  status?: string;
  ticker?: string;
}

export interface PositionFilters extends PaginationParams {
  ticker?: string;
  settlement_status?: string;
}

export interface TradeHistoryFilters extends PaginationParams {
  ticker?: string;
}


/**
 * Helper utilities for the Kalshi JavaScript SDK.
 */

import { ValidationError } from '../exceptions';
import { OrderParams } from '../types';

/**
 * Validate and normalize a market ticker.
 */
export function validateTicker(ticker: string): string {
  if (!ticker || typeof ticker !== 'string') {
    throw new ValidationError('Ticker must be a non-empty string');
  }
  
  const normalizedTicker = ticker.trim().toUpperCase();
  
  // Basic ticker format validation
  if (!/^[A-Z0-9\-]+$/.test(normalizedTicker)) {
    throw new ValidationError(`Invalid ticker format: ${ticker}`);
  }
  
  return normalizedTicker;
}

/**
 * Format a price value for API requests.
 */
export function formatPrice(price: number): number {
  if (price == null) {
    throw new ValidationError('Price cannot be null or undefined');
  }
  
  if (typeof price !== 'number' || isNaN(price)) {
    throw new ValidationError(`Invalid price format: ${price}`);
  }
  
  // If price is less than 1, assume it's in dollars and convert to cents
  let priceCents: number;
  if (price > 0 && price < 1) {
    priceCents = Math.round(price * 100);
  } else {
    priceCents = Math.round(price);
  }
  
  if (priceCents < 0 || priceCents > 100) {
    throw new ValidationError(`Price must be between 0 and 100 cents: ${priceCents}`);
  }
  
  return priceCents;
}

/**
 * Parse a timestamp string from the API.
 */
export function parseTimestamp(timestamp?: string): Date | undefined {
  if (!timestamp) return undefined;
  
  try {
    // Handle different timestamp formats
    const normalizedTimestamp = timestamp.replace('Z', '+00:00');
    return new Date(normalizedTimestamp);
  } catch {
    return undefined;
  }
}

/**
 * Validate and format order parameters.
 */
export function validateOrderParams(params: OrderParams): Required<OrderParams> {
  const {
    ticker,
    side,
    action,
    count,
    type = 'limit',
    price,
    client_order_id = generateClientOrderId(),
  } = params;
  
  // Validate ticker
  const validatedTicker = validateTicker(ticker);
  
  // Validate side
  if (!['yes', 'no'].includes(side)) {
    throw new ValidationError(`Side must be 'yes' or 'no', got: ${side}`);
  }
  
  // Validate action
  if (!['buy', 'sell'].includes(action)) {
    throw new ValidationError(`Action must be 'buy' or 'sell', got: ${action}`);
  }
  
  // Validate count
  if (!Number.isInteger(count) || count <= 0) {
    throw new ValidationError(`Count must be a positive integer, got: ${count}`);
  }
  
  // Validate order type
  if (!['limit', 'market'].includes(type)) {
    throw new ValidationError(`Order type must be 'limit' or 'market', got: ${type}`);
  }
  
  // Validate price for limit orders
  let validatedPrice: number | undefined;
  if (type === 'limit') {
    if (price == null) {
      throw new ValidationError('Price is required for limit orders');
    }
    validatedPrice = formatPrice(price);
  }
  
  return {
    ticker: validatedTicker,
    side,
    action,
    count,
    type,
    price: validatedPrice!,
    client_order_id,
  };
}

/**
 * Generate a unique client order ID.
 */
export function generateClientOrderId(): string {
  return 'sdk-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Sleep for a specified number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await sleep(delay);
    }
  }
  
  throw lastError!;
}

/**
 * Convert cents to dollars.
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Convert dollars to cents.
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Format a number as currency.
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Calculate percentage change.
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}


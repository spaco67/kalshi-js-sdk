/**
 * Market service for the Kalshi JavaScript SDK.
 */

import { BaseService } from './BaseService';
import { Market } from '../models/Market';
import { MarketData, MarketFilters } from '../types';
import { validateTicker } from '../utils/helpers';

export class MarketService extends BaseService {
  /**
   * Get a list of markets.
   */
  async getMarkets(filters: MarketFilters = {}): Promise<Market[]> {
    const {
      status,
      ticker,
      category,
      limit = 100,
      cursor,
    } = filters;

    const params: Record<string, any> = { limit };
    
    if (status) params.status = status;
    if (ticker) params.ticker = validateTicker(ticker);
    if (category) params.category = category;
    if (cursor) params.cursor = cursor;

    const response = await this.get<{ markets: MarketData[] }>('/trade-api/v2/markets', params);
    
    return response.markets.map(marketData => new Market(marketData));
  }

  /**
   * Get a specific market by ticker.
   */
  async getMarketByTicker(ticker: string): Promise<Market> {
    const validatedTicker = validateTicker(ticker);
    const response = await this.get<{ market: MarketData }>(`/trade-api/v2/markets/${validatedTicker}`);
    
    return new Market(response.market);
  }

  /**
   * Get the order book for a market.
   */
  async getOrderBook(ticker: string, depth: number = 10): Promise<any> {
    const validatedTicker = validateTicker(ticker);
    const params = { depth };
    
    const response = await this.get<{ orderbook: any }>(
      `/trade-api/v2/markets/${validatedTicker}/orderbook`,
      params
    );
    
    return response.orderbook;
  }

  /**
   * Get historical data for a market.
   */
  async getMarketHistory(ticker: string, limit: number = 100, cursor?: string): Promise<any> {
    const validatedTicker = validateTicker(ticker);
    const params: Record<string, any> = { limit };
    
    if (cursor) params.cursor = cursor;
    
    const response = await this.get<{ history: any }>(
      `/trade-api/v2/markets/${validatedTicker}/history`,
      params
    );
    
    return response.history;
  }

  /**
   * Search for markets by query string.
   */
  async searchMarkets(query: string, limit: number = 50): Promise<Market[]> {
    const params = { query, limit };
    
    const response = await this.get<{ markets: MarketData[] }>('/trade-api/v2/markets/search', params);
    
    return response.markets.map(marketData => new Market(marketData));
  }

  /**
   * Get all available market categories.
   */
  async getMarketCategories(): Promise<string[]> {
    const response = await this.get<{ categories: string[] }>('/trade-api/v2/markets/categories');
    
    return response.categories;
  }

  /**
   * Get trending markets.
   */
  async getTrendingMarkets(limit: number = 20): Promise<Market[]> {
    const params = { limit };
    
    const response = await this.get<{ markets: MarketData[] }>('/trade-api/v2/markets/trending', params);
    
    return response.markets.map(marketData => new Market(marketData));
  }

  /**
   * Get markets by category.
   */
  async getMarketsByCategory(category: string, limit: number = 100): Promise<Market[]> {
    return this.getMarkets({ category, limit });
  }

  /**
   * Get open markets.
   */
  async getOpenMarkets(limit: number = 100): Promise<Market[]> {
    return this.getMarkets({ status: 'open', limit });
  }

  /**
   * Get closed markets.
   */
  async getClosedMarkets(limit: number = 100): Promise<Market[]> {
    return this.getMarkets({ status: 'closed', limit });
  }

  /**
   * Get settled markets.
   */
  async getSettledMarkets(limit: number = 100): Promise<Market[]> {
    return this.getMarkets({ status: 'settled', limit });
  }
}


/**
 * Portfolio service for the Kalshi JavaScript SDK.
 */

import { BaseService } from './BaseService';
import { Balance } from '../models/Balance';
import { Position } from '../models/Position';
import { BalanceData, PositionData, PositionFilters, TradeHistoryFilters } from '../types';

export class PortfolioService extends BaseService {
  /**
   * Get account balance.
   */
  async getBalance(): Promise<Balance> {
    const response = await this.get<{ balance: BalanceData }>('/trade-api/v2/portfolio/balance');
    
    return new Balance(response.balance);
  }

  /**
   * Get current positions.
   */
  async getPositions(filters: PositionFilters = {}): Promise<Position[]> {
    const response = await this.get<{ positions: PositionData[] }>('/trade-api/v2/portfolio/positions', filters);
    
    return response.positions.map(positionData => new Position(positionData));
  }

  /**
   * Get a specific position by ticker.
   */
  async getPositionByTicker(ticker: string): Promise<Position | null> {
    try {
      const response = await this.get<{ position: PositionData }>(`/trade-api/v2/portfolio/positions/${ticker}`);
      return new Position(response.position);
    } catch (error: any) {
      if (error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get trade history.
   */
  async getTradeHistory(filters: TradeHistoryFilters = {}): Promise<any[]> {
    const response = await this.get<{ trades: any[] }>('/trade-api/v2/portfolio/trades', filters);
    
    return response.trades;
  }

  /**
   * Get portfolio summary.
   */
  async getPortfolioSummary(): Promise<any> {
    const response = await this.get<any>('/trade-api/v2/portfolio/summary');
    
    return response;
  }

  /**
   * Get profit and loss summary.
   */
  async getPnlSummary(startDate?: string, endDate?: string): Promise<any> {
    const params: Record<string, any> = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    
    const response = await this.get<any>('/trade-api/v2/portfolio/pnl', params);
    
    return response;
  }

  /**
   * Get settlement history.
   */
  async getSettlements(filters: PositionFilters = {}): Promise<any[]> {
    const response = await this.get<{ settlements: any[] }>('/trade-api/v2/portfolio/settlements', filters);
    
    return response.settlements;
  }

  /**
   * Get portfolio performance metrics.
   */
  async getPortfolioPerformance(period: string = '30d'): Promise<any> {
    const response = await this.get<any>('/trade-api/v2/portfolio/performance', { period });
    
    return response;
  }

  /**
   * Export portfolio data.
   */
  async exportPortfolioData(format: string = 'csv', startDate?: string, endDate?: string): Promise<any> {
    const params: Record<string, any> = { format };
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    
    const response = await this.get<any>('/trade-api/v2/portfolio/export', params);
    
    return response;
  }
}


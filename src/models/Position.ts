/**
 * Position data model for the Kalshi JavaScript SDK.
 */

import { PositionData } from '../types';

export class Position {
  public readonly ticker: string;
  public readonly side: 'yes' | 'no';
  public readonly position: number;
  public readonly marketValue: number;
  public readonly totalCost: number;
  public readonly unrealizedPnl: number;
  public readonly realizedPnl: number;
  private readonly _rawData: PositionData;

  constructor(data: PositionData) {
    this.ticker = data.ticker || '';
    this.side = data.side || 'yes';
    this.position = data.position || 0;
    this.marketValue = data.market_value || 0;
    this.totalCost = data.total_cost || 0;
    this.unrealizedPnl = data.unrealized_pnl || 0;
    this.realizedPnl = data.realized_pnl || 0;
    
    // Store raw data for access to additional fields
    this._rawData = data;
  }

  /**
   * Calculate the average cost per contract.
   */
  get averageCost(): number {
    if (this.position === 0) return 0;
    return this.totalCost / Math.abs(this.position);
  }

  /**
   * Check if this is a long position.
   */
  get isLong(): boolean {
    return this.position > 0;
  }

  /**
   * Check if this is a short position.
   */
  get isShort(): boolean {
    return this.position < 0;
  }

  /**
   * Check if the position is currently profitable.
   */
  get isProfitable(): boolean {
    return this.unrealizedPnl > 0;
  }

  /**
   * Get the total profit/loss (realized + unrealized).
   */
  get totalPnl(): number {
    return this.realizedPnl + this.unrealizedPnl;
  }

  /**
   * Get the return percentage based on total cost.
   */
  get returnPercentage(): number {
    if (this.totalCost === 0) return 0;
    return (this.unrealizedPnl / this.totalCost) * 100;
  }

  /**
   * Get the raw data from the API response.
   */
  get rawData(): PositionData {
    return this._rawData;
  }

  /**
   * Convert the Position instance to a plain object.
   */
  toJSON(): Record<string, any> {
    return {
      ticker: this.ticker,
      side: this.side,
      position: this.position,
      marketValue: this.marketValue,
      totalCost: this.totalCost,
      unrealizedPnl: this.unrealizedPnl,
      realizedPnl: this.realizedPnl,
      averageCost: this.averageCost,
      isLong: this.isLong,
      isShort: this.isShort,
      isProfitable: this.isProfitable,
      totalPnl: this.totalPnl,
      returnPercentage: this.returnPercentage,
    };
  }

  /**
   * String representation of the position.
   */
  toString(): string {
    const pnlStr = this.unrealizedPnl >= 0 
      ? `$${this.unrealizedPnl.toFixed(2)}` 
      : `-$${Math.abs(this.unrealizedPnl).toFixed(2)}`;
    return `${this.ticker} ${this.side}: ${this.position} contracts, PnL: ${pnlStr}`;
  }
}


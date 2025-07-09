/**
 * Market data model for the Kalshi JavaScript SDK.
 */

import { MarketData } from '../types';

export class Market {
  public readonly ticker: string;
  public readonly title: string;
  public readonly subtitle: string;
  public readonly status: string;
  public readonly yesPrice?: number;
  public readonly noPrice?: number;
  public readonly volume: number;
  public readonly openInterest: number;
  public readonly closeTime?: Date;
  public readonly settleTime?: Date;
  public readonly category: string;
  public readonly tags: string[];
  private readonly _rawData: MarketData;

  constructor(data: MarketData) {
    this.ticker = data.ticker || '';
    this.title = data.title || '';
    this.subtitle = data.subtitle || '';
    this.status = data.status || '';
    this.yesPrice = data.yes_price;
    this.noPrice = data.no_price;
    this.volume = data.volume || 0;
    this.openInterest = data.open_interest || 0;
    this.category = data.category || '';
    this.tags = data.tags || [];
    
    // Parse datetime fields
    this.closeTime = this.parseDateTime(data.close_time);
    this.settleTime = this.parseDateTime(data.settle_time);
    
    // Store raw data for access to additional fields
    this._rawData = data;
  }

  private parseDateTime(dateString?: string): Date | undefined {
    if (!dateString) return undefined;
    
    try {
      // Handle ISO format with Z suffix
      const normalizedDate = dateString.replace('Z', '+00:00');
      return new Date(normalizedDate);
    } catch {
      return undefined;
    }
  }

  /**
   * Check if the market is currently open for trading.
   */
  get isOpen(): boolean {
    return this.status === 'open';
  }

  /**
   * Check if the market has been settled.
   */
  get isSettled(): boolean {
    return this.status === 'settled';
  }

  /**
   * Calculate the bid-ask spread.
   */
  get spread(): number | undefined {
    if (this.yesPrice !== undefined && this.noPrice !== undefined) {
      return Math.abs(this.yesPrice - this.noPrice);
    }
    return undefined;
  }

  /**
   * Get the raw data from the API response.
   */
  get rawData(): MarketData {
    return this._rawData;
  }

  /**
   * Convert the Market instance to a plain object.
   */
  toJSON(): Record<string, any> {
    return {
      ticker: this.ticker,
      title: this.title,
      subtitle: this.subtitle,
      status: this.status,
      yesPrice: this.yesPrice,
      noPrice: this.noPrice,
      volume: this.volume,
      openInterest: this.openInterest,
      closeTime: this.closeTime?.toISOString(),
      settleTime: this.settleTime?.toISOString(),
      category: this.category,
      tags: this.tags,
      isOpen: this.isOpen,
      isSettled: this.isSettled,
      spread: this.spread,
    };
  }

  /**
   * String representation of the market.
   */
  toString(): string {
    return `${this.ticker}: ${this.title} (Status: ${this.status})`;
  }
}


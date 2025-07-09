/**
 * Order data model for the Kalshi JavaScript SDK.
 */

import { OrderData } from '../types';

export class Order {
  public readonly orderId: string;
  public readonly clientOrderId: string;
  public readonly ticker: string;
  public readonly side: 'yes' | 'no';
  public readonly action: 'buy' | 'sell';
  public readonly type: 'limit' | 'market';
  public readonly status: string;
  public readonly count: number;
  public readonly price?: number;
  public readonly filledCount: number;
  public readonly remainingCount: number;
  public readonly createdTime?: Date;
  public readonly updatedTime?: Date;
  private readonly _rawData: OrderData;

  constructor(data: OrderData) {
    this.orderId = data.order_id || '';
    this.clientOrderId = data.client_order_id || '';
    this.ticker = data.ticker || '';
    this.side = data.side || 'yes';
    this.action = data.action || 'buy';
    this.type = data.type || 'limit';
    this.status = data.status || '';
    this.count = data.count || 0;
    this.price = data.price;
    this.filledCount = data.filled_count || 0;
    this.remainingCount = data.remaining_count || 0;
    
    // Parse datetime fields
    this.createdTime = this.parseDateTime(data.created_time);
    this.updatedTime = this.parseDateTime(data.updated_time);
    
    // Store raw data for access to additional fields
    this._rawData = data;
  }

  private parseDateTime(dateString?: string): Date | undefined {
    if (!dateString) return undefined;
    
    try {
      const normalizedDate = dateString.replace('Z', '+00:00');
      return new Date(normalizedDate);
    } catch {
      return undefined;
    }
  }

  /**
   * Check if the order is completely filled.
   */
  get isFilled(): boolean {
    return this.status === 'filled';
  }

  /**
   * Check if the order is pending.
   */
  get isPending(): boolean {
    return this.status === 'pending';
  }

  /**
   * Check if the order is canceled.
   */
  get isCanceled(): boolean {
    return this.status === 'canceled';
  }

  /**
   * Check if the order is partially filled.
   */
  get isPartiallyFilled(): boolean {
    return this.filledCount > 0 && this.remainingCount > 0;
  }

  /**
   * Calculate the fill percentage.
   */
  get fillPercentage(): number {
    if (this.count === 0) return 0;
    return (this.filledCount / this.count) * 100;
  }

  /**
   * Get the raw data from the API response.
   */
  get rawData(): OrderData {
    return this._rawData;
  }

  /**
   * Convert the Order instance to a plain object.
   */
  toJSON(): Record<string, any> {
    return {
      orderId: this.orderId,
      clientOrderId: this.clientOrderId,
      ticker: this.ticker,
      side: this.side,
      action: this.action,
      type: this.type,
      status: this.status,
      count: this.count,
      price: this.price,
      filledCount: this.filledCount,
      remainingCount: this.remainingCount,
      createdTime: this.createdTime?.toISOString(),
      updatedTime: this.updatedTime?.toISOString(),
      isFilled: this.isFilled,
      isPending: this.isPending,
      isCanceled: this.isCanceled,
      isPartiallyFilled: this.isPartiallyFilled,
      fillPercentage: this.fillPercentage,
    };
  }

  /**
   * String representation of the order.
   */
  toString(): string {
    return `${this.orderId}: ${this.action} ${this.count} ${this.ticker} @ ${this.price}¢ (${this.status})`;
  }
}


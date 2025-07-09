/**
 * Balance data model for the Kalshi JavaScript SDK.
 */

import { BalanceData } from '../types';

export class Balance {
  public readonly balance: number;
  public readonly payout: number;
  public readonly fees: number;
  public readonly availableBalance: number;
  public readonly pendingBalance: number;
  private readonly _rawData: BalanceData;

  constructor(data: BalanceData) {
    this.balance = data.balance || 0;
    this.payout = data.payout || 0;
    this.fees = data.fees || 0;
    this.availableBalance = data.available_balance || 0;
    this.pendingBalance = data.pending_balance || 0;
    
    // Store raw data for access to additional fields
    this._rawData = data;
  }

  /**
   * Get balance in dollars (converted from cents).
   */
  get balanceDollars(): number {
    return this.balance / 100;
  }

  /**
   * Get available balance in dollars (converted from cents).
   */
  get availableBalanceDollars(): number {
    return this.availableBalance / 100;
  }

  /**
   * Get pending balance in dollars (converted from cents).
   */
  get pendingBalanceDollars(): number {
    return this.pendingBalance / 100;
  }

  /**
   * Get payout in dollars (converted from cents).
   */
  get payoutDollars(): number {
    return this.payout / 100;
  }

  /**
   * Get fees in dollars (converted from cents).
   */
  get feesDollars(): number {
    return this.fees / 100;
  }

  /**
   * Check if there's sufficient balance for a trade.
   */
  hasSufficientBalance(amount: number): boolean {
    return this.availableBalance >= amount;
  }

  /**
   * Get the percentage of balance that is available.
   */
  get availablePercentage(): number {
    if (this.balance === 0) return 0;
    return (this.availableBalance / this.balance) * 100;
  }

  /**
   * Get the raw data from the API response.
   */
  get rawData(): BalanceData {
    return this._rawData;
  }

  /**
   * Convert the Balance instance to a plain object.
   */
  toJSON(): Record<string, any> {
    return {
      balance: this.balance,
      payout: this.payout,
      fees: this.fees,
      availableBalance: this.availableBalance,
      pendingBalance: this.pendingBalance,
      balanceDollars: this.balanceDollars,
      availableBalanceDollars: this.availableBalanceDollars,
      pendingBalanceDollars: this.pendingBalanceDollars,
      payoutDollars: this.payoutDollars,
      feesDollars: this.feesDollars,
      availablePercentage: this.availablePercentage,
    };
  }

  /**
   * String representation of the balance.
   */
  toString(): string {
    return `Balance: $${this.balanceDollars.toFixed(2)} (Available: $${this.availableBalanceDollars.toFixed(2)})`;
  }
}


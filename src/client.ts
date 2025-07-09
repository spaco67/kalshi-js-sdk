/**
 * Main client for the Kalshi JavaScript SDK.
 */

import { AuthManager } from './utils/AuthManager';
import { MarketService } from './services/MarketService';
import { TradeService } from './services/TradeService';
import { PortfolioService } from './services/PortfolioService';
import { ValidationError } from './exceptions';
import { ClientConfig } from './types';

export class KalshiClient {
  private static readonly PRODUCTION_URL = 'https://trading-api.kalshi.co';
  private static readonly DEMO_URL = 'https://demo-api.kalshi.co';

  public readonly environment: 'production' | 'demo';
  public readonly baseUrl: string;
  private readonly authManager: AuthManager;
  private readonly _markets: MarketService;
  private readonly _trading: TradeService;
  private readonly _portfolio: PortfolioService;

  /**
   * Initialize the Kalshi client.
   * 
   * @example
   * ```typescript
   * const client = new KalshiClient({
   *   apiKeyId: 'your-api-key-id',
   *   privateKey: 'your-private-key-string',
   *   environment: 'demo'
   * });
   * 
   * // Get open markets
   * const markets = await client.markets.getMarkets({ status: 'open' });
   * 
   * // Place an order
   * const order = await client.trading.placeOrder({
   *   ticker: 'EXAMPLE-24-T1',
   *   side: 'yes',
   *   action: 'buy',
   *   count: 10,
   *   price: 0.55
   * });
   * 
   * // Check balance
   * const balance = await client.portfolio.getBalance();
   * console.log(`Available balance: $${balance.availableBalanceDollars.toFixed(2)}`);
   * ```
   */
  constructor(config: ClientConfig) {
    const {
      apiKeyId,
      privateKey,
      environment = 'production',
      timeout = 30000,
    } = config;

    // Validate environment
    if (!['production', 'demo'].includes(environment)) {
      throw new ValidationError(`Environment must be 'production' or 'demo', got: ${environment}`);
    }

    // Set properties
    this.environment = environment;
    this.baseUrl = environment === 'production' 
      ? KalshiClient.PRODUCTION_URL 
      : KalshiClient.DEMO_URL;

    // Initialize authentication manager
    this.authManager = new AuthManager(apiKeyId, privateKey);

    // Initialize services
    this._markets = new MarketService(this.baseUrl, this.authManager, timeout);
    this._trading = new TradeService(this.baseUrl, this.authManager, timeout);
    this._portfolio = new PortfolioService(this.baseUrl, this.authManager, timeout);
  }

  /**
   * Access market-related functionality.
   */
  get markets(): MarketService {
    return this._markets;
  }

  /**
   * Access trading-related functionality.
   */
  get trading(): TradeService {
    return this._trading;
  }

  /**
   * Access portfolio-related functionality.
   */
  get portfolio(): PortfolioService {
    return this._portfolio;
  }

  /**
   * Test the connection to the Kalshi API.
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.portfolio.getBalance();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get information about the current API configuration.
   */
  getApiInfo(): Record<string, any> {
    return {
      environment: this.environment,
      baseUrl: this.baseUrl,
      apiKeyId: this.authManager.getApiKeyId(),
      sdkVersion: '1.0.0',
    };
  }
}


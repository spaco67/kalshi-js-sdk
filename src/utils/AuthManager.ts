/**
 * Authentication utilities for the Kalshi JavaScript SDK.
 */

import * as crypto from 'crypto';
import { AuthenticationError } from '../exceptions';

export class AuthManager {
  private apiKeyId: string;
  private privateKey: crypto.KeyObject;

  constructor(apiKeyId: string, privateKeyData: string) {
    this.apiKeyId = apiKeyId;
    this.privateKey = this.loadPrivateKey(privateKeyData);
  }

  private loadPrivateKey(privateKeyData: string): crypto.KeyObject {
    try {
      return crypto.createPrivateKey({
        key: privateKeyData,
        format: 'pem',
      });
    } catch (error) {
      throw new AuthenticationError(`Failed to load private key: ${error}`);
    }
  }

  private signMessage(message: string): string {
    try {
      const messageBuffer = Buffer.from(message, 'utf-8');
      
      const signature = crypto.sign('sha256', messageBuffer, {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
      });
      
      return signature.toString('base64');
    } catch (error) {
      throw new AuthenticationError(`Failed to sign message: ${error}`);
    }
  }

  public getAuthHeaders(method: string, path: string): Record<string, string> {
    // Get current timestamp in milliseconds
    const timestamp = Date.now().toString();
    
    // Create message to sign
    const message = timestamp + method.toUpperCase() + path;
    
    // Sign the message
    const signature = this.signMessage(message);
    
    return {
      'KALSHI-ACCESS-KEY': this.apiKeyId,
      'KALSHI-ACCESS-SIGNATURE': signature,
      'KALSHI-ACCESS-TIMESTAMP': timestamp,
    };
  }

  public getApiKeyId(): string {
    return this.apiKeyId;
  }
}


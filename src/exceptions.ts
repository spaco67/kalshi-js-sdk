/**
 * Custom exceptions for the Kalshi JavaScript SDK.
 */

export class KalshiError extends Error {
  public statusCode?: number;
  public responseData?: any;

  constructor(message: string, statusCode?: number, responseData?: any) {
    super(message);
    this.name = 'KalshiError';
    this.statusCode = statusCode;
    this.responseData = responseData;
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KalshiError);
    }
  }
}

export class AuthenticationError extends KalshiError {
  constructor(message: string, statusCode?: number, responseData?: any) {
    super(message, statusCode, responseData);
    this.name = 'AuthenticationError';
  }
}

export class APIError extends KalshiError {
  constructor(message: string, statusCode?: number, responseData?: any) {
    super(message, statusCode, responseData);
    this.name = 'APIError';
  }
}

export class ValidationError extends KalshiError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends KalshiError {
  constructor(message: string, statusCode?: number, responseData?: any) {
    super(message, statusCode, responseData);
    this.name = 'RateLimitError';
  }
}

export class NetworkError extends KalshiError {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}


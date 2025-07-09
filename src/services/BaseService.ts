/**
 * Base service class for Kalshi API services.
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { AuthManager } from '../utils/AuthManager';
import { APIError, NetworkError, RateLimitError } from '../exceptions';

export abstract class BaseService {
  protected client: AxiosInstance;
  protected authManager: AuthManager;

  constructor(baseURL: string, authManager: AuthManager, timeout: number = 30000) {
    this.authManager = authManager;
    
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'kalshi-js-sdk/1.0.0',
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use((config) => {
      const authHeaders = this.authManager.getAuthHeaders(
        config.method?.toUpperCase() || 'GET',
        config.url || ''
      );
      
      config.headers = {
        ...config.headers,
        ...authHeaders,
      } as any;
      
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Handle rate limiting
          if (error.response.status === 429) {
            throw new RateLimitError(
              'Rate limit exceeded',
              error.response.status,
              error.response.data
            );
          }
          
          // Handle other HTTP errors
          throw new APIError(
            `API request failed: ${error.response.status} ${error.response.statusText}`,
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // Network error
          throw new NetworkError(`Network error: ${error.message}`);
        } else {
          // Other error
          throw new APIError(`Request error: ${error.message}`);
        }
      }
    );
  }

  protected async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(endpoint, { params });
    return response.data;
  }

  protected async post<T = any>(endpoint: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(endpoint, data);
    return response.data;
  }

  protected async put<T = any>(endpoint: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(endpoint, data);
    return response.data;
  }

  protected async delete<T = any>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(endpoint);
    return response.data;
  }
}


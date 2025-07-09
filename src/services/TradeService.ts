/**
 * Trade service for the Kalshi JavaScript SDK.
 */

import { BaseService } from './BaseService';
import { Order } from '../models/Order';
import { OrderData, OrderParams, OrderFilters } from '../types';
import { validateOrderParams } from '../utils/helpers';

export class TradeService extends BaseService {
  /**
   * Place a new order.
   */
  async placeOrder(params: OrderParams): Promise<Order> {
    const validatedParams = validateOrderParams(params);
    
    const response = await this.post<{ order: OrderData }>('/trade-api/v2/orders', validatedParams);
    
    return new Order(response.order);
  }

  /**
   * Cancel an existing order.
   */
  async cancelOrder(orderId: string): Promise<Order> {
    const response = await this.delete<{ order: OrderData }>(`/trade-api/v2/orders/${orderId}`);
    
    return new Order(response.order);
  }

  /**
   * Get a list of orders.
   */
  async getOrders(filters: OrderFilters = {}): Promise<Order[]> {
    const response = await this.get<{ orders: OrderData[] }>('/trade-api/v2/orders', filters);
    
    return response.orders.map(orderData => new Order(orderData));
  }

  /**
   * Get a specific order by ID.
   */
  async getOrderById(orderId: string): Promise<Order> {
    const response = await this.get<{ order: OrderData }>(`/trade-api/v2/orders/${orderId}`);
    
    return new Order(response.order);
  }

  /**
   * Modify an existing order.
   */
  async modifyOrder(orderId: string, params: Partial<OrderParams>): Promise<Order> {
    const response = await this.put<{ order: OrderData }>(`/trade-api/v2/orders/${orderId}`, params);
    
    return new Order(response.order);
  }

  /**
   * Get order fills.
   */
  async getFills(filters: OrderFilters = {}): Promise<any[]> {
    const response = await this.get<{ fills: any[] }>('/trade-api/v2/fills', filters);
    
    return response.fills;
  }

  /**
   * Place multiple orders in a batch.
   */
  async batchPlaceOrders(orders: OrderParams[]): Promise<Order[]> {
    const validatedOrders = orders.map(validateOrderParams);
    
    const response = await this.post<{ orders: OrderData[] }>('/trade-api/v2/orders/batch', {
      orders: validatedOrders
    });
    
    return response.orders.map(orderData => new Order(orderData));
  }
}


import { Order, OrderDetail, OrderStatus } from './Order';

export interface OrderFilter {
    status?: OrderStatus;
    searchQuery?: string;
    startDate?: string;
    endDate?: string;
}

export interface OrderStats {
    pending: number;
    paid: number;
    preparing: number;
    shipping: number;
    delivered: number;
    total: number;
    todayActionRequired: number;
}

export interface GetOrdersParams {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    search?: string;
}

export interface OrderListResult {
    orders: Order[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export interface OrderRepository {
    getOrders(params: any): Promise<any>;
    getOrderStats(): Promise<OrderStats>;
    getOrderDetail(id: string): Promise<OrderDetail>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<void>;
    updateWaybill(id: string, courier: string, waybillNumber: string): Promise<void>;
    cancelOrder(id: string): Promise<void>;
}

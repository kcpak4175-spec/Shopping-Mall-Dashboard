export interface Metric {
    value: number;
    change: number;
}

export interface DashboardSummary {
    todaySales: Metric;
    newOrders: Metric;
    newCustomers: Metric;
    lowStockItems: number;
}

export interface WeeklySales {
    day: string;
    sales: number;
}

export interface CategorySales {
    name: string;
    ratio: number;
}

export interface Order {
    id: string;
    customerName: string;
    productName: string;
    amount: number;
    status: 'PENDING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
}

export interface DashboardData {
    summary: DashboardSummary;
    weeklySales: WeeklySales[];
    categorySales: CategorySales[];
    recentOrders: Order[];
}

export interface DashboardRepository {
    getDashboardData(): Promise<DashboardData>;
}

export interface SalesKpi {
    totalRevenue: number;
    revenueChangeRate: number; // e.g., 12.5 for +12.5%, -5.2 for -5.2%
    orderCount: number;
    orderCountChangeRate: number;
    averageOrderValue: number;
    averageOrderValueChangeRate: number;
    conversionRate: number;
    conversionRateChangeRate: number;
}

export interface DailySales {
    date: string; // 'YYYY-MM-DD' or 'DD일' format
    revenue: number;
}

export interface Bestseller {
    id: string;
    rank: number;
    productName: string;
    salesVolume: number;
}

export interface RegionalSales {
    region: string;
    percentage: number; // e.g., 45 for 45%
}

export interface SalesInsight {
    id: string;
    content: string; // e.g., "전자기기 매출이 전월 대비 23% 상승했습니다"
}

export interface SalesDashboardData {
    kpi: SalesKpi;
    dailySales: DailySales[];
    bestsellers: Bestseller[];
    regionalSales: RegionalSales[];
    insights: SalesInsight[];
}

export interface SalesRepository {
    getSalesDashboardData(period: 'week' | 'month' | 'quarter'): Promise<SalesDashboardData>;
}

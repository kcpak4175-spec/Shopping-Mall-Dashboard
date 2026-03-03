import { SalesRepository, SalesDashboardData } from '../domain/Sales';

const mockDailySales = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
        date: `2024-03-${String(i + 1).padStart(2, '0')}`,
        revenue: Math.floor(Math.random() * 5000000) + 1000000,
    }));
};

const mockWeekData: SalesDashboardData = {
    kpi: {
        totalRevenue: 35000000,
        revenueChangeRate: 15.2,
        orderCount: 1250,
        orderCountChangeRate: 5.4,
        averageOrderValue: 28000,
        averageOrderValueChangeRate: 2.1,
        conversionRate: 3.2,
        conversionRateChangeRate: -0.5,
    },
    dailySales: mockDailySales(7),
    bestsellers: [
        { id: '1', rank: 1, productName: '무선 노이즈캔슬링 헤드폰', salesVolume: 342 },
        { id: '2', rank: 2, productName: '스마트 워치 프로 4', salesVolume: 289 },
        { id: '3', rank: 3, productName: '고속 충전 보조배터리', salesVolume: 215 },
        { id: '4', rank: 4, productName: '기계식 키보드 청축', salesVolume: 180 },
        { id: '5', rank: 5, productName: '울트라와이드 모니터', salesVolume: 120 },
    ],
    regionalSales: [
        { region: '서울', percentage: 45 },
        { region: '경기', percentage: 28 },
        { region: '부산', percentage: 12 },
        { region: '기타', percentage: 15 },
    ],
    insights: [
        { id: 'i1', content: '전자기기 매출이 전주 대비 23% 상승했습니다.' },
        { id: 'i2', content: '서울 지역의 구매 전환율이 타 지역 대비 1.5배 높습니다.' },
        { id: 'i3', content: '주말 프로모션으로 금~일 매출 비중이 60%를 차지했습니다.' },
    ]
};

const mockMonthData: SalesDashboardData = {
    ...mockWeekData,
    kpi: {
        totalRevenue: 150000000,
        revenueChangeRate: 8.5,
        orderCount: 4500,
        orderCountChangeRate: 12.4,
        averageOrderValue: 33333,
        averageOrderValueChangeRate: -1.2,
        conversionRate: 2.8,
        conversionRateChangeRate: 0.1,
    },
    dailySales: mockDailySales(30),
};

const mockQuarterData: SalesDashboardData = {
    ...mockWeekData,
    kpi: {
        totalRevenue: 480000000,
        revenueChangeRate: 22.1,
        orderCount: 14000,
        orderCountChangeRate: 18.2,
        averageOrderValue: 34285,
        averageOrderValueChangeRate: 3.4,
        conversionRate: 3.0,
        conversionRateChangeRate: 0.5,
    },
    dailySales: mockDailySales(90),
};

export class MockSalesRepository implements SalesRepository {
    async getSalesDashboardData(period: 'week' | 'month' | 'quarter'): Promise<SalesDashboardData> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        switch (period) {
            case 'week':
                return mockWeekData;
            case 'month':
                return mockMonthData;
            case 'quarter':
                return mockQuarterData;
            default:
                return mockWeekData;
        }
    }
}

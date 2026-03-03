import { MockDashboardRepository } from './MockDashboardRepository';

describe('MockDashboardRepository', () => {
    it('should return valid mock dashboard data', async () => {
        const repository = new MockDashboardRepository();
        const data = await repository.getDashboardData();

        // Check Summary
        expect(data.summary).toBeDefined();
        expect(data.summary.todaySales.value).toBeGreaterThan(0);
        expect(data.summary.newOrders.value).toBeGreaterThan(0);
        expect(data.summary.newCustomers.value).toBeGreaterThan(0);
        expect(data.summary.lowStockItems).toBeGreaterThanOrEqual(0);

        // Check Weekly Sales
        expect(data.weeklySales.length).toBe(7); // 월~일 7일이어야 함
        expect(data.weeklySales[0].day).toBe('월');

        // Check Category Sales
        expect(data.categorySales.length).toBeGreaterThan(0);
        const totalRatio = data.categorySales.reduce((acc, cat) => acc + cat.ratio, 0);
        expect(totalRatio).toBe(100);

        // Check Recent Orders
        expect(data.recentOrders.length).toBeLessThanOrEqual(5); // 5개 정도라고 요구사항에 명시
    });
});

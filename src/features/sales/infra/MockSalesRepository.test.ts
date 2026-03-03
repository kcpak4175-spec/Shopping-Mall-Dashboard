import { SalesRepository } from '../domain/Sales';
import { MockSalesRepository } from './MockSalesRepository';

describe('MockSalesRepository', () => {
    let repository: SalesRepository;

    beforeEach(() => {
        repository = new MockSalesRepository();
    });

    it('should format data correctly for the "week" period', async () => {
        const data = await repository.getSalesDashboardData('week');

        expect(data.kpi).toBeDefined();
        expect(data.dailySales.length).toBeGreaterThan(0);
        expect(data.bestsellers.length).toBeLessThanOrEqual(5);
        expect(data.regionalSales.length).toBeGreaterThan(0);
        expect(data.insights.length).toBe(3);
    });

    it('should return different data structures or values based on period', async () => {
        const weekData = await repository.getSalesDashboardData('week');
        const monthData = await repository.getSalesDashboardData('month');

        // In a mock, we might differentiate by KPI values or array lengths
        expect(weekData.kpi.totalRevenue).not.toBe(monthData.kpi.totalRevenue);
        expect(monthData.dailySales.length).toBeGreaterThanOrEqual(28); // Usually ~30 for month
    });
});

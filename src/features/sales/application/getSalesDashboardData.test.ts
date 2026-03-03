import { getSalesDashboardData } from './getSalesDashboardData';
import { MockSalesRepository } from '../infra/MockSalesRepository';

describe('getSalesDashboardData (Application Layer)', () => {
    it('should fetch data for the given period using the repository', async () => {
        const repository = new MockSalesRepository();
        // Spy on the repository method
        const spy = jest.spyOn(repository, 'getSalesDashboardData');

        const result = await getSalesDashboardData(repository, 'week');

        expect(spy).toHaveBeenCalledWith('week');
        expect(result).toBeDefined();
        expect(result.kpi.totalRevenue).toBe(35000000); // from mock setup
    });

    it('should default to "week" if no period is specified', async () => {
        const repository = new MockSalesRepository();
        const spy = jest.spyOn(repository, 'getSalesDashboardData');

        const result = await getSalesDashboardData(repository);

        expect(spy).toHaveBeenCalledWith('week');
        expect(result).toBeDefined();
    });
});

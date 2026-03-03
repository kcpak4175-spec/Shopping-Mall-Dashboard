import { SalesDashboardData, SalesRepository } from '../domain/Sales';

export async function getSalesDashboardData(
    repository: SalesRepository,
    period: 'week' | 'month' | 'quarter' = 'week'
): Promise<SalesDashboardData> {
    return await repository.getSalesDashboardData(period);
}

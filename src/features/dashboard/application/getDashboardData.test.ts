import { getDashboardData } from './getDashboardData';
import { DashboardRepository, DashboardData } from '../domain/types';

describe('getDashboardData UseCase', () => {
    it('should return combined dashboard data from repository', async () => {
        // Arrange
        const mockData: DashboardData = {
            summary: {
                todaySales: { value: 1500000, change: 12.5 },
                newOrders: { value: 45, change: 5 },
                newCustomers: { value: 12, change: -2 },
                lowStockItems: 3,
            },
            weeklySales: [
                { day: '월', sales: 1200000 },
                { day: '화', sales: 1500000 },
            ],
            categorySales: [
                { name: '의류', ratio: 45 },
                { name: '전자기기', ratio: 55 },
            ],
            recentOrders: [
                {
                    id: 'ORD-001',
                    customerName: '홍길동',
                    productName: '나이키 에어포스',
                    amount: 129000,
                    status: 'SHIPPING',
                    createdAt: '2026-03-02T10:00:00Z',
                },
            ],
        };

        const mockRepository: DashboardRepository = {
            getDashboardData: jest.fn().mockResolvedValue(mockData),
        };

        // Act
        const result = await getDashboardData(mockRepository);

        // Assert
        expect(mockRepository.getDashboardData).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockData);
    });
});

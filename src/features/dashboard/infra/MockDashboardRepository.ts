import { DashboardData, DashboardRepository } from '../domain/types';

export class MockDashboardRepository implements DashboardRepository {
    async getDashboardData(): Promise<DashboardData> {
        return {
            summary: {
                todaySales: { value: 3450000, change: 12.5 },
                newOrders: { value: 124, change: 8.2 },
                newCustomers: { value: 45, change: -2.4 },
                lowStockItems: 12,
            },
            weeklySales: [
                { day: '월', sales: 1200000 },
                { day: '화', sales: 1500000 },
                { day: '수', sales: 1100000 },
                { day: '목', sales: 1800000 },
                { day: '금', sales: 2200000 },
                { day: '토', sales: 3100000 },
                { day: '일', sales: 2900000 },
            ],
            categorySales: [
                { name: '의류', ratio: 45 },
                { name: '전자기기', ratio: 30 },
                { name: '식품', ratio: 15 },
                { name: '기타', ratio: 10 },
            ],
            recentOrders: [
                { id: 'ORD-001', customerName: '김철수', productName: '나이키 에어포스', amount: 129000, status: 'DELIVERED', createdAt: '10분 전' },
                { id: 'ORD-002', customerName: '이영희', productName: '애플 워치 SE', amount: 359000, status: 'SHIPPING', createdAt: '1시간 전' },
                { id: 'ORD-003', customerName: '박지성', productName: '닭가슴살 30팩', amount: 45000, status: 'PENDING', createdAt: '2시간 전' },
                { id: 'ORD-004', customerName: '최민수', productName: '기계식 키보드', amount: 150000, status: 'SHIPPING', createdAt: '3시간 전' },
                { id: 'ORD-005', customerName: '정우성', productName: '맨투맨 티셔츠', amount: 39000, status: 'DELIVERED', createdAt: '5시간 전' },
            ],
        };
    }
}

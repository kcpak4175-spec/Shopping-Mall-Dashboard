import { Customer, CustomerRepository, CustomerStats } from '../domain/Customer';

const mockCustomers: Customer[] = [
    { id: '1', name: '김철수', email: 'chulsoo@example.com', orderCount: 15, totalSpent: 4500000, isVip: true, createdAt: '2023-01-15T10:00:00Z' },
    { id: '2', name: '이영희', email: 'younghee@example.com', orderCount: 2, totalSpent: 45000, isVip: false, createdAt: '2023-05-20T14:30:00Z' },
    { id: '3', name: '박지민', email: 'jimin@example.com', orderCount: 12, totalSpent: 890000, isVip: true, createdAt: '2022-11-05T09:15:00Z' },
    { id: '4', name: '최민수', email: 'minsoo@example.com', orderCount: 1, totalSpent: 12000, isVip: false, createdAt: '2023-08-10T11:45:00Z' },
    { id: '5', name: '정다은', email: 'daeun@example.com', orderCount: 3, totalSpent: 78000, isVip: false, createdAt: '2023-09-01T16:20:00Z' },
    { id: '6', name: '홍길동', email: 'gildong@example.com', orderCount: 8, totalSpent: 340000, isVip: true, createdAt: '2023-03-12T08:50:00Z' },
    { id: '7', name: '강동원', email: 'dongwon@example.com', orderCount: 0, totalSpent: 0, isVip: false, createdAt: '2023-10-05T13:10:00Z' }
];

export class MockCustomerRepository implements CustomerRepository {
    async getCustomerList(params: {
        query?: string;
        sortBy?: 'createdAt' | 'totalSpent';
        page?: number;
        limit?: number;
    }): Promise<{ data: Customer[]; total: number }> {
        let filtered = [...mockCustomers];

        if (params.query) {
            const q = params.query.toLowerCase();
            filtered = filtered.filter(
                c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
            );
        }

        if (params.sortBy) {
            filtered.sort((a, b) => {
                if (params.sortBy === 'totalSpent') {
                    return b.totalSpent - a.totalSpent;
                } else {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
            });
        }

        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const paginated = filtered.slice(startIndex, startIndex + limit);

        return {
            data: paginated,
            total: filtered.length
        };
    }

    async getCustomerStats(): Promise<CustomerStats> {
        return {
            totalCustomers: 1234,
            newCustomersThisMonth: 56,
            vipCustomers: 23
        };
    }

    async getCustomerDetail(id: string) {
        const customer = mockCustomers.find(c => c.id === id);
        if (!customer) {
            throw new Error('Customer not found');
        }

        return {
            ...customer,
            phone: '010-1234-5678',
            averageOrder: 300000,
            orderHistory: [
                { id: 'ORD-2024-001', productSummary: 'MacBook Pro 16인치 외 1건', amount: 2890000, status: '배송완료' as const, date: '2024-02-15T10:00:00Z' },
                { id: 'ORD-2024-002', productSummary: 'iPhone 15 Pro', amount: 1550000, status: '배송완료' as const, date: '2024-01-28T14:30:00Z' },
                { id: 'ORD-2023-015', productSummary: 'AirPods Pro 2 외 2건', amount: 520000, status: '배송완료' as const, date: '2023-12-20T09:15:00Z' },
                { id: 'ORD-2023-012', productSummary: '나이키 에어포스 1', amount: 139000, status: '결제완료' as const, date: '2023-11-05T16:00:00Z' },
                { id: 'ORD-2023-008', productSummary: 'iPad Air 5세대', amount: 929000, status: '배송중' as const, date: '2023-10-10T11:30:00Z' }
            ],
            favoriteCategories: [
                { name: '전자기기', percentage: 80 },
                { name: '의류', percentage: 15 },
                { name: '기타', percentage: 5 }
            ]
        };
    }
}

import { render, screen } from '@testing-library/react';
import DashboardPage from './page';
import { getDashboardData } from '../../src/features/dashboard/application/getDashboardData';

// Mock dependencies
jest.mock('../../src/features/dashboard/application/getDashboardData');

jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => <div>{children}</div>
    };
});

describe('Dashboard Page Integration', () => {
    it('renders correctly with resolved mock data', async () => {
        const mockDbData = {
            summary: {
                todaySales: { value: 3450000, change: 12.5 },
                newOrders: { value: 124, change: 8.2 },
                newCustomers: { value: 45, change: -2.4 },
                lowStockItems: 12,
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
                { id: 'ORD-001', customerName: '김철수', productName: '나이키 에어포스', amount: 129000, status: 'DELIVERED' as const, createdAt: '10분 전' },
            ],
        };

        // setup the mock
        (getDashboardData as jest.Mock).mockResolvedValue(mockDbData);

        // As it is an async Server Component, we need to await it
        const ui = await DashboardPage();
        render(ui);

        // Verify Metric Cards
        expect(screen.getByText('오늘 매출')).toBeInTheDocument();
        expect(screen.getByText('₩3,450,000')).toBeInTheDocument();

        expect(screen.getByText('신규 주문')).toBeInTheDocument();
        expect(screen.getByText('124')).toBeInTheDocument();

        expect(screen.getByText('신규 고객')).toBeInTheDocument();
        expect(screen.getByText('45')).toBeInTheDocument();

        expect(screen.getByText('재고 부족 상품')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();

        // Verify Charts rendered
        expect(screen.getByText('주간 매출 추이')).toBeInTheDocument();
        expect(screen.getByText('카테고리별 판매 비율')).toBeInTheDocument();

        // Verify Table rendered
        expect(screen.getByText('최근 주문 목록')).toBeInTheDocument();
        expect(screen.getByText('ORD-001')).toBeInTheDocument();
        expect(screen.getByText('김철수')).toBeInTheDocument();
    });
});

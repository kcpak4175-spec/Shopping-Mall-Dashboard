import { render, screen } from '@testing-library/react';
import CustomersPage from './page';
import * as getCustomerListModule from '@/features/customers/application/getCustomerList';
import * as getCustomerStatsModule from '@/features/customers/application/getCustomerStats';

jest.mock('@/features/customers/application/getCustomerList');
jest.mock('@/features/customers/application/getCustomerStats');

jest.mock('next/navigation', () => ({
    useRouter: () => ({ replace: jest.fn() }),
    usePathname: () => '/customers',
    useSearchParams: () => new URLSearchParams(),
}));

describe('CustomersPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (getCustomerListModule.getCustomerList as jest.Mock).mockResolvedValue({
            data: [
                { id: '1', name: '김철수', email: 'chulsoo@example.com', orderCount: 5, totalSpent: 150000, isVip: true, createdAt: '2023-01-15T10:00:00Z' }
            ],
            total: 1
        });
        (getCustomerStatsModule.getCustomerStats as jest.Mock).mockResolvedValue({
            totalCustomers: 1234,
            newCustomersThisMonth: 56,
            vipCustomers: 23,
        });
    });

    it('should render page title, search/sort, table, and footer', async () => {
        const searchParams = Promise.resolve({});
        const resolvedPage = await CustomersPage({ searchParams });
        render(resolvedPage);

        expect(screen.getByText('고객 관리')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('이름 또는 이메일 검색')).toBeInTheDocument();
        expect(screen.getByText('김철수')).toBeInTheDocument();
        expect(screen.getByText(/총 1,234명/)).toBeInTheDocument();
    });

    it('should pass correct params to usecases based on searchParams', async () => {
        const searchParams = Promise.resolve({ query: '철수', page: '2', sortBy: 'totalSpent' });
        const resolvedPage = await CustomersPage({ searchParams });
        render(resolvedPage);

        expect(getCustomerListModule.getCustomerList).toHaveBeenCalledWith(
            expect.anything(),
            { query: '철수', page: 2, limit: 6, sortBy: 'totalSpent' }
        );
    });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SalesAnalyticsPage, { DashboardContent } from './page';

// Mock recharts
jest.mock('recharts', () => {
    const OriginalRecharts = jest.requireActual('recharts');
    return {
        ...OriginalRecharts,
        ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
        LineChart: () => <div data-testid="line-chart" />,
        BarChart: () => <div data-testid="bar-chart" />,
    };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
}));

describe('SalesAnalyticsPage Integration', () => {
    it('should render the SalesAnalyticsPage shell correctly', async () => {
        // Resolve the Server Component promise
        const searchParams = Promise.resolve({ period: 'week' });
        const pageObj = await SalesAnalyticsPage({ searchParams });

        // We only shallow render / check the shell because RTL doesn't fully support deep async child components yet
        expect(pageObj.props.children[0].props.currentPeriod).toBe('week'); // SalesHeader is passed currentPeriod
    });

    it('should render DashboardContent and resolve data correctly', async () => {
        // Resolve the async DashboardContent directly to bypass RTL async child rendering issues
        const contentObj = await DashboardContent({ period: 'week' });
        render(contentObj);

        // KPI
        expect(screen.getByText('총 매출')).toBeInTheDocument();
        // Charts
        expect(screen.getByText('일별 매출 추이')).toBeInTheDocument();
        expect(screen.getByText('지역별 판매 비율')).toBeInTheDocument();
        // Bestseller
        expect(screen.getByText('베스트셀러 (Top 5)')).toBeInTheDocument();
    });
});

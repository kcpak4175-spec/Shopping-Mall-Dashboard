import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DailySalesChart } from './DailySalesChart';

// Mock recharts because it uses ResizeObserver which doesn't exist in JSDOM by default
jest.mock('recharts', () => {
    const OriginalRecharts = jest.requireActual('recharts');
    return {
        ...OriginalRecharts,
        ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
        LineChart: () => <div data-testid="line-chart" />,
    };
});

describe('DailySalesChart', () => {
    const mockData = [
        { date: '2024-03-01', revenue: 1000000 },
        { date: '2024-03-02', revenue: 2000000 },
    ];

    it('should render the chart container and title', () => {
        render(<DailySalesChart data={mockData} />);
        expect(screen.getByText('일별 매출 추이')).toBeInTheDocument();
    });

    it('should render the mocked line chart', () => {
        render(<DailySalesChart data={mockData} />);
        expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });
});

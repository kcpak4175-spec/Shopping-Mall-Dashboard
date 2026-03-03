import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RegionalSalesChart } from './RegionalSalesChart';

// Mock recharts
jest.mock('recharts', () => {
    const OriginalRecharts = jest.requireActual('recharts');
    return {
        ...OriginalRecharts,
        ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
        BarChart: () => <div data-testid="bar-chart" />,
    };
});

describe('RegionalSalesChart', () => {
    const mockData = [
        { region: '서울', percentage: 45 },
        { region: '경기', percentage: 28 },
    ];

    it('should render the title', () => {
        render(<RegionalSalesChart data={mockData} />);
        expect(screen.getByText('지역별 판매 비율')).toBeInTheDocument();
    });

    it('should render the mocked bar chart', () => {
        render(<RegionalSalesChart data={mockData} />);
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
});

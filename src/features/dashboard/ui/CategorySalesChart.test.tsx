import { render, screen } from '@testing-library/react';
import CategorySalesChart from './CategorySalesChart';

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => <div>{children}</div>
    };
});

describe('CategorySalesChart Component', () => {
    it('renders title and chart container', () => {
        const mockData = [
            { name: '의류', ratio: 45 },
            { name: '전자기기', ratio: 55 },
        ];
        render(<CategorySalesChart data={mockData} />);

        expect(screen.getByText('카테고리별 판매 비율')).toBeInTheDocument();
    });
});

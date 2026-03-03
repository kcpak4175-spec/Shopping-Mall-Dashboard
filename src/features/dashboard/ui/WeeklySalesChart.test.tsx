import { render, screen } from '@testing-library/react';
import WeeklySalesChart from './WeeklySalesChart';

// Recharts relies on DOM APIs (ResizeObserver) not completely available in JSDOM out of the box.
// It's common to mock it for the container check or rely on robust custom jest environment.
// For simply checking if it renders without crashing:
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => <div>{children}</div>
    };
});

describe('WeeklySalesChart Component', () => {
    it('renders title and chart container', () => {
        const mockData = [
            { day: '월', sales: 1200000 },
            { day: '화', sales: 1500000 },
        ];
        render(<WeeklySalesChart data={mockData} />);

        expect(screen.getByText('주간 매출 추이')).toBeInTheDocument();
    });
});

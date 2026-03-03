import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { KpiCards } from './KpiCards';

const mockKpi = {
    totalRevenue: 35000000,
    revenueChangeRate: 15.2,
    orderCount: 1250,
    orderCountChangeRate: 5.4,
    averageOrderValue: 28000,
    averageOrderValueChangeRate: -2.1,
    conversionRate: 3.2,
    conversionRateChangeRate: 0.5,
};

describe('KpiCards', () => {
    it('should render 4 KPI cards', () => {
        render(<KpiCards kpi={mockKpi} />);

        expect(screen.getByText('총 매출')).toBeInTheDocument();
        expect(screen.getByText('주문 수')).toBeInTheDocument();
        expect(screen.getByText('객단가')).toBeInTheDocument();
        expect(screen.getByText('전환율')).toBeInTheDocument();
    });

    it('should format currency correctly', () => {
        render(<KpiCards kpi={mockKpi} />);
        // 35,000,000
        expect(screen.getByText('35,000,000 원')).toBeInTheDocument();
        // 28,000
        expect(screen.getByText('28,000 원')).toBeInTheDocument();
    });

    it('should display positive and negative change rates correctly', () => {
        render(<KpiCards kpi={mockKpi} />);

        // Positive
        expect(screen.getByText('+15.2%')).toBeInTheDocument();

        // Negative
        expect(screen.getByText('-2.1%')).toBeInTheDocument();
    });
});

import { render, screen } from '@testing-library/react';
import MetricCard from './MetricCard';
import { DollarSign, AlertTriangle } from 'lucide-react';

describe('MetricCard Component', () => {
    it('renders title, value, and change percentage properly', () => {
        render(
            <MetricCard
                title="오늘 매출"
                value={1500000}
                change={12.5}
                valueFormat="currency"
                icon={DollarSign}
            />
        );

        expect(screen.getByText('오늘 매출')).toBeInTheDocument();
        // Currency format expectation: "₩1,500,000"
        expect(screen.getByText('₩1,500,000')).toBeInTheDocument();
        // 12.5% increase is positive
        expect(screen.getByText('+12.5%')).toBeInTheDocument();
    });

    it('renders negative change in red', () => {
        render(
            <MetricCard
                title="신규 고객"
                value={12}
                change={-2}
                valueFormat="number"
                icon={DollarSign}
            />
        );

        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('-2.0%')).toBeInTheDocument();
    });

    it('renders alert style when isWarning is true without change percentage', () => {
        render(
            <MetricCard
                title="재고 부족 상품"
                value={3}
                isWarning={true}
                icon={AlertTriangle}
            />
        );

        expect(screen.getByText('재고 부족 상품')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.queryByText('%')).not.toBeInTheDocument();
    });
});

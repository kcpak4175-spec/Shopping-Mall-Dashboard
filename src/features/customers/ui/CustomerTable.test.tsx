import { render, screen } from '@testing-library/react';
import { CustomerTable } from './CustomerTable';
import { Customer } from '../domain/Customer';

const mockCustomers: Customer[] = [
    { id: '1', name: '김철수', email: 'chulsoo@example.com', orderCount: 5, totalSpent: 150000, isVip: true, createdAt: '2023-01-15T10:00:00Z' },
    { id: '2', name: '이영희', email: 'younghee@example.com', orderCount: 2, totalSpent: 45000, isVip: false, createdAt: '2023-05-20T14:30:00Z' },
];

describe('CustomerTable', () => {
    it('should render table headers correctly', () => {
        render(<CustomerTable customers={mockCustomers} />);
        expect(screen.getByText('고객명')).toBeInTheDocument();
        expect(screen.getByText('이메일')).toBeInTheDocument();
        expect(screen.getByText('주문수')).toBeInTheDocument();
        expect(screen.getByText('총구매액')).toBeInTheDocument();
        expect(screen.getByText('가입일')).toBeInTheDocument();
    });

    it('should render customer rows correctly', () => {
        render(<CustomerTable customers={mockCustomers} />);
        expect(screen.getByText(/김철수/)).toBeInTheDocument();
        expect(screen.getByText('chulsoo@example.com')).toBeInTheDocument();
        expect(screen.getByText('150,000원')).toBeInTheDocument();
    });

    it('should show star icon for VIP customers', () => {
        render(<CustomerTable customers={mockCustomers} />);
        const rows = screen.getAllByRole('row');
        const vipRow = rows[1];
        expect(vipRow).toHaveTextContent('⭐');

        const normalRow = rows[2];
        expect(normalRow).not.toHaveTextContent('⭐');
    });

    it('should show empty state when there are no customers', () => {
        render(<CustomerTable customers={[]} />);
        expect(screen.getByText('고객이 없습니다.')).toBeInTheDocument();
    });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import OrderInfoCard from './OrderInfoCard';

describe('OrderInfoCard', () => {
    const mockOrder = {
        orderDate: '2023-10-01T14:30:00Z',
        paymentDate: '2023-10-01T14:35:00Z',
        paymentMethod: '신용카드 (현대카드)'
    };

    it('displays order date, payment date and payment method', () => {
        render(<OrderInfoCard orderDate={mockOrder.orderDate} paymentDate={mockOrder.paymentDate} paymentMethod={mockOrder.paymentMethod} />);

        expect(screen.getByText('주문 정보')).toBeInTheDocument();
        expect(screen.getByText('주문일시')).toBeInTheDocument();
        expect(screen.getByText('결제일시')).toBeInTheDocument();
        expect(screen.getByText('결제수단')).toBeInTheDocument();

        expect(screen.getByText('2023. 10. 1. 14:30')).toBeInTheDocument();
        expect(screen.getByText('2023. 10. 1. 14:35')).toBeInTheDocument();
        expect(screen.getByText('신용카드 (현대카드)')).toBeInTheDocument();
    });

    it('hides payment date if not available', () => {
        render(<OrderInfoCard orderDate={mockOrder.orderDate} paymentMethod={mockOrder.paymentMethod} />);
        expect(screen.queryByText('결제일시')).not.toBeInTheDocument();
    });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import OrderStatusProgressBar from './OrderStatusProgressBar';

describe('OrderStatusProgressBar', () => {
    it('renders all 5 steps', () => {
        render(<OrderStatusProgressBar currentStatus="pending" />);
        expect(screen.getByText('결제대기')).toBeInTheDocument();
        expect(screen.getByText('결제완료')).toBeInTheDocument();
        expect(screen.getByText('상품준비')).toBeInTheDocument();
        expect(screen.getByText('배송중')).toBeInTheDocument();
        expect(screen.getByText('배송완료')).toBeInTheDocument();
    });

    it('highlights active or past steps correctly based on status', () => {
        const { container } = render(<OrderStatusProgressBar currentStatus="preparing" />);

        // Find elements that have the active/completed color (e.g., bg-blue-600 or text-blue-600)
        // Since we don't have the implementation yet, we'll check by data-active attribute
        // or just by checking classes if we enforce them.

        const pendingStep = screen.getByTestId('step-pending');
        const paidStep = screen.getByTestId('step-paid');
        const preparingStep = screen.getByTestId('step-preparing');
        const shippingStep = screen.getByTestId('step-shipping');
        const deliveredStep = screen.getByTestId('step-delivered');

        expect(pendingStep).toHaveAttribute('data-active', 'true');
        expect(paidStep).toHaveAttribute('data-active', 'true');
        expect(preparingStep).toHaveAttribute('data-active', 'true');

        expect(shippingStep).toHaveAttribute('data-active', 'false');
        expect(deliveredStep).toHaveAttribute('data-active', 'false');
    });
});

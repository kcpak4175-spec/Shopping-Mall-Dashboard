import * as React from 'react';
import { render, screen } from '@testing-library/react';
import OrderProductList from './OrderProductList';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />;
    },
}));

describe('OrderProductList', () => {
    const mockProducts = [
        {
            id: 'p1',
            productId: 'prod_1',
            name: '무소음 무선 마우스',
            imageUrl: 'https://via.placeholder.com/80',
            price: 25000,
            quantity: 2,
            subtotal: 50000
        }
    ];

    const mockSummary = {
        productTotal: 50000,
        shippingFee: 3000,
        totalAmount: 53000
    };

    it('renders products and payment summary correctly', () => {
        render(<OrderProductList products={mockProducts} paymentSummary={mockSummary} />);

        // Product details
        expect(screen.getByText('무소음 무선 마우스')).toBeInTheDocument();
        expect(screen.getByText(/25,000원/)).toBeInTheDocument();
        expect(screen.getByText(/2개/)).toBeInTheDocument();

        // Summary details
        expect(screen.getByText('상품 합계')).toBeInTheDocument();
        expect(screen.getByText('배송비')).toBeInTheDocument();
        expect(screen.getByText('총 결제금액')).toBeInTheDocument();

        expect(screen.getByText('3,000원')).toBeInTheDocument();
        expect(screen.getByText('53,000원')).toBeInTheDocument();
    });
});

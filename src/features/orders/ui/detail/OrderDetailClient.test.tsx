import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderDetailClient from './OrderDetailClient';
import { OrderDetail } from '../../domain/Order';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

// Mock next/link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, ...rest }: any) => <a href={href} {...rest}>{children}</a>,
}));

const mockOrder: OrderDetail = {
    id: '1234',
    orderNumber: 'ORD-1234',
    customerName: '홍길동',
    productSummary: '무소음 마우스 외 1건',
    totalAmount: 43000,
    status: 'paid',
    orderDate: '2023-10-01T14:30:00Z',
    paymentDate: '2023-10-01T14:35:00Z',
    paymentMethod: '신용카드 (현대카드)',
    buyer: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong@example.com'
    },
    shipping: {
        recipientName: '홍길동',
        phone: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로 123, 4층',
        memo: '문 앞에 놓고 가주세요',
    },
    products: [
        {
            id: 'p1',
            productId: 'prod_1',
            name: '무소음 무선 마우스',
            imageUrl: 'https://via.placeholder.com/80',
            price: 25000,
            quantity: 1,
            subtotal: 25000
        }
    ],
    paymentSummary: {
        productTotal: 40000,
        shippingFee: 3000,
        totalAmount: 43000
    }
};

describe('OrderDetailClient Integration', () => {
    it('renders the full order detail page with all sections', () => {
        render(<OrderDetailClient order={mockOrder} />);

        // Header
        expect(screen.getAllByText(/1234/).length).toBeGreaterThan(0);

        // Customer info
        expect(screen.getByText('고객 정보')).toBeInTheDocument();
        expect(screen.getByText('hong@example.com')).toBeInTheDocument();

        // Product info
        expect(screen.getByText('무소음 무선 마우스')).toBeInTheDocument();

        // Shipping info
        expect(screen.getByText('배송 정보')).toBeInTheDocument();
        expect(screen.getAllByText('서울특별시 강남구 테헤란로 123, 4층').length).toBeGreaterThan(0);

        // Action buttons
        expect(screen.getByRole('button', { name: '주문 취소' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
    });

    it('navigates back to orders list', () => {
        render(<OrderDetailClient order={mockOrder} />);
        const backLink = screen.getByText('주문 목록');
        expect(backLink.closest('a')).toHaveAttribute('href', '/orders');
    });
});

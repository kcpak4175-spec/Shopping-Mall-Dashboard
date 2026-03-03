import { render, screen } from '@testing-library/react';
import RecentOrdersTable from './RecentOrdersTable';
import { Order } from '../domain/types';

describe('RecentOrdersTable Component', () => {
    it('renders table headers and order data properly', () => {
        const mockOrders: Order[] = [
            {
                id: 'ORD-001',
                customerName: '홍길동',
                productName: '나이키 신발',
                amount: 150000,
                status: 'SHIPPING',
                createdAt: '1시간 전',
            },
            {
                id: 'ORD-002',
                customerName: '김철수',
                productName: '삼성 모니터',
                amount: 320000,
                status: 'DELIVERED',
                createdAt: '2시간 전',
            },
        ];

        render(<RecentOrdersTable orders={mockOrders} />);

        // Check Headers
        const headers = ['주문번호', '고객명', '상품', '금액', '상태', '시간'];
        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });

        // Check Data Rendering
        expect(screen.getByText('ORD-001')).toBeInTheDocument();
        expect(screen.getByText('홍길동')).toBeInTheDocument();
        expect(screen.getByText('나이키 신발')).toBeInTheDocument();
        expect(screen.getByText('₩150,000')).toBeInTheDocument();
        expect(screen.getByText('배송중')).toBeInTheDocument(); // SHIPPING -> '배송중' 매핑 확인
        expect(screen.getByText('1시간 전')).toBeInTheDocument();

        // Check Total View Link
        expect(screen.getByText('전체 보기')).toBeInTheDocument();
    });
});

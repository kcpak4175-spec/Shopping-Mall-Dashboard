import { render, screen } from '@testing-library/react';
import OrderTable from './OrderTable';
import { Order } from '../domain/Order';

// next/link 모킹
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('OrderTable', () => {
    const mockOrders: Order[] = [
        { id: 'ORD-1', customerName: '김철수', productSummary: '나이키 슈즈', totalAmount: 120000, status: 'pending', orderDate: '2023-10-01T10:00:00Z' },
        { id: 'ORD-2', customerName: '이영희', productSummary: '맥북', totalAmount: 3000000, status: 'paid', orderDate: '2023-10-02T10:00:00Z' },
        { id: 'ORD-3', customerName: '박지성', productSummary: '모니터', totalAmount: 400000, status: 'shipping', orderDate: '2023-10-03T10:00:00Z' },
        { id: 'ORD-4', customerName: '손흥민', productSummary: '키보드', totalAmount: 150000, status: 'delivered', orderDate: '2023-10-04T10:00:00Z' },
    ];

    it('주문 목록이 테이블에 올바르게 렌더링된다', () => {
        render(<OrderTable orders={mockOrders} />);

        // 헤더 확인
        expect(screen.getByText('주문번호')).toBeInTheDocument();
        expect(screen.getByText('고객명')).toBeInTheDocument();
        expect(screen.getByText('상품요약')).toBeInTheDocument();

        // 데이터 확인
        expect(screen.getByText('ORD-1')).toBeInTheDocument();
        expect(screen.getByText('김철수')).toBeInTheDocument();
        expect(screen.getByText('나이키 슈즈')).toBeInTheDocument();
        expect(screen.getByText('120,000원')).toBeInTheDocument(); // 금액 포맷팅
    });

    it('상태에 따라 올바른 텍스트와 라벨 배지가 표시된다', () => {
        render(<OrderTable orders={mockOrders} />);

        const pendingBadge = screen.getByText('결제대기');
        expect(pendingBadge.className).toContain('bg-yellow-100');
        expect(pendingBadge.className).toContain('text-yellow-800');

        const paidBadge = screen.getByText('결제완료');
        expect(paidBadge.className).toContain('bg-blue-100');
        expect(paidBadge.className).toContain('text-blue-800');

        const shippingBadge = screen.getByText('배송중');
        expect(shippingBadge.className).toContain('bg-purple-100');
        expect(shippingBadge.className).toContain('text-purple-800');

        const deliveredBadge = screen.getByText('배송완료');
        expect(deliveredBadge.className).toContain('bg-green-100');
        expect(deliveredBadge.className).toContain('text-green-800');
    });

    it('상태보기 링크가 주문번호를 통해 생성된다', () => {
        render(<OrderTable orders={mockOrders} />);

        const link = screen.getByRole('link', { name: /ORD-1/i });
        expect(link).toHaveAttribute('href', '/orders/ORD-1');
    });

    it('주문이 없을 경우 안내 메시지가 표시된다', () => {
        render(<OrderTable orders={[]} />);
        expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });
});

import { render, screen, act } from '@testing-library/react';
import OrdersPage from '../../../../app/(dashboard)/orders/page';

// Mock the dependencies
jest.mock('../../../../src/features/orders/application/getOrderList', () => ({
    getOrderList: jest.fn().mockResolvedValue([
        { id: 'ORD-1', customerName: '김철수', productSummary: '나이키 슈즈', totalAmount: 120000, status: 'pending', orderDate: '2023-10-01T10:00:00Z' }
    ])
}));

jest.mock('../../../../src/features/orders/application/getOrderStats', () => ({
    getOrderStats: jest.fn().mockResolvedValue({
        total: 1, pending: 1, paid: 0, shipping: 0, delivered: 0, todayActionRequired: 0
    })
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
    }),
    usePathname: () => '/orders',
    useSearchParams: () => new URLSearchParams(),
}));

// RSC (서버 컴포넌트) 테스트 헬퍼 함수
async function renderServerComponent(Component: any, props: any = {}) {
    const jsx = await Component(props);
    return render(jsx);
}

describe('OrdersPage Integration', () => {
    it('주문 관리 페이지가 올바르게 렌더링되고 자식 컴포넌트들을 포함한다', async () => {
        // Next.js 15+ 에서는 searchParams가 Promise 형태이므로 이에 맞춰 모킹
        const searchParams = Promise.resolve({});

        await act(async () => {
            await renderServerComponent(OrdersPage, { searchParams });
        });

        // 헤더 타이틀 확인
        expect(screen.getByText('주문 관리')).toBeInTheDocument();

        // 탭 렌더링 (OrderTabs)
        expect(screen.getByText('결제대기(1)')).toBeInTheDocument();

        // 테이블 렌더링 (OrderTable)
        expect(screen.getByText('ORD-1')).toBeInTheDocument();

        // 요약 문구 렌더링 (OrderSummary)
        expect(screen.getByText(/오늘 처리해야 할 주문:/)).toBeInTheDocument();
    });
});

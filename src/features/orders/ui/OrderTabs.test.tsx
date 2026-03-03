import { render, screen, fireEvent } from '@testing-library/react';
import OrderTabs from './OrderTabs';
import { OrderStats } from '../domain/OrderRepository';

describe('OrderTabs', () => {
    const mockStats: OrderStats = {
        total: 100,
        pending: 10,
        paid: 20,
        shipping: 30,
        delivered: 40,
        todayActionRequired: 20,
    };

    const mockOnTabChange = jest.fn();

    beforeEach(() => {
        mockOnTabChange.mockClear();
    });

    it('각 상태별 탭과 통계가 올바르게 렌더링된다', () => {
        render(<OrderTabs stats={mockStats} currentTab="all" onTabChange={mockOnTabChange} />);

        expect(screen.getByText('전체(100)')).toBeInTheDocument();
        expect(screen.getByText('결제대기(10)')).toBeInTheDocument();
        expect(screen.getByText('결제완료(20)')).toBeInTheDocument();
        expect(screen.getByText('배송중(30)')).toBeInTheDocument();
        expect(screen.getByText('배송완료(40)')).toBeInTheDocument();
    });

    it('현재 선택된 탭은 활성화 스타일을 갖는다', () => {
        const { container } = render(<OrderTabs stats={mockStats} currentTab="paid" onTabChange={mockOnTabChange} />);

        // 이 프로젝트의 스타일 컨벤션에 따라 tailwind 클래스를 확인
        // 현재 선택된 탭은 텍스트가 파란색 이거나 border-b 가 파란색일 것을 기대
        const activeTab = screen.getByText('결제완료(20)');
        expect(activeTab.className).toContain('text-blue-600');
        expect(activeTab.className).toContain('border-blue-600');
    });

    it('탭을 클릭하면 onTabChange 콜백이 올바른 인자와 함께 호출된다', () => {
        render(<OrderTabs stats={mockStats} currentTab="all" onTabChange={mockOnTabChange} />);

        fireEvent.click(screen.getByText('배송중(30)'));
        expect(mockOnTabChange).toHaveBeenCalledWith('shipping');
    });
});

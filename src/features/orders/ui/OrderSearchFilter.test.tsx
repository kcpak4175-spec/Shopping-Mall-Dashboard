import { render, screen, fireEvent } from '@testing-library/react';
import OrderSearchFilter from './OrderSearchFilter';

describe('OrderSearchFilter', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        mockOnSearch.mockClear();
    });

    it('검색창과 날짜 필터 입력 요소가 렌더링된다', () => {
        render(<OrderSearchFilter onSearch={mockOnSearch} />);

        expect(screen.getByPlaceholderText('주문번호 또는 고객명 통합검색')).toBeInTheDocument();
        expect(screen.getByLabelText('시작일')).toBeInTheDocument();
        expect(screen.getByLabelText('종료일')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '검색' })).toBeInTheDocument();
    });

    it('입력값을 변경하고 검색 버튼을 클릭하면 onSearch가 호출된다', () => {
        render(<OrderSearchFilter onSearch={mockOnSearch} />);

        const searchInput = screen.getByPlaceholderText('주문번호 또는 고객명 통합검색');
        const startDateInput = screen.getByLabelText('시작일');
        const endDateInput = screen.getByLabelText('종료일');
        const searchBtn = screen.getByRole('button', { name: '검색' });

        fireEvent.change(searchInput, { target: { value: '김철수' } });
        fireEvent.change(startDateInput, { target: { value: '2023-10-01' } });
        fireEvent.change(endDateInput, { target: { value: '2023-10-31' } });

        fireEvent.click(searchBtn);

        expect(mockOnSearch).toHaveBeenCalledWith({
            searchQuery: '김철수',
            startDate: '2023-10-01',
            endDate: '2023-10-31',
        });
    });

    it('초기값이 주어지면 입력 필드에 반영되어야 한다', () => {
        render(
            <OrderSearchFilter
                initialSearchQuery="아이유"
                initialStartDate="2023-11-01"
                initialEndDate="2023-11-30"
                onSearch={mockOnSearch}
            />
        );

        expect(screen.getByPlaceholderText('주문번호 또는 고객명 통합검색')).toHaveValue('아이유');
        expect(screen.getByLabelText('시작일')).toHaveValue('2023-11-01');
        expect(screen.getByLabelText('종료일')).toHaveValue('2023-11-30');
    });
});

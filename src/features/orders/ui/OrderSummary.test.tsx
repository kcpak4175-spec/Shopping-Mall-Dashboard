import { render, screen } from '@testing-library/react';
import OrderSummary from './OrderSummary';

describe('OrderSummary', () => {
    it('전달받은 숫자로 요약 문구를 올바르게 렌더링한다', () => {
        render(<OrderSummary todayActionRequired={15} />);

        expect(screen.getByText(/오늘 처리해야 할 주문:/)).toBeInTheDocument();
        expect(screen.getByText(/15건/)).toBeInTheDocument();
    });

    it('0건일 경우에도 올바르게 렌더링된다', () => {
        render(<OrderSummary todayActionRequired={0} />);

        expect(screen.getByText(/0건/)).toBeInTheDocument();
    });
});

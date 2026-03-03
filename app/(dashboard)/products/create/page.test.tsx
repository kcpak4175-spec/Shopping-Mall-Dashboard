import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCreatePage from './page';
import * as actions from './actions';

jest.mock('./actions', () => ({
    createProductAction: jest.fn(),
    generateDescAction: jest.fn(),
    recommendTagsAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

/** jsdom의 type="number" 인풋에 특정 숫자 값을 설정하는 헬퍼 */
const setNumberInputValue = (input: HTMLInputElement, value: number) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'valueAsNumber')
        ?.set?.call(input, value);
    fireEvent.change(input, { target: { value: String(value) } });
};

describe('ProductCreatePage Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the page and forms', () => {
        render(<ProductCreatePage />);
        expect(screen.getByRole('heading', { level: 1, name: '상품 등록' })).toBeInTheDocument();
    });

    it('handles successful product creation', async () => {
        const user = userEvent.setup();
        (actions.createProductAction as jest.Mock).mockResolvedValue({ success: true, product: { id: 'test' } });

        render(<ProductCreatePage />);

        await user.type(screen.getByLabelText(/상품명/), '가방');
        await user.click(screen.getByRole('button', { name: '저장' }));

        await waitFor(() => {
            expect(actions.createProductAction).toHaveBeenCalledWith(expect.objectContaining({ name: '가방' }));
        });
    });

    it('handles product creation failure', async () => {
        const user = userEvent.setup();
        (actions.createProductAction as jest.Mock).mockResolvedValue({ success: false, error: '서버 에러 발생' });
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(<ProductCreatePage />);

        await user.type(screen.getByLabelText(/상품명/), '잘못된 가방');
        await user.click(screen.getByRole('button', { name: '저장' }));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('서버 에러 발생');
        });

        alertMock.mockRestore();
    });

    it('shows validation errors when submitting empty form', async () => {
        const user = userEvent.setup();
        render(<ProductCreatePage />);

        await user.click(screen.getByRole('button', { name: '저장' }));

        await waitFor(() => {
            expect(screen.getByText('상품명을 입력해주세요.')).toBeInTheDocument();
        });

        expect(actions.createProductAction).not.toHaveBeenCalled();
    });

    it('shows validation error for negative price', async () => {
        const user = userEvent.setup();
        render(<ProductCreatePage />);

        await user.type(screen.getByLabelText(/상품명/), '테스트 상품');
        setNumberInputValue(screen.getByLabelText(/가격/) as HTMLInputElement, -500);

        await user.click(screen.getByRole('button', { name: '저장' }));

        await waitFor(() => {
            expect(screen.getByText('가격은 0원 이상이어야 합니다.')).toBeInTheDocument();
        });

        expect(actions.createProductAction).not.toHaveBeenCalled();
    });
});

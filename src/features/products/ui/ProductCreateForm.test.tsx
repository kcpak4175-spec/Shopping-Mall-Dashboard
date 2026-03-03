import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCreateForm from './ProductCreateForm';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        back: jest.fn(),
    })),
}));

describe('ProductCreateForm', () => {
    let mockOnSubmit: jest.Mock;
    let mockOnUploadImage: jest.Mock;
    let mockOnGenerateDesc: jest.Mock;
    let mockOnRecommendTags: jest.Mock;

    beforeEach(() => {
        mockOnSubmit = jest.fn().mockResolvedValue(true);
        mockOnUploadImage = jest.fn().mockResolvedValue({ success: true, url: 'https://storage.example.com/image.png' });
        mockOnGenerateDesc = jest.fn().mockResolvedValue('AI generated description');
        mockOnRecommendTags = jest.fn().mockResolvedValue(['tag1', 'tag2']);
        window.URL.createObjectURL = jest.fn().mockReturnValue('blob:mock-url');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderForm = () =>
        render(
            <ProductCreateForm
                onSubmit={mockOnSubmit}
                onUploadImage={mockOnUploadImage}
                onGenerateDesc={mockOnGenerateDesc}
                onRecommendTags={mockOnRecommendTags}
            />
        );

    /** jsdom의 type="number" 인풋에 특정 숫자 값을 설정하는 헬퍼 */
    const setNumberInputValue = (input: HTMLInputElement, value: number) => {
        // jsdom에서는 valueAsNumber를 직접 설정해야 음수 등이 올바르게 반영된다
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'valueAsNumber')
            ?.set?.call(input, value);
        fireEvent.change(input, { target: { value: String(value) } });
    };

    it('폼 요소들이 올바르게 렌더링된다', () => {
        renderForm();

        expect(screen.getByRole('heading', { level: 1, name: '상품 등록' })).toBeInTheDocument();
        expect(screen.getByLabelText(/상품명/)).toBeInTheDocument();
        expect(screen.getByLabelText(/상품 설명/)).toBeInTheDocument();
        expect(screen.getByLabelText(/카테고리/)).toBeInTheDocument();
        expect(screen.getByLabelText(/가격/)).toBeInTheDocument();
        expect(screen.getByLabelText(/재고 수량/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
    });

    it('유효한 데이터로 폼을 제출하면 onSubmit이 호출된다', async () => {
        const user = userEvent.setup();
        renderForm();

        await user.type(screen.getByLabelText(/상품명/), '테스트 상품');
        await user.type(screen.getByLabelText(/상품 설명/), '설명입니다.');
        await user.selectOptions(screen.getByLabelText(/카테고리/), '전자제품');

        setNumberInputValue(screen.getByLabelText(/가격/) as HTMLInputElement, 10000);
        setNumberInputValue(screen.getByLabelText(/재고 수량/) as HTMLInputElement, 50);

        await user.click(screen.getByRole('button', { name: '저장' }));

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
                name: '테스트 상품',
                category: '전자제품',
                price: 10000,
                stock: 50,
            }));
        });
    });

    describe('폼 검증 에러 표시', () => {
        it('상품명이 비어있을 때 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            renderForm();

            await user.click(screen.getByRole('button', { name: '저장' }));

            await waitFor(() => {
                expect(screen.getByText('상품명을 입력해주세요.')).toBeInTheDocument();
            });

            expect(mockOnSubmit).not.toHaveBeenCalled();
        });

        it('가격이 음수일 때 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            renderForm();

            await user.type(screen.getByLabelText(/상품명/), '테스트 상품');
            setNumberInputValue(screen.getByLabelText(/가격/) as HTMLInputElement, -100);

            await user.click(screen.getByRole('button', { name: '저장' }));

            await waitFor(() => {
                expect(screen.getByText('가격은 0원 이상이어야 합니다.')).toBeInTheDocument();
            });

            expect(mockOnSubmit).not.toHaveBeenCalled();
        });

        it('재고가 음수일 때 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            renderForm();

            await user.type(screen.getByLabelText(/상품명/), '테스트 상품');
            setNumberInputValue(screen.getByLabelText(/재고 수량/) as HTMLInputElement, -5);

            await user.click(screen.getByRole('button', { name: '저장' }));

            await waitFor(() => {
                expect(screen.getByText('재고는 0 이상이어야 합니다.')).toBeInTheDocument();
            });

            expect(mockOnSubmit).not.toHaveBeenCalled();
        });

        it('유효한 데이터 제출 시 에러 메시지가 표시되지 않는다', async () => {
            const user = userEvent.setup();
            renderForm();

            await user.type(screen.getByLabelText(/상품명/), '좋은 상품');
            setNumberInputValue(screen.getByLabelText(/가격/) as HTMLInputElement, 5000);
            setNumberInputValue(screen.getByLabelText(/재고 수량/) as HTMLInputElement, 10);

            await user.click(screen.getByRole('button', { name: '저장' }));

            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalled();
            });

            expect(screen.queryByText('상품명을 입력해주세요.')).not.toBeInTheDocument();
            expect(screen.queryByText('가격은 0원 이상이어야 합니다.')).not.toBeInTheDocument();
            expect(screen.queryByText('재고는 0 이상이어야 합니다.')).not.toBeInTheDocument();
        });

        it('여러 필드에 동시에 에러 메시지가 표시된다', async () => {
            const user = userEvent.setup();
            renderForm();

            setNumberInputValue(screen.getByLabelText(/가격/) as HTMLInputElement, -1);
            setNumberInputValue(screen.getByLabelText(/재고 수량/) as HTMLInputElement, -1);

            await user.click(screen.getByRole('button', { name: '저장' }));

            await waitFor(() => {
                expect(screen.getByText('상품명을 입력해주세요.')).toBeInTheDocument();
                expect(screen.getByText('가격은 0원 이상이어야 합니다.')).toBeInTheDocument();
                expect(screen.getByText('재고는 0 이상이어야 합니다.')).toBeInTheDocument();
            });
        });
    });

    it('AI 설명 생성 시 상품명이 없으면 경고한다', async () => {
        const user = userEvent.setup();
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
        renderForm();

        await user.click(screen.getByRole('button', { name: /AI로 상품 설명 생성/ }));
        expect(alertMock).toHaveBeenCalledWith('상품명을 먼저 입력해주세요.');
        alertMock.mockRestore();
    });

    it('AI 설명 생성 성공 시 텍스트 영역에 채워진다', async () => {
        const user = userEvent.setup();
        renderForm();

        await user.type(screen.getByLabelText(/상품명/), '테스트 상품');
        await user.click(screen.getByRole('button', { name: /AI로 상품 설명 생성/ }));

        await waitFor(() => {
            expect(mockOnGenerateDesc).toHaveBeenCalledWith('테스트 상품', '전체');
            expect(screen.getByLabelText(/상품 설명/)).toHaveValue('AI generated description');
        });
    });
});

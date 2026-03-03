import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoreInfoForm } from './StoreInfoForm';
import { StoreSettings } from '../domain/StoreSettings';

const mockStore: StoreSettings = {
    storeName: '기본 스토어명',
    logoUrl: 'https://example.com/logo.png',
    currency: 'KRW',
    isTaxIncluded: true,
};

describe('StoreInfoForm Component', () => {
    it('스토어 정보가 화면에 올바르게 렌더링된다', () => {
        const handleChange = jest.fn();
        render(<StoreInfoForm data={mockStore} onChange={handleChange} />);

        // 스토어명 입력 필드
        const nameInput = screen.getByLabelText('스토어명') as HTMLInputElement;
        expect(nameInput.value).toBe('기본 스토어명');

        // 통화 선택
        const currencySelect = screen.getByLabelText('통화') as HTMLSelectElement;
        expect(currencySelect.value).toBe('KRW');

        // 세금 포함 토글 (체크박스 형태로 가정)
        const taxToggle = screen.getByLabelText('세금 포함가격') as HTMLInputElement;
        expect(taxToggle.checked).toBe(true);
    });

    it('사용자가 스토어명을 변경하면 onChange가 호출된다', () => {
        const handleChange = jest.fn();
        render(<StoreInfoForm data={mockStore} onChange={handleChange} />);

        const nameInput = screen.getByLabelText('스토어명');
        fireEvent.change(nameInput, { target: { value: '변경된 스토어명' } });

        expect(handleChange).toHaveBeenCalledWith({
            ...mockStore,
            storeName: '변경된 스토어명',
        });
    });
});

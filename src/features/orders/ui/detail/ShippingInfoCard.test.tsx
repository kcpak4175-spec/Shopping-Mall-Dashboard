import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShippingInfoCard from './ShippingInfoCard';

describe('ShippingInfoCard', () => {
    const mockShipping = {
        recipientName: '홍길동',
        phone: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로 123',
        memo: '문 앞'
    };

    it('renders recipient information', () => {
        render(<ShippingInfoCard shipping={mockShipping} onRegisterWaybill={jest.fn()} />);

        expect(screen.getByText('배송 정보')).toBeInTheDocument();
        expect(screen.getByText('홍길동')).toBeInTheDocument();
        expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
        expect(screen.getByText('서울특별시 강남구 테헤란로 123')).toBeInTheDocument();
        expect(screen.getByText('문 앞')).toBeInTheDocument();
    });

    it('submits waybill information correctly', () => {
        const handleRegister = jest.fn();
        render(<ShippingInfoCard shipping={mockShipping} onRegisterWaybill={handleRegister} />);

        const courierSelect = screen.getByRole('combobox');
        const waybillInput = screen.getByPlaceholderText('운송장 번호 입력');
        const registerButton = screen.getByRole('button', { name: '등록' });

        fireEvent.change(courierSelect, { target: { value: 'CJ대한통운' } });
        fireEvent.change(waybillInput, { target: { value: '1234567890' } });
        fireEvent.click(registerButton);

        expect(handleRegister).toHaveBeenCalledWith('CJ대한통운', '1234567890');
    });
});

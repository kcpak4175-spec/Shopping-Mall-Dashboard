import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderDetailActions from './OrderDetailActions';

describe('OrderDetailActions', () => {
    it('renders cancel button and status change controls', () => {
        render(
            <OrderDetailActions
                currentStatus="paid"
                onCancel={jest.fn()}
                onStatusChange={jest.fn()}
            />
        );

        expect(screen.getByRole('button', { name: '주문 취소' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('calls onCancel when cancel button is clicked', () => {
        const onCancel = jest.fn();
        render(
            <OrderDetailActions
                currentStatus="paid"
                onCancel={onCancel}
                onStatusChange={jest.fn()}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: '주문 취소' }));
        expect(onCancel).toHaveBeenCalled();
    });

    it('calls onStatusChange with selected status when save is clicked', () => {
        const onStatusChange = jest.fn();
        render(
            <OrderDetailActions
                currentStatus="paid"
                onCancel={jest.fn()}
                onStatusChange={onStatusChange}
            />
        );

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'preparing' } });
        fireEvent.click(screen.getByRole('button', { name: '저장' }));
        expect(onStatusChange).toHaveBeenCalledWith('preparing');
    });
});

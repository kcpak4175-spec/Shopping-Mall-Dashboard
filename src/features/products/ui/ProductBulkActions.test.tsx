import { render, screen, fireEvent } from '@testing-library/react';
import ProductBulkActions from './ProductBulkActions';

describe('ProductBulkActions', () => {
    it('renders correctly with selected count', () => {
        render(
            <ProductBulkActions
                selectedCount={3}
                onBulkUpdateCategory={jest.fn()}
                onBulkDelete={jest.fn()}
            />
        );

        expect(screen.getByText(/선택된 항목:\s*3개/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '일괄수정' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '일괄삭제' })).toBeInTheDocument();
    });

    it('calls onBulkDelete when delete button is clicked', () => {
        const handleBulkDelete = jest.fn();
        render(
            <ProductBulkActions
                selectedCount={2}
                onBulkUpdateCategory={jest.fn()}
                onBulkDelete={handleBulkDelete}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: '일괄삭제' }));
        expect(handleBulkDelete).toHaveBeenCalled();
    });

    it('is disabled when selectedCount is 0', () => {
        render(
            <ProductBulkActions
                selectedCount={0}
                onBulkUpdateCategory={jest.fn()}
                onBulkDelete={jest.fn()}
            />
        );

        expect(screen.getByRole('button', { name: '일괄수정' })).toBeDisabled();
        expect(screen.getByRole('button', { name: '일괄삭제' })).toBeDisabled();
    });
});

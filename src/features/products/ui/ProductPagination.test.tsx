import { render, screen, fireEvent } from '@testing-library/react';
import ProductPagination from './ProductPagination';

describe('ProductPagination', () => {
    it('renders correctly', () => {
        const handlePageChange = jest.fn();
        render(
            <ProductPagination
                currentPage={3}
                totalPages={5}
                onPageChange={handlePageChange}
            />
        );

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls onPageChange when a page number is clicked', () => {
        const handlePageChange = jest.fn();
        render(
            <ProductPagination
                currentPage={1}
                totalPages={5}
                onPageChange={handlePageChange}
            />
        );

        fireEvent.click(screen.getByText('2'));
        expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when next/prev buttons are clicked', () => {
        const handlePageChange = jest.fn();
        render(
            <ProductPagination
                currentPage={3}
                totalPages={5}
                onPageChange={handlePageChange}
            />
        );

        fireEvent.click(screen.getByText('이전'));
        expect(handlePageChange).toHaveBeenCalledWith(2);

        fireEvent.click(screen.getByText('다음'));
        expect(handlePageChange).toHaveBeenCalledWith(4);
    });
});

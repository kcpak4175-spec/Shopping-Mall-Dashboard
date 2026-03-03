import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductSearchFilter from './ProductSearchFilter';

describe('ProductSearchFilter', () => {
    it('renders search input and dropdowns', () => {
        const handleSearch = jest.fn();
        const handleCategoryChange = jest.fn();
        const handleStatusChange = jest.fn();

        render(
            <ProductSearchFilter
                searchQuery=""
                category="전체"
                status="전체"
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
                onStatusChange={handleStatusChange}
            />
        );

        expect(screen.getByPlaceholderText('상품명 검색')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: /카테고리/i })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: /상태/i })).toBeInTheDocument();
    });

    it('calls onSearch when typing in the search input', async () => {
        const handleSearch = jest.fn();

        render(
            <ProductSearchFilter
                searchQuery=""
                category="전체"
                status="전체"
                onSearch={handleSearch}
                onCategoryChange={jest.fn()}
                onStatusChange={jest.fn()}
            />
        );

        const input = screen.getByPlaceholderText('상품명 검색');
        fireEvent.change(input, { target: { value: '테스트' } });

        expect(handleSearch).toHaveBeenCalledWith('테스트');
    });

    it('calls onCategoryChange when category is changed', async () => {
        const handleCategoryChange = jest.fn();

        render(
            <ProductSearchFilter
                searchQuery=""
                category="전체"
                status="전체"
                onSearch={jest.fn()}
                onCategoryChange={handleCategoryChange}
                onStatusChange={jest.fn()}
            />
        );

        const categorySelect = screen.getByRole('combobox', { name: /카테고리/i });
        await userEvent.selectOptions(categorySelect, '전자제품');

        expect(handleCategoryChange).toHaveBeenCalledWith('전자제품');
    });

    it('calls onStatusChange when status is changed', async () => {
        const handleStatusChange = jest.fn();

        render(
            <ProductSearchFilter
                searchQuery=""
                category="전체"
                status="전체"
                onSearch={jest.fn()}
                onCategoryChange={jest.fn()}
                onStatusChange={handleStatusChange}
            />
        );

        const statusSelect = screen.getByRole('combobox', { name: /상태/i });
        await userEvent.selectOptions(statusSelect, '품절');

        expect(handleStatusChange).toHaveBeenCalledWith('품절');
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import ProductListTable from './ProductListTable';
import { Product } from '../domain/Product';

const mockProducts: Product[] = [
    {
        id: 'prod-1',
        name: '정상 상품',
        category: '전자제품',
        price: 15000,
        stock: 50,
        status: '정상',
        imageUrl: '/test1.png',
        createdAt: '2026-03-03T00:00:00Z',
    },
    {
        id: 'prod-2',
        name: '부족 상품',
        category: '의류',
        price: 20000,
        stock: 5,
        status: '부족',
        imageUrl: '/test2.png',
        createdAt: '2026-03-03T00:00:00Z',
    },
];

describe('ProductListTable', () => {
    it('renders products correctly', () => {
        render(
            <ProductListTable
                products={mockProducts}
                selectedIds={[]}
                onSelectProduct={jest.fn()}
                onSelectAll={jest.fn()}
                onEditProduct={jest.fn()}
                onDeleteProduct={jest.fn()}
            />
        );

        expect(screen.getByText('정상 상품')).toBeInTheDocument();
        expect(screen.getByText('부족 상품')).toBeInTheDocument();
    });

    it('renders low stock products with red text', () => {
        render(
            <ProductListTable
                products={mockProducts}
                selectedIds={[]}
                onSelectProduct={jest.fn()}
                onSelectAll={jest.fn()}
                onEditProduct={jest.fn()}
                onDeleteProduct={jest.fn()}
            />
        );

        const outOfStockElement = screen.getByText('부족');
        expect(outOfStockElement).toHaveClass('text-red-500');
    });

    it('calls onSelectProduct when checkbox is clicked', () => {
        const handleSelectProduct = jest.fn();
        render(
            <ProductListTable
                products={mockProducts}
                selectedIds={[]}
                onSelectProduct={handleSelectProduct}
                onSelectAll={jest.fn()}
                onEditProduct={jest.fn()}
                onDeleteProduct={jest.fn()}
            />
        );

        const checkboxes = screen.getAllByRole('checkbox');
        // First checkbox is "Select All"
        fireEvent.click(checkboxes[1]);
        expect(handleSelectProduct).toHaveBeenCalledWith('prod-1');
    });

    it('calls onSelectAll when "Select All" checkbox is clicked', () => {
        const handleSelectAll = jest.fn();

        // First test: select all
        const { rerender } = render(
            <ProductListTable
                products={mockProducts}
                selectedIds={[]}
                onSelectProduct={jest.fn()}
                onSelectAll={handleSelectAll}
                onEditProduct={jest.fn()}
                onDeleteProduct={jest.fn()}
            />
        );

        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);
        expect(handleSelectAll).toHaveBeenCalledWith(true);

        // Second test: deselect all
        handleSelectAll.mockClear();
        rerender(
            <ProductListTable
                products={mockProducts}
                selectedIds={['prod-1', 'prod-2']}
                onSelectProduct={jest.fn()}
                onSelectAll={handleSelectAll}
                onEditProduct={jest.fn()}
                onDeleteProduct={jest.fn()}
            />
        );
        fireEvent.click(screen.getAllByRole('checkbox')[0]);
        expect(handleSelectAll).toHaveBeenCalledWith(false);
    });
});

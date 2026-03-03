import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerSearchSort } from './CustomerSearchSort';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe('CustomerSearchSort', () => {
    const mockReplace = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
        (usePathname as jest.Mock).mockReturnValue('/customers');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        jest.clearAllMocks();
    });

    it('should render search input and sort dropdown', () => {
        render(<CustomerSearchSort />);
        expect(screen.getByPlaceholderText('이름 또는 이메일 검색')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should update query params on search', () => {
        render(<CustomerSearchSort />);
        const input = screen.getByPlaceholderText('이름 또는 이메일 검색');
        fireEvent.change(input, { target: { value: 'gildong' } });

        expect(mockReplace).toHaveBeenCalledWith('/customers?query=gildong&page=1');
    });

    it('should update sortBy param on sort change', () => {
        render(<CustomerSearchSort />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'totalSpent' } });

        expect(mockReplace).toHaveBeenCalledWith('/customers?sortBy=totalSpent');
    });
});

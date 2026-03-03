import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerFooter } from './CustomerFooter';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CustomerStats } from '../domain/Customer';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

const mockStats: CustomerStats = {
    totalCustomers: 1234,
    newCustomersThisMonth: 56,
    vipCustomers: 23,
};

describe('CustomerFooter', () => {
    const mockReplace = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
        (usePathname as jest.Mock).mockReturnValue('/customers');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        jest.clearAllMocks();
    });

    it('should render customer statistics', () => {
        render(<CustomerFooter stats={mockStats} currentPage={1} totalPages={5} />);
        expect(screen.getByText(/총 1,234명/)).toBeInTheDocument();
        expect(screen.getByText(/이번달 신규 56명/)).toBeInTheDocument();
        expect(screen.getByText(/VIP 23명/)).toBeInTheDocument();
    });

    it('should render pagination controls', () => {
        render(<CustomerFooter stats={mockStats} currentPage={2} totalPages={5} />);
        expect(screen.getByRole('button', { name: '이전' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });

    it('should navigate to next page on next button click', () => {
        render(<CustomerFooter stats={mockStats} currentPage={2} totalPages={5} />);
        fireEvent.click(screen.getByRole('button', { name: '다음' }));
        expect(mockReplace).toHaveBeenCalledWith('/customers?page=3');
    });

    it('should navigate to previous page on prev button click', () => {
        render(<CustomerFooter stats={mockStats} currentPage={2} totalPages={5} />);
        fireEvent.click(screen.getByRole('button', { name: '이전' }));
        expect(mockReplace).toHaveBeenCalledWith('/customers?page=1');
    });

    it('should disable previous button on first page', () => {
        render(<CustomerFooter stats={mockStats} currentPage={1} totalPages={5} />);
        expect(screen.getByRole('button', { name: '이전' })).toBeDisabled();
    });

    it('should disable next button on last page', () => {
        render(<CustomerFooter stats={mockStats} currentPage={5} totalPages={5} />);
        expect(screen.getByRole('button', { name: '다음' })).toBeDisabled();
    });
});

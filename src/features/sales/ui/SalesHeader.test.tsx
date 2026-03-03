import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SalesHeader } from './SalesHeader';

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
}));

describe('SalesHeader', () => {
    it('should render the title correctly', () => {
        render(<SalesHeader currentPeriod="week" />);
        expect(screen.getByText('매출 분석')).toBeInTheDocument();
    });

    it('should have a dropdown with week, month, quarter options', () => {
        render(<SalesHeader currentPeriod="week" />);
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();

        expect(screen.getByRole('option', { name: '이번 주' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: '이번 달' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: '이번 분기' })).toBeInTheDocument();
    });

    it('should have an export button', () => {
        render(<SalesHeader currentPeriod="week" />);
        expect(screen.getByRole('button', { name: /내보내기/ })).toBeInTheDocument();
    });
});

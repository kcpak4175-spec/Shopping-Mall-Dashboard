import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

// mock next/link since it is not fully supported in testing environment easily
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('Sidebar Component', () => {
    it('renders all navigation links properly', () => {
        render(<Sidebar />);

        // Check for the dashboard logo or title
        expect(screen.getByText('Mall Admin')).toBeInTheDocument();

        // Check for all required menu items
        const menuItems = ['대시보드', '상품관리', '주문관리', '고객관리', '분석', '설정'];
        menuItems.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });

        // Check link targets
        expect(screen.getByText('대시보드').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('상품관리').closest('a')).toHaveAttribute('href', '/products');
        expect(screen.getByText('주문관리').closest('a')).toHaveAttribute('href', '/orders');
    });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerInfoCard from './CustomerInfoCard';

describe('CustomerInfoCard', () => {
    const mockBuyer = {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong@example.com'
    };

    it('displays customer name, phone, and email', () => {
        render(<CustomerInfoCard buyer={mockBuyer} />);

        expect(screen.getByText('고객 정보')).toBeInTheDocument();
        expect(screen.getByText('이름')).toBeInTheDocument();
        expect(screen.getByText('연락처')).toBeInTheDocument();
        expect(screen.getByText('이메일')).toBeInTheDocument();

        expect(screen.getByText('홍길동')).toBeInTheDocument();
        expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
        expect(screen.getByText('hong@example.com')).toBeInTheDocument();
    });
});

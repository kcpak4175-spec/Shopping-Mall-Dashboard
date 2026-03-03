import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileCard } from './ProfileCard';
import { CustomerSummaryCard } from './CustomerSummaryCard';
import { OrderHistoryCard } from './OrderHistoryCard';
import { FavoriteCategoriesChart } from './FavoriteCategoriesChart';
import { CustomerDetail } from '../domain/Customer';

const mockCustomer: CustomerDetail = {
    id: '1',
    name: '김철수',
    email: 'chulsoo@example.com',
    phone: '010-1234-5678',
    orderCount: 15,
    totalSpent: 4500000,
    averageOrder: 300000,
    isVip: true,
    createdAt: '2022-01-15T10:00:00Z',
    orderHistory: [
        { id: 'ORD-001', productSummary: 'iPhone 15 Pro 외 1건', amount: 1550000, status: '배송완료', date: '2023-10-25T10:00:00Z' },
        { id: 'ORD-002', productSummary: 'AirPods Pro 2', amount: 359000, status: '결제완료', date: '2023-10-28T14:30:00Z' }
    ],
    favoriteCategories: [
        { name: '전자기기', percentage: 80 },
        { name: '의류', percentage: 15 },
        { name: '기타', percentage: 5 }
    ]
};

describe('Customer Detail UI Components', () => {

    describe('ProfileCard', () => {
        it('should render customer profile information properly', () => {
            render(<ProfileCard customer={mockCustomer} />);
            expect(screen.getByText('김철수')).toBeInTheDocument();
            expect(screen.getByText('chulsoo@example.com')).toBeInTheDocument();
            expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
            // 가입일 포맷팅 테스트는 구현에 따라 다를 수 있으나 대략 연도 포함 여부 확인
            expect(screen.getByText(/2022/)).toBeInTheDocument();
        });
    });

    describe('CustomerSummaryCard', () => {
        it('should render total orders, total spent, average order, and VIP status', () => {
            render(<CustomerSummaryCard customer={mockCustomer} />);
            expect(screen.getByText(/15/)).toBeInTheDocument(); // 총 주문
            expect(screen.getByText(/4,500,000/)).toBeInTheDocument(); // 총 구매액
            expect(screen.getByText(/300,000/)).toBeInTheDocument(); // 평균 주문
            expect(screen.getByText(/VIP/)).toBeInTheDocument(); // 등급
        });
    });

    describe('OrderHistoryCard', () => {
        it('should render a table of recent orders', () => {
            render(<OrderHistoryCard history={mockCustomer.orderHistory} />);
            expect(screen.getByText('주문번호')).toBeInTheDocument();
            expect(screen.getByText('ORD-001')).toBeInTheDocument();
            expect(screen.getByText('iPhone 15 Pro 외 1건')).toBeInTheDocument();
            expect(screen.getByText(/1,550,000/)).toBeInTheDocument();
            expect(screen.getByText('배송완료')).toBeInTheDocument();
        });
    });

    describe('FavoriteCategoriesChart', () => {
        it('should render category names and percentage', () => {
            render(<FavoriteCategoriesChart categories={mockCustomer.favoriteCategories} />);
            expect(screen.getByText('전자기기')).toBeInTheDocument();
            expect(screen.getByText('80%')).toBeInTheDocument();
            expect(screen.getByText('의류')).toBeInTheDocument();
            expect(screen.getByText('15%')).toBeInTheDocument();
        });
    });

});

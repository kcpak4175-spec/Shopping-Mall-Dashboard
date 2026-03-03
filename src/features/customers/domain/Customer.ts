export interface Customer {
    id: string;
    name: string;
    email: string;
    orderCount: number;
    totalSpent: number;
    isVip: boolean;
    createdAt: string; // ISO string
}

export interface CustomerStats {
    totalCustomers: number;
    newCustomersThisMonth: number;
    vipCustomers: number;
}

export interface OrderHistory {
    id: string;
    productSummary: string;
    amount: number;
    status: '결제완료' | '배송중' | '배송완료' | '취소/환불';
    date: string; // ISO string
}

export interface FavoriteCategory {
    name: string;
    percentage: number;
}

export interface CustomerDetail extends Customer {
    phone: string;
    averageOrder: number;
    orderHistory: OrderHistory[];
    favoriteCategories: FavoriteCategory[];
}

export interface CustomerRepository {
    getCustomerList(params: {
        query?: string;
        sortBy?: 'createdAt' | 'totalSpent';
        page?: number;
        limit?: number;
    }): Promise<{ data: Customer[]; total: number }>;

    getCustomerStats(): Promise<CustomerStats>;

    getCustomerDetail(id: string): Promise<CustomerDetail>;
}

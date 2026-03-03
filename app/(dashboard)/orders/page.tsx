import React from 'react';
import { MockOrderRepository } from '@/features/orders/infra/MockOrderRepository';
import { getOrderList } from '@/features/orders/application/getOrderList';
import { getOrderStats } from '@/features/orders/application/getOrderStats';
import { OrderStatus } from '@/features/orders/domain/Order';
import OrdersClient from '@/features/orders/ui/OrdersClient';
import OrderTable from '@/features/orders/ui/OrderTable';
import OrderSummary from '@/features/orders/ui/OrderSummary';

// Next.js 15+ searchParams
interface OrdersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
    const params = await searchParams;

    const repo = new MockOrderRepository();
    const filter = {
        status: params.status as OrderStatus | undefined,
        searchQuery: params.q,
        startDate: params.start,
        endDate: params.end
    };

    const orders = await getOrderList(repo, filter);
    const stats = await getOrderStats(repo);
    const currentTab = params.status ? (params.status as OrderStatus) : 'all';

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">주문 관리</h1>

            <OrdersClient
                stats={stats}
                currentTab={currentTab}
                initialSearchQuery={params.q}
                initialStartDate={params.start}
                initialEndDate={params.end}
            />

            <OrderTable orders={orders} />

            <OrderSummary todayActionRequired={stats.todayActionRequired} />
        </div>
    );
}

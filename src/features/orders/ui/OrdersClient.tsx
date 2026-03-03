'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { OrderStats } from '../domain/OrderRepository';
import { OrderStatus } from '../domain/Order';
import OrderTabs from './OrderTabs';
import OrderSearchFilter from './OrderSearchFilter';

interface OrdersClientProps {
    stats: OrderStats;
    currentTab: OrderStatus | 'all';
    initialSearchQuery?: string;
    initialStartDate?: string;
    initialEndDate?: string;
}

const OrdersClient: React.FC<OrdersClientProps> = ({
    stats,
    currentTab,
    initialSearchQuery,
    initialStartDate,
    initialEndDate,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateFilters = (updates: Record<string, string | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <OrderTabs
                stats={stats}
                currentTab={currentTab}
                onTabChange={(tab) => updateFilters({ status: tab === 'all' ? undefined : tab })}
            />
            <OrderSearchFilter
                initialSearchQuery={initialSearchQuery}
                initialStartDate={initialStartDate}
                initialEndDate={initialEndDate}
                onSearch={({ searchQuery, startDate, endDate }) =>
                    updateFilters({ q: searchQuery, start: startDate, end: endDate })
                }
            />
        </>
    );
};

export default OrdersClient;

import React from 'react';
import { OrderStats } from '../domain/OrderRepository';
import { OrderStatus } from '../domain/Order';

interface OrderTabsProps {
    stats: OrderStats;
    currentTab: OrderStatus | 'all';
    onTabChange: (tab: OrderStatus | 'all') => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ stats, currentTab, onTabChange }) => {
    const tabs: { value: OrderStatus | 'all'; label: string; count: number }[] = [
        { value: 'all', label: '전체', count: stats.total },
        { value: 'pending', label: '결제대기', count: stats.pending },
        { value: 'paid', label: '결제완료', count: stats.paid },
        { value: 'shipping', label: '배송중', count: stats.shipping },
        { value: 'delivered', label: '배송완료', count: stats.delivered },
    ];

    return (
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
            {tabs.map((tab) => {
                const isActive = currentTab === tab.value;
                return (
                    <button
                        key={tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${isActive
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        {tab.label}({tab.count})
                    </button>
                );
            })}
        </div>
    );
};

export default OrderTabs;

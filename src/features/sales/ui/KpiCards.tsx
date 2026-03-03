import { SalesKpi } from '../domain/Sales';
import { DollarSign, ShoppingCart, CreditCard, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiCardsProps {
    kpi: SalesKpi;
}

export function KpiCards({ kpi }: KpiCardsProps) {
    const cards = [
        {
            title: '총 매출',
            value: `${kpi.totalRevenue.toLocaleString()} 원`,
            change: kpi.revenueChangeRate,
            icon: <DollarSign className="w-6 h-6 text-blue-500" />
        },
        {
            title: '주문 수',
            value: `${kpi.orderCount.toLocaleString()} 건`,
            change: kpi.orderCountChangeRate,
            icon: <ShoppingCart className="w-6 h-6 text-emerald-500" />
        },
        {
            title: '객단가',
            value: `${kpi.averageOrderValue.toLocaleString()} 원`,
            change: kpi.averageOrderValueChangeRate,
            icon: <CreditCard className="w-6 h-6 text-amber-500" />
        },
        {
            title: '전환율',
            value: `${kpi.conversionRate}%`,
            change: kpi.conversionRateChangeRate,
            icon: <Activity className="w-6 h-6 text-purple-500" />
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</h3>
                        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            {card.icon}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{card.value}</span>
                        <div className={`flex items-center text-sm font-medium ${card.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {card.change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                            <span>{card.change > 0 ? '+' : ''}{card.change}%</span>
                            <span className="text-gray-400 font-normal ml-2">전월 대비</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

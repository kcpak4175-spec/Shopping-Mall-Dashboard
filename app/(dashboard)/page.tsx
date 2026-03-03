import { getDashboardData } from '../../src/features/dashboard/application/getDashboardData';
import { MockDashboardRepository } from '../../src/features/dashboard/infra/MockDashboardRepository';

import MetricCard from '../../src/features/dashboard/ui/MetricCard';
import WeeklySalesChart from '../../src/features/dashboard/ui/WeeklySalesChart';
import CategorySalesChart from '../../src/features/dashboard/ui/CategorySalesChart';
import RecentOrdersTable from '../../src/features/dashboard/ui/RecentOrdersTable';

import { DollarSign, ShoppingCart, Users, AlertTriangle } from 'lucide-react';

export default async function DashboardPage() {
    const repository = new MockDashboardRepository();
    const data = await getDashboardData(repository);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h2>

            {/* 상단 4개 지표 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="오늘 매출"
                    value={data.summary.todaySales.value}
                    change={data.summary.todaySales.change}
                    valueFormat="currency"
                    icon={DollarSign}
                />
                <MetricCard
                    title="신규 주문"
                    value={data.summary.newOrders.value}
                    change={data.summary.newOrders.change}
                    icon={ShoppingCart}
                />
                <MetricCard
                    title="신규 고객"
                    value={data.summary.newCustomers.value}
                    change={data.summary.newCustomers.change}
                    icon={Users}
                />
                <MetricCard
                    title="재고 부족 상품"
                    value={data.summary.lowStockItems}
                    isWarning={true}
                    icon={AlertTriangle}
                />
            </div>

            {/* 개요 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WeeklySalesChart data={data.weeklySales} />
                </div>
                <div className="lg:col-span-1">
                    <CategorySalesChart data={data.categorySales} />
                </div>
            </div>

            {/* 최근 주문 테이블 */}
            <RecentOrdersTable orders={data.recentOrders} />
        </div>
    );
}

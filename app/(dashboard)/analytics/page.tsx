import { Suspense } from 'react';
import { SalesHeader } from '@/features/sales/ui/SalesHeader';
import { KpiCards } from '@/features/sales/ui/KpiCards';
import { DailySalesChart } from '@/features/sales/ui/DailySalesChart';
import { BestsellerList } from '@/features/sales/ui/BestsellerList';
import { RegionalSalesChart } from '@/features/sales/ui/RegionalSalesChart';
import { AiInsightCard } from '@/features/sales/ui/AiInsightCard';
import { getSalesDashboardData } from '@/features/sales/application/getSalesDashboardData';
import { MockSalesRepository } from '@/features/sales/infra/MockSalesRepository';

export const metadata = {
    title: '매출 분석 - Mall Dashboard',
};

// Data fetching component
export async function DashboardContent({ period }: { period: 'week' | 'month' | 'quarter' }) {
    // We use MockSalesRepository for now as per the requirements
    const repository = new MockSalesRepository();
    const data = await getSalesDashboardData(repository, period);

    return (
        <>
            <KpiCards kpi={data.kpi} />

            <div className="mb-6">
                <DailySalesChart data={data.dailySales} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-4">
                    <BestsellerList data={data.bestsellers} />
                </div>
                <div className="lg:col-span-8">
                    <RegionalSalesChart data={data.regionalSales} />
                </div>
            </div>

            <div className="mb-6">
                <AiInsightCard insights={data.insights} />
            </div>
        </>
    );
}

// Fallback loading component
function DashboardContentSkeleton() {
    return (
        <div className="animate-pulse flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                ))}
            </div>
            <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 h-96 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                <div className="lg:col-span-8 h-96 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </div>
        </div>
    );
}

export default async function SalesAnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams;
    const p = resolvedParams?.period;
    const period = (p === 'month' || p === 'quarter') ? p : 'week';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SalesHeader currentPeriod={period} />
            <Suspense key={period} fallback={<DashboardContentSkeleton />}>
                <DashboardContent period={period} />
            </Suspense>
        </div>
    );
}

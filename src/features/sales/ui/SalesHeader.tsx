'use client';

import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';

interface SalesHeaderProps {
    currentPeriod: 'week' | 'month' | 'quarter';
}

export function SalesHeader({ currentPeriod }: SalesHeaderProps) {
    const router = useRouter();

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const period = e.target.value;
        router.push(`?period=${period}`);
    };

    const handleExport = () => {
        alert('데이터 내보내기를 시작합니다.');
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">매출 분석</h1>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                    value={currentPeriod}
                    onChange={handlePeriodChange}
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="week">이번 주</option>
                    <option value="month">이번 달</option>
                    <option value="quarter">이번 분기</option>
                </select>

                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm transition-colors text-sm font-medium"
                >
                    <Download size={16} />
                    내보내기
                </button>
            </div>
        </div>
    );
}

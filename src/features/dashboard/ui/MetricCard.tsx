import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: number;
    change?: number;
    valueFormat?: 'number' | 'currency';
    isWarning?: boolean;
    icon: LucideIcon;
}

export default function MetricCard({
    title,
    value,
    change,
    valueFormat = 'number',
    isWarning = false,
    icon: Icon,
}: MetricCardProps) {
    const formattedValue =
        valueFormat === 'currency'
            ? new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value)
            : new Intl.NumberFormat('ko-KR').format(value);

    return (
        <div className={`p-6 bg-white rounded-xl border shadow-sm flex flex-col ${isWarning ? 'border-red-200 bg-red-50/20' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <div className={`p-2 rounded-lg ${isWarning ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-gray-900">{formattedValue}</span>
                {change !== undefined && (
                    <div className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span>{change > 0 ? '+' : ''}{change.toFixed(1)}%</span>
                        <span className="ml-1 text-gray-400 font-normal">전일 대비</span>
                    </div>
                )}
            </div>
        </div>
    );
}

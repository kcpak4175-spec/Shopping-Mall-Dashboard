'use client';

import { WeeklySales } from '../domain/types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface WeeklySalesChartProps {
    data: WeeklySales[];
}

export default function WeeklySalesChart({ data }: WeeklySalesChartProps) {
    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6">주간 매출 추이</h3>
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${value / 10000}만`}
                        />
                        <Tooltip
                            formatter={(value: any) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value)}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

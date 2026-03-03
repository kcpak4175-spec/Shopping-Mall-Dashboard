'use client';

import { CategorySales } from '../domain/types';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface CategorySalesChartProps {
    data: CategorySales[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function CategorySalesChart({ data }: CategorySalesChartProps) {
    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6">카테고리별 판매 비율</h3>
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="ratio"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number | undefined) => `${value ?? 0}%`} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

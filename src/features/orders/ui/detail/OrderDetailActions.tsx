'use client';

import * as React from 'react';
import { useState } from 'react';
import { OrderStatus, getOrderStatusLabel } from '../../domain/Order';

interface Props {
    currentStatus: OrderStatus;
    onCancel: () => void;
    onStatusChange: (status: OrderStatus) => void;
}

const statusOptions: OrderStatus[] = ['pending', 'paid', 'preparing', 'shipping', 'delivered'];

export default function OrderDetailActions({ currentStatus, onCancel, onStatusChange }: Props) {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus);

    const handleSave = () => {
        onStatusChange(selectedStatus);
    };

    return (
        <div className="flex justify-between items-center mt-6">
            <button
                onClick={onCancel}
                className="px-6 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
                주문 취소
            </button>

            <div className="flex items-center gap-3">
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                    className="border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                    {statusOptions.map(s => (
                        <option key={s} value={s}>{getOrderStatusLabel(s)}</option>
                    ))}
                </select>
                <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                    저장
                </button>
            </div>
        </div>
    );
}

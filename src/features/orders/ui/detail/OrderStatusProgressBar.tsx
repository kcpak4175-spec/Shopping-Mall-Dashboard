import * as React from 'react';
import { OrderStatus, getOrderStatusLabel } from '../../domain/Order';

interface Props {
    currentStatus: OrderStatus;
}

const statusOrder: OrderStatus[] = ['pending', 'paid', 'preparing', 'shipping', 'delivered'];

export default function OrderStatusProgressBar({ currentStatus }: Props) {
    const currentIndex = statusOrder.indexOf(currentStatus);

    return (
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto py-6">
            {statusOrder.map((status, index) => {
                const isActive = index <= currentIndex;
                const isLast = index === statusOrder.length - 1;

                return (
                    <div key={status} className="flex-1 flex flex-col items-center relative" data-testid={`step-${status}`} data-active={isActive}>
                        {/* Connecting Line */}
                        {!isLast && (
                            <div
                                className={`absolute top-4 left-1/2 w-full h-1 -z-10 transition-colors duration-300 ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            />
                        )}

                        {/* Dot */}
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'
                                }`}
                        >
                            {index + 1}
                        </div>

                        {/* Label */}
                        <div className={`mt-2 text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                            {getOrderStatusLabel(status)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

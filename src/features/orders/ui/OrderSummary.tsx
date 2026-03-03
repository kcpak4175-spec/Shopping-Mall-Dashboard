import React from 'react';

interface OrderSummaryProps {
    todayActionRequired: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ todayActionRequired }) => {
    return (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-blue-900">
                    오늘 처리해야 할 주문: <strong className="text-blue-700">{todayActionRequired}건</strong>
                </span>
            </div>
        </div>
    );
};

export default OrderSummary;

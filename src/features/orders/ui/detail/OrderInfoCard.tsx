import * as React from 'react';

interface Props {
    orderDate: string;
    paymentDate?: string;
    paymentMethod: string;
}

function formatDate(isoString: string): string {
    const d = new Date(isoString);
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth() + 1;
    const date = d.getUTCDate();
    const hours = d.getUTCHours();
    const minutes = d.getUTCMinutes().toString().padStart(2, '0');
    return `${year}. ${month}. ${date}. ${hours}:${minutes}`;
}

export default function OrderInfoCard({ orderDate, paymentDate, paymentMethod }: Props) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">주문 정보</h2>

            <dl className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                    <dt className="text-gray-500">주문일시</dt>
                    <dd className="font-medium text-gray-900">{formatDate(orderDate)}</dd>
                </div>

                {paymentDate && (
                    <div className="flex justify-between">
                        <dt className="text-gray-500">결제일시</dt>
                        <dd className="font-medium text-gray-900">{formatDate(paymentDate)}</dd>
                    </div>
                )}

                <div className="flex justify-between">
                    <dt className="text-gray-500">결제수단</dt>
                    <dd className="font-medium text-gray-900">{paymentMethod}</dd>
                </div>
            </dl>
        </div>
    );
}

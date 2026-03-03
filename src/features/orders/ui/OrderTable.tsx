import React from 'react';
import Link from 'next/link';
import { Order, OrderStatus, getOrderStatusLabel } from '../domain/Order';

interface OrderTableProps {
    orders: Order[];
}

const statusColorMap: Record<OrderStatus, { bg: string; text: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    paid: { bg: 'bg-blue-100', text: 'text-blue-800' },
    preparing: { bg: 'bg-orange-100', text: 'text-orange-800' },
    shipping: { bg: 'bg-purple-100', text: 'text-purple-800' },
    delivered: { bg: 'bg-green-100', text: 'text-green-800' },
};

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
    return (
        <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문번호</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객명</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상품요약</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">결제금액</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문상태</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문일시</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">상세보기</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                검색 결과가 없습니다.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Link href={`/orders/${order.id}`} className="hover:underline hover:text-blue-600">
                                        {order.id}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productSummary}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.totalAmount.toLocaleString()}원
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorMap[order.status].bg} ${statusColorMap[order.status].text}`}>
                                        {getOrderStatusLabel(order.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(order.orderDate).toLocaleString('ko-KR')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-900">
                                        상세보기
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;

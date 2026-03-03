import Link from 'next/link';
import { Order } from '../domain/types';

interface RecentOrdersTableProps {
    orders: Order[];
}

const statusMap = {
    PENDING: { label: '결제대기', color: 'bg-yellow-100 text-yellow-800' },
    SHIPPING: { label: '배송중', color: 'bg-blue-100 text-blue-800' },
    DELIVERED: { label: '배송완료', color: 'bg-green-100 text-green-800' },
    CANCELLED: { label: '주문취소', color: 'bg-red-100 text-red-800' },
};

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">최근 주문 목록</h3>
                <Link href="/orders" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    전체 보기
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">주문번호</th>
                            <th scope="col" className="px-6 py-3">고객명</th>
                            <th scope="col" className="px-6 py-3">상품</th>
                            <th scope="col" className="px-6 py-3">금액</th>
                            <th scope="col" className="px-6 py-3">상태</th>
                            <th scope="col" className="px-6 py-3">시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const status = statusMap[order.status];
                            return (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4">{order.customerName}</td>
                                    <td className="px-6 py-4">{order.productName}</td>
                                    <td className="px-6 py-4">
                                        {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(order.amount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{order.createdAt}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

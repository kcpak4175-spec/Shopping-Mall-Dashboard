import React from 'react';
import { OrderHistory } from '../domain/Customer';

interface Props {
    history: OrderHistory[];
}

export const OrderHistoryCard: React.FC<Props> = ({ history }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">주문 히스토리</h3>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 text-slate-500 text-sm">
                            <th className="py-3 px-4 font-medium">주문번호</th>
                            <th className="py-3 px-4 font-medium">상품요약</th>
                            <th className="py-3 px-4 font-medium">금액</th>
                            <th className="py-3 px-4 font-medium">상태</th>
                            <th className="py-3 px-4 font-medium">날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((order) => (
                            <tr key={order.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                <td className="py-4 px-4 text-slate-800 font-medium">{order.id}</td>
                                <td className="py-4 px-4 text-slate-600">{order.productSummary}</td>
                                <td className="py-4 px-4 text-slate-800 font-medium">₩{order.amount.toLocaleString()}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${order.status === '결제완료' ? 'bg-blue-100 text-blue-700' :
                                            order.status === '배송중' ? 'bg-purple-100 text-purple-700' :
                                                order.status === '배송완료' ? 'bg-emerald-100 text-emerald-700' :
                                                    'bg-rose-100 text-rose-700'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-slate-500 text-sm">
                                    {new Date(order.date).toLocaleDateString('ko-KR')}
                                </td>
                            </tr>
                        ))}
                        {history.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-500">
                                    주문 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

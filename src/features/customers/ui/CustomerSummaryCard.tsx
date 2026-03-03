import React from 'react';
import { CustomerDetail } from '../domain/Customer';

interface Props {
    customer: CustomerDetail;
}

export const CustomerSummaryCard: React.FC<Props> = ({ customer }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-6">고객 요약</h3>

            <div className="grid gap-6">
                <div className="flex justify-between items-center">
                    <span className="text-slate-500">총 주문</span>
                    <span className="text-xl font-bold text-slate-800">{customer.orderCount} 건</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-500">총 구매액</span>
                    <span className="text-xl font-bold text-slate-800">₩{customer.totalSpent.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-500">평균 주문</span>
                    <span className="text-xl font-bold text-slate-800">₩{customer.averageOrder.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-500">등급</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${customer.isVip ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                        {customer.isVip ? '★ VIP' : '일반'}
                    </span>
                </div>
            </div>
        </div>
    );
};

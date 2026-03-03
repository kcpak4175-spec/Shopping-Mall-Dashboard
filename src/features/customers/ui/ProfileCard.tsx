import React from 'react';
import { CustomerDetail } from '../domain/Customer';

interface Props {
    customer: CustomerDetail;
}

export const ProfileCard: React.FC<Props> = ({ customer }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4">
                {customer.name.substring(0, 1)}
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{customer.name}</h2>
            <p className="text-slate-500 mb-4">{customer.email}</p>

            <div className="w-full space-y-3 mt-2">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">전화번호</span>
                    <span className="text-slate-800 font-medium">{customer.phone}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 text-sm">가입일</span>
                    <span className="text-slate-800 font-medium">
                        {new Date(customer.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                </div>
            </div>
        </div>
    );
};

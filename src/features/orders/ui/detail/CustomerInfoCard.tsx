import * as React from 'react';
import { BuyerInfo } from '../../domain/Order';

interface Props {
    buyer: BuyerInfo;
}

export default function CustomerInfoCard({ buyer }: Props) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">고객 정보</h2>

            <dl className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                    <dt className="text-gray-500">이름</dt>
                    <dd className="font-medium text-gray-900">{buyer.name}</dd>
                </div>

                <div className="flex justify-between">
                    <dt className="text-gray-500">연락처</dt>
                    <dd className="font-medium text-gray-900">{buyer.phone}</dd>
                </div>

                <div className="flex justify-between">
                    <dt className="text-gray-500">이메일</dt>
                    <dd className="font-medium text-gray-900">{buyer.email}</dd>
                </div>
            </dl>
        </div>
    );
}

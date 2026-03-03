import * as React from 'react';
import { useState } from 'react';
import { ShippingInfo } from '../../domain/Order';

interface Props {
    shipping: ShippingInfo;
    onRegisterWaybill: (courier: string, waybillNumber: string) => void;
}

const couriers = [
    'CJ대한통운',
    '롯데택배',
    '우체국택배',
    '로젠택배',
    '한진택배',
];

export default function ShippingInfoCard({ shipping, onRegisterWaybill }: Props) {
    const [courier, setCourier] = useState(shipping.courier || '');
    const [waybill, setWaybill] = useState(shipping.waybillNumber || '');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (courier && waybill) {
            onRegisterWaybill(courier, waybill);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6">
            <h2 className="text-lg font-bold text-gray-900 p-6 border-b border-gray-100">배송 정보</h2>

            <div className="p-6">
                <dl className="space-y-4 text-sm text-gray-600 mb-6">
                    <div className="flex justify-between">
                        <dt className="text-gray-500 whitespace-nowrap mr-4">받는 분</dt>
                        <dd className="font-medium text-gray-900 text-right">{shipping.recipientName}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-500 whitespace-nowrap mr-4">연락처</dt>
                        <dd className="font-medium text-gray-900 text-right">{shipping.phone}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-500 whitespace-nowrap mr-4">주소</dt>
                        <dd className="font-medium text-gray-900 text-right">{shipping.address}</dd>
                    </div>
                    {shipping.memo && (
                        <div className="flex justify-between">
                            <dt className="text-gray-500 whitespace-nowrap mr-4">배송메모</dt>
                            <dd className="font-medium text-gray-900 text-right">{shipping.memo}</dd>
                        </div>
                    )}
                </dl>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">운송장 등록</h3>
                    <form onSubmit={handleRegister} className="flex gap-2">
                        <select
                            value={courier}
                            onChange={(e) => setCourier(e.target.value)}
                            className="w-1/3 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">택배사 선택</option>
                            {couriers.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input
                            type="text"
                            value={waybill}
                            onChange={(e) => setWaybill(e.target.value)}
                            placeholder="운송장 번호 입력"
                            className="flex-1 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            등록
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

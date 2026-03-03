'use client';

import * as React from 'react';
import { useState } from 'react';
import { OrderDetail, OrderStatus, getOrderStatusLabel } from '../../domain/Order';
import OrderStatusProgressBar from './OrderStatusProgressBar';
import OrderInfoCard from './OrderInfoCard';
import CustomerInfoCard from './CustomerInfoCard';
import OrderProductList from './OrderProductList';
import ShippingInfoCard from './ShippingInfoCard';
import OrderDetailActions from './OrderDetailActions';
import Link from 'next/link';

interface Props {
    order: OrderDetail;
}

export default function OrderDetailClient({ order }: Props) {
    const [currentOrder, setCurrentOrder] = useState<OrderDetail>(order);

    const handleStatusChange = async (status: OrderStatus) => {
        // TODO: 실제 API 호출
        setCurrentOrder(prev => ({ ...prev, status }));
        alert(`주문 상태가 '${getOrderStatusLabel(status)}'(으)로 변경되었습니다.`);
    };

    const handleCancel = async () => {
        if (confirm('주문을 취소하시겠습니까?')) {
            // TODO: 실제 API 호출
            alert('주문이 취소되었습니다.');
        }
    };

    const handleRegisterWaybill = async (courier: string, waybillNumber: string) => {
        // TODO: 실제 API 호출
        setCurrentOrder(prev => ({
            ...prev,
            shipping: {
                ...prev.shipping,
                courier,
                waybillNumber
            }
        }));
        alert(`운송장이 등록되었습니다. (${courier}: ${waybillNumber})`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* 상단 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                        <Link href="/orders" className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            주문 목록
                        </Link>
                        <span>/</span>
                        <span>주문 번호 #{currentOrder.id}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            주문 번호 #{currentOrder.id}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span>📅 {new Date(currentOrder.orderDate).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${currentOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                currentOrder.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                                    currentOrder.status === 'preparing' ? 'bg-purple-100 text-purple-800' :
                                        currentOrder.status === 'shipping' ? 'bg-orange-100 text-orange-800' :
                                            'bg-green-100 text-green-800'
                            }`}>
                            {getOrderStatusLabel(currentOrder.status)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        송장 인쇄
                    </button>
                    <button
                        onClick={() => handleStatusChange(currentOrder.status === 'pending' ? 'paid' : currentOrder.status === 'paid' ? 'preparing' : currentOrder.status === 'preparing' ? 'shipping' : 'delivered')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        상태 변경
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </div>

            {/* 주문 상품 + 고객 정보 2열 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 왼쪽 메인 영역 (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 주문 상품 정보 */}
                    <OrderProductList
                        products={currentOrder.products}
                        paymentSummary={currentOrder.paymentSummary}
                    />
                </div>

                {/* 오른쪽 사이드 영역 (1/3) */}
                <div className="space-y-6">
                    {/* 고객 정보 */}
                    <CustomerInfoCard buyer={currentOrder.buyer} />

                    {/* 주소 상세 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">주소 상세</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-blue-600 font-medium mb-1">배송지 주소</p>
                                <p className="text-sm font-medium text-gray-900">{currentOrder.shipping.recipientName}</p>
                                <p className="text-sm text-gray-600 mt-1">{currentOrder.shipping.address}</p>
                            </div>
                            {currentOrder.shipping.memo && (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 mb-1">배송 메모</p>
                                    <p className="text-sm text-gray-700">{currentOrder.shipping.memo}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 배송 정보 카드 (운송장 입력 포함) */}
            <ShippingInfoCard
                shipping={currentOrder.shipping}
                onRegisterWaybill={handleRegisterWaybill}
            />

            {/* 하단 액션 버튼 */}
            <OrderDetailActions
                currentStatus={currentOrder.status}
                onCancel={handleCancel}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}

import * as React from 'react';
import Image from 'next/image';
import { OrderProduct } from '../../domain/Order';

interface Props {
    products: OrderProduct[];
    paymentSummary: {
        productTotal: number;
        shippingFee: number;
        totalAmount: number;
    };
}

export default function OrderProductList({ products, paymentSummary }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <h2 className="text-lg font-bold text-gray-900 p-6 border-b border-gray-100">주문 상품 정보</h2>

            <ul className="divide-y divide-gray-100">
                {products.map(product => (
                    <li key={product.id} className="p-6 flex items-center gap-4">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                            <div className="mt-1 text-sm text-gray-500">
                                {product.price.toLocaleString()}원 <span className="mx-1">·</span> {product.quantity}개
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 font-bold text-gray-900">
                            {product.subtotal.toLocaleString()}원
                        </div>
                    </li>
                ))}
            </ul>

            <div className="bg-gray-50 p-6 border-t border-gray-100">
                <dl className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <dt className="text-gray-600">상품 합계</dt>
                        <dd className="font-medium text-gray-900">{paymentSummary.productTotal.toLocaleString()}원</dd>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <dt className="text-gray-600">배송비</dt>
                        <dd className="font-medium text-gray-900">{paymentSummary.shippingFee === 0 ? '무료' : `${paymentSummary.shippingFee.toLocaleString()}원`}</dd>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <dt className="text-base font-bold text-gray-900">총 결제금액</dt>
                        <dd className="text-lg font-bold text-blue-600">{paymentSummary.totalAmount.toLocaleString()}원</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

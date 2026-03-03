export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipping' | 'delivered';

export interface Order {
    id: string; // 주문번호
    customerName: string; // 고객명
    productSummary: string; // 상품요약
    totalAmount: number; // 결제금액
    status: OrderStatus; // 주문상태
    orderDate: string; // 주문일시 (ISO 8601 형식)
}

export function getOrderStatusLabel(status: OrderStatus): string {
    switch (status) {
        case 'pending':
            return '결제대기';
        case 'paid':
            return '결제완료';
        case 'preparing':
            return '상품준비';
        case 'shipping':
            return '배송중';
        case 'delivered':
            return '배송완료';
        default:
            return '알 수 없음';
    }
}

export interface OrderProduct {
    id: string;
    productId: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface ShippingInfo {
    recipientName: string;
    phone: string;
    address: string;
    memo: string;
    courier?: string; // 택배사
    waybillNumber?: string; // 운송장번호
}

export interface BuyerInfo {
    name: string;
    phone: string;
    email: string;
}

export interface OrderDetail extends Order {
    orderNumber?: string;
    paymentDate?: string;
    paymentMethod: string;

    buyer: BuyerInfo;
    shipping: ShippingInfo;
    products: OrderProduct[];

    paymentSummary: {
        productTotal: number;
        shippingFee: number;
        totalAmount: number;
    };
}

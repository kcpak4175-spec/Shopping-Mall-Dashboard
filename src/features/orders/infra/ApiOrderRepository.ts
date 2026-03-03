import { OrderDetail, OrderStatus } from '../domain/Order';
import { OrderRepository, GetOrdersParams, OrderListResult, OrderStats } from '../domain/OrderRepository';

// 임시 모의 데이터
const mockOrderDetail: OrderDetail = {
    id: '1234',
    orderNumber: 'ORD-20231001-0001',
    customerName: '홍길동',
    productSummary: '무소음 마우스 외 1건',
    totalAmount: 43000,
    status: 'paid',
    orderDate: '2023-10-01T14:30:00Z',
    paymentDate: '2023-10-01T14:35:00Z',
    paymentMethod: '신용카드 (현대카드)',
    buyer: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong@example.com'
    },
    shipping: {
        recipientName: '홍길동',
        phone: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로 123, 4층',
        memo: '문 앞에 놓고 가주세요',
    },
    products: [
        {
            id: 'p1',
            productId: 'prod_1',
            name: '무소음 무선 마우스',
            imageUrl: 'https://via.placeholder.com/80?text=Mouse',
            price: 25000,
            quantity: 1,
            subtotal: 25000
        },
        {
            id: 'p2',
            productId: 'prod_2',
            name: '마우스 패드',
            imageUrl: 'https://via.placeholder.com/80?text=Pad',
            price: 15000,
            quantity: 1,
            subtotal: 15000
        }
    ],
    paymentSummary: {
        productTotal: 40000,
        shippingFee: 3000,
        totalAmount: 43000
    }
};

export class ApiOrderRepository implements OrderRepository {
    async getOrders(params: GetOrdersParams): Promise<OrderListResult> {
        // 기존 구현 (여기서는 생략되거나 간단히 Mock 응답을 줍니다)
        return {
            orders: [],
            totalCount: 0,
            totalPages: 1,
            currentPage: 1
        };
    }

    async getOrderStats(): Promise<OrderStats> {
        return {
            pending: 0,
            paid: 0,
            preparing: 0,
            shipping: 0,
            delivered: 0,
            total: 0,
            todayActionRequired: 0
        };
    }

    async getOrderDetail(id: string): Promise<OrderDetail> {
        // 실제로는 fetch(`/api/orders/${id}`) 등을 호출
        if (id === '1234') {
            return { ...mockOrderDetail };
        }
        throw new Error('Order not found');
    }

    async updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
        // 실제로는 DB 업데이트 
        return Promise.resolve();
    }

    async updateWaybill(id: string, courier: string, waybillNumber: string): Promise<void> {
        // 실제로는 DB 업데이트
        return Promise.resolve();
    }

    async cancelOrder(id: string): Promise<void> {
        // 실제로는 DB 업데이트
        return Promise.resolve();
    }
}

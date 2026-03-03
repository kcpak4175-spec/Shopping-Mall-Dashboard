import { Order } from '../domain/Order';
import { OrderFilter, OrderRepository, OrderStats } from '../domain/OrderRepository';

const MOCK_ORDERS: Order[] = [
    { id: 'ORD-20231001-01', customerName: '김철수', productSummary: '나이키 에어포스 외 1건', totalAmount: 150000, status: 'pending', orderDate: '2023-10-01T10:00:00Z' },
    { id: 'ORD-20231001-02', customerName: '이영희', productSummary: '애플 맥북 프로 16인치', totalAmount: 3500000, status: 'paid', orderDate: '2023-10-01T11:30:00Z' },
    { id: 'ORD-20231002-01', customerName: '박지성', productSummary: '아디다스 트레이닝복 세트', totalAmount: 85000, status: 'shipping', orderDate: '2023-10-02T14:20:00Z' },
    { id: 'ORD-20231002-02', customerName: '손흥민', productSummary: '소니 노이즈캔슬링 헤드폰', totalAmount: 450000, status: 'delivered', orderDate: '2023-10-02T16:45:00Z' },
    { id: 'ORD-20231003-01', customerName: '아이유', productSummary: '삼성 갤럭시 워치 6', totalAmount: 320000, status: 'paid', orderDate: '2023-10-03T09:15:00Z' },
    { id: 'ORD-20231003-02', customerName: '유재석', productSummary: 'LG 스탠바이미', totalAmount: 1050000, status: 'shipping', orderDate: '2023-10-03T13:00:00Z' },
    { id: 'ORD-20231004-01', customerName: '강호동', productSummary: '다이슨 에어랩', totalAmount: 700000, status: 'pending', orderDate: '2023-10-04T15:30:00Z' },
    { id: 'ORD-20231004-02', customerName: '신동엽', productSummary: '닌텐도 스위치 OLED', totalAmount: 415000, status: 'paid', orderDate: '2023-10-04T18:20:00Z' },
];

export class MockOrderRepository implements OrderRepository {
    private orders: Order[] = MOCK_ORDERS;

    async getOrders(filter: OrderFilter): Promise<Order[]> {
        let result = this.orders;

        if (filter.status) {
            result = result.filter(order => order.status === filter.status);
        }

        if (filter.searchQuery) {
            const lowerQuery = filter.searchQuery.toLowerCase();
            result = result.filter(order =>
                order.id.toLowerCase().includes(lowerQuery) ||
                order.customerName.toLowerCase().includes(lowerQuery)
            );
        }

        if (filter.startDate) {
            const start = new Date(filter.startDate).getTime();
            result = result.filter(order => new Date(order.orderDate).getTime() >= start);
        }

        if (filter.endDate) {
            const end = new Date(filter.endDate).getTime();
            // 날짜 계산을 위해 endDate의 시간을 23:59:59.999로 설정했다고 가정할 수 있지만, 
            // 간단히 타임스탬프 비교로 처리
            result = result.filter(order => new Date(order.orderDate).getTime() <= end);
        }

        return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }

    async getOrderStats(): Promise<OrderStats> {
        const defaultStats: OrderStats = {
            pending: 0,
            paid: 0,
            preparing: 0,
            shipping: 0,
            delivered: 0,
            total: 0,
            todayActionRequired: 0,
        };

        const stats = this.orders.reduce((acc, order) => {
            acc.total += 1;
            acc[order.status] += 1;
            return acc;
        }, defaultStats);

        // 오늘 처리해야 할 주문은 'paid' (결제완료) 상태로 정의
        stats.todayActionRequired = stats.paid;

        return stats;
    }

    async getOrderDetail(id: string): Promise<any> { throw new Error("Method not implemented."); }
    async updateOrderStatus(id: string, status: any): Promise<void> { throw new Error("Method not implemented."); }
    async updateWaybill(id: string, courier: string, waybillNumber: string): Promise<void> { throw new Error("Method not implemented."); }
    async cancelOrder(id: string): Promise<void> { throw new Error("Method not implemented."); }
}

import { MockOrderRepository } from './MockOrderRepository';
import { OrderFilter } from '../domain/OrderRepository';

describe('MockOrderRepository', () => {
    let repository: MockOrderRepository;

    beforeEach(() => {
        repository = new MockOrderRepository();
    });

    it('기본 조건 없이 모든 주문을 반환한다 (초기 데이터 8개 이상 필요)', async () => {
        const orders = await repository.getOrders({});
        expect(orders.length).toBeGreaterThanOrEqual(8);
    });

    it('상태 필터에 따라 필터링된 주문을 반환한다', async () => {
        const filter: OrderFilter = { status: 'paid' };
        const paidOrders = await repository.getOrders(filter);

        expect(paidOrders.length).toBeGreaterThan(0);
        paidOrders.forEach(order => {
            expect(order.status).toBe('paid');
        });
    });

    it('검색어로 필터링된 주문을 반환한다 (주문번호 또는 고객명)', async () => {
        const allOrders = await repository.getOrders({});
        const firstOrder = allOrders[0];

        // 고객명 검색
        const searchByName = await repository.getOrders({ searchQuery: firstOrder.customerName });
        expect(searchByName.some(o => o.id === firstOrder.id)).toBe(true);

        // 주문번호 검색
        const searchById = await repository.getOrders({ searchQuery: firstOrder.id });
        expect(searchById.some(o => o.id === firstOrder.id)).toBe(true);
    });

    it('주문 통계를 올바르게 반환한다 (paid 수가 todayActionRequired 와 일치)', async () => {
        const stats = await repository.getOrderStats();

        expect(stats.total).toBeGreaterThan(0);
        expect(stats.total).toBe(stats.pending + stats.paid + stats.shipping + stats.delivered);
        expect(stats.todayActionRequired).toBe(stats.paid); // 결제완료 건수가 처리해야할 수
    });
});

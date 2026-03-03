import { getOrderList } from './getOrderList';
import { getOrderStats } from './getOrderStats';
import { MockOrderRepository } from '../infra/MockOrderRepository';
import { OrderRepository } from '../domain/OrderRepository';

describe('Order Application UseCases', () => {
    let repository: OrderRepository;

    beforeEach(() => {
        repository = new MockOrderRepository();
    });

    describe('getOrderList', () => {
        it('필터에 맞는 주문 목록을 반환한다', async () => {
            const orders = await getOrderList(repository, { status: 'paid' });
            expect(orders.length).toBeGreaterThan(0);
            orders.forEach(order => {
                expect(order.status).toBe('paid');
            });
        });

        it('검색어를 적용하여 주문을 필터링한다', async () => {
            const orders = await getOrderList(repository, { searchQuery: '김철수' });
            expect(orders.some(o => o.customerName === '김철수')).toBe(true);
        });
    });

    describe('getOrderStats', () => {
        it('주문 통계 데이터를 정확히 반환한다', async () => {
            const stats = await getOrderStats(repository);
            expect(stats.total).toBeGreaterThan(0);
            expect(stats.todayActionRequired).toBe(stats.paid);
        });
    });
});

import { getOrderStatusLabel } from './Order';

describe('Order Domain', () => {
    it('주문 상태에 따른 올바른 한국어 라벨을 반환한다', () => {
        expect(getOrderStatusLabel('pending')).toBe('결제대기');
        expect(getOrderStatusLabel('paid')).toBe('결제완료');
        expect(getOrderStatusLabel('shipping')).toBe('배송중');
        expect(getOrderStatusLabel('delivered')).toBe('배송완료');
    });

    it('알 수 없는 상태인 경우 "알 수 없음"을 반환한다', () => {
        expect(getOrderStatusLabel('unknown' as any)).toBe('알 수 없음');
    });
});

import { ApiOrderRepository } from './ApiOrderRepository';

describe('ApiOrderRepository Integration', () => {
    let repository: ApiOrderRepository;

    beforeEach(() => {
        repository = new ApiOrderRepository();
    });

    describe('getOrderDetail', () => {
        it('should fetch order detail by id successfully', async () => {
            const orderId = '1234';
            const detail = await repository.getOrderDetail(orderId);

            expect(detail).toBeDefined();
            expect(detail.id).toBe(orderId);
            expect(detail.products).toBeInstanceOf(Array);
            expect(detail.buyer).toBeDefined();
            expect(detail.shipping).toBeDefined();
        });

        it('should throw an error if order not found', async () => {
            await expect(repository.getOrderDetail('non-existent-id')).rejects.toThrow('Order not found');
        });
    });

    describe('updateOrderStatus', () => {
        it('should update order status', async () => {
            await expect(repository.updateOrderStatus('1234', 'preparing')).resolves.not.toThrow();
        });
    });

    describe('updateWaybill', () => {
        it('should update waybill information', async () => {
            await expect(repository.updateWaybill('1234', '대한통운', '1234567890')).resolves.not.toThrow();
        });
    });

    describe('cancelOrder', () => {
        it('should cancel the order', async () => {
            await expect(repository.cancelOrder('1234')).resolves.not.toThrow();
        });
    });
});

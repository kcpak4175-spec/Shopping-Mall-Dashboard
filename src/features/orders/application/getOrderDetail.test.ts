import { getOrderDetail } from './getOrderDetail';
import { ApiOrderRepository } from '../infra/ApiOrderRepository';

// Mock the repository
jest.mock('../infra/ApiOrderRepository');

describe('getOrderDetail use case', () => {
    let repository: jest.Mocked<ApiOrderRepository>;

    beforeEach(() => {
        repository = new ApiOrderRepository() as jest.Mocked<ApiOrderRepository>;
    });

    it('should return order detail when repository returns data', async () => {
        const mockData = {
            id: '1234',
            orderNumber: 'ORD-123',
            customerName: '홍길동',
            productSummary: '상품',
            totalAmount: 1000,
            status: 'paid' as any,
            orderDate: '2023-10-01',
            paymentMethod: '카드',
            buyer: { name: '홍길동', phone: '010', email: 'a@a.com' },
            shipping: { recipientName: '홍길동', phone: '010', address: '주소', memo: '' },
            products: [],
            paymentSummary: { productTotal: 1000, shippingFee: 0, totalAmount: 1000 }
        };

        repository.getOrderDetail.mockResolvedValue(mockData);

        const result = await getOrderDetail('1234', repository);

        expect(repository.getOrderDetail).toHaveBeenCalledWith('1234');
        expect(result).toEqual(mockData);
    });

    it('should throw error when repository fails', async () => {
        repository.getOrderDetail.mockRejectedValue(new Error('Order not found'));

        await expect(getOrderDetail('9999', repository)).rejects.toThrow('Order not found');
    });
});

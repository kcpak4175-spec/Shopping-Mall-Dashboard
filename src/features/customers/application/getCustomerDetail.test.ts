import { getCustomerDetail } from './getCustomerDetail';
import { CustomerRepository } from '../domain/Customer';

describe('getCustomerDetail UseCase', () => {
    let mockRepo: jest.Mocked<CustomerRepository>;

    beforeEach(() => {
        mockRepo = {
            getCustomerList: jest.fn(),
            getCustomerStats: jest.fn(),
            getCustomerDetail: jest.fn(),
        } as unknown as jest.Mocked<CustomerRepository>;
    });

    it('should return customer detail when valid id is provided', async () => {
        const mockDetail = {
            id: '1',
            name: '김철수',
            email: 'test@test.com',
            orderCount: 5,
            totalSpent: 150000,
            isVip: true,
            createdAt: '2023-01-01T00:00:00Z',
            phone: '010-1234-5678',
            averageOrder: 30000,
            orderHistory: [],
            favoriteCategories: []
        };
        mockRepo.getCustomerDetail.mockResolvedValue(mockDetail);

        const result = await getCustomerDetail(mockRepo, '1');

        expect(mockRepo.getCustomerDetail).toHaveBeenCalledWith('1');
        expect(result).toEqual(mockDetail);
    });

    it('should throw error when repository throws error', async () => {
        mockRepo.getCustomerDetail.mockRejectedValue(new Error('Customer not found'));

        await expect(getCustomerDetail(mockRepo, '999')).rejects.toThrow('Customer not found');
    });
});

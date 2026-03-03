import { getCustomerStats } from './getCustomerStats';
import { MockCustomerRepository } from '../infra/MockCustomerRepository';

describe('getCustomerStats Usecase', () => {
    let repo: MockCustomerRepository;

    beforeEach(() => {
        repo = new MockCustomerRepository();
    });

    it('should retrieve customer stats from repository', async () => {
        const result = await getCustomerStats(repo);
        expect(result.totalCustomers).toBeDefined();
        expect(result.newCustomersThisMonth).toBeDefined();
        expect(result.vipCustomers).toBeDefined();
    });

    it('should call repository.getCustomerStats', async () => {
        const spy = jest.spyOn(repo, 'getCustomerStats');
        await getCustomerStats(repo);
        expect(spy).toHaveBeenCalled();
    });
});

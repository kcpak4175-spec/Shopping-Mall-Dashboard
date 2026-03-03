import { getCustomerList } from './getCustomerList';
import { MockCustomerRepository } from '../infra/MockCustomerRepository';

describe('getCustomerList Usecase', () => {
    let repo: MockCustomerRepository;

    beforeEach(() => {
        repo = new MockCustomerRepository();
    });

    it('should retrieve a list of customers via repository', async () => {
        const result = await getCustomerList(repo, {});
        expect(result.data).toBeDefined();
        expect(result.total).toBeGreaterThan(0);
    });

    it('should pass query and sorting parameters to repository', async () => {
        const spy = jest.spyOn(repo, 'getCustomerList');
        await getCustomerList(repo, { query: 'test', sortBy: 'totalSpent', page: 2, limit: 5 });
        expect(spy).toHaveBeenCalledWith({ query: 'test', sortBy: 'totalSpent', page: 2, limit: 5 });
    });
});

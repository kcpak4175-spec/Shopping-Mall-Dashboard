import { MockCustomerRepository } from './MockCustomerRepository';

describe('MockCustomerRepository', () => {
    let repo: MockCustomerRepository;

    beforeEach(() => {
        repo = new MockCustomerRepository();
    });

    describe('getCustomerList', () => {
        it('should return a list of customers with total count', async () => {
            const result = await repo.getCustomerList({});
            expect(result.data).toBeDefined();
            expect(Array.isArray(result.data)).toBe(true);
            expect(typeof result.total).toBe('number');
        });

        it('should filter customers by name or email when query is provided', async () => {
            const result = await repo.getCustomerList({ query: 'gildong' });
            const allMatch = result.data.every(
                (c) => c.name.toLowerCase().includes('gildong') || c.email.toLowerCase().includes('gildong')
            );
            expect(allMatch).toBe(true);
            expect(result.data.length).toBeGreaterThan(0); // Assuming mock data contains 'gildong'
        });

        it('should sort customers by totalSpent descending', async () => {
            const result = await repo.getCustomerList({ sortBy: 'totalSpent' });
            if (result.data.length >= 2) {
                expect(result.data[0].totalSpent).toBeGreaterThanOrEqual(result.data[1].totalSpent);
            }
        });

        it('should sort customers by createdAt descending', async () => {
            const result = await repo.getCustomerList({ sortBy: 'createdAt' });
            if (result.data.length >= 2) {
                const time1 = new Date(result.data[0].createdAt).getTime();
                const time2 = new Date(result.data[1].createdAt).getTime();
                expect(time1).toBeGreaterThanOrEqual(time2);
            }
        });

        it('should paginate results properly', async () => {
            const result = await repo.getCustomerList({ page: 1, limit: 3 });
            expect(result.data.length).toBeLessThanOrEqual(3);
        });
    });

    describe('getCustomerStats', () => {
        it('should return customer statistics', async () => {
            const stats = await repo.getCustomerStats();
            expect(stats.totalCustomers).toBeDefined();
            expect(stats.newCustomersThisMonth).toBeDefined();
            expect(stats.vipCustomers).toBeDefined();
        });
    });

    describe('getCustomerDetail', () => {
        it('should return a customer detail when a valid ID is provided', async () => {
            const detail = await repo.getCustomerDetail('1');
            expect(detail).toBeDefined();
            expect(detail.id).toBe('1');
            expect(detail.phone).toBeDefined();
            expect(detail.favoriteCategories).toBeDefined();
            expect(Array.isArray(detail.orderHistory)).toBe(true);
        });

        it('should throw an error when an invalid ID is provided', async () => {
            await expect(repo.getCustomerDetail('999')).rejects.toThrow('Customer not found');
        });
    });
});


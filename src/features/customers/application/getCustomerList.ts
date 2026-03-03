import { CustomerRepository } from '../domain/Customer';

export async function getCustomerList(
    repository: CustomerRepository,
    params: {
        query?: string;
        sortBy?: 'createdAt' | 'totalSpent';
        page?: number;
        limit?: number;
    }
) {
    return repository.getCustomerList(params);
}

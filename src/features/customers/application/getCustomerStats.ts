import { CustomerRepository } from '../domain/Customer';

export async function getCustomerStats(repository: CustomerRepository) {
    return repository.getCustomerStats();
}

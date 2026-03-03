import { CustomerRepository, CustomerDetail } from '../domain/Customer';

export const getCustomerDetail = async (repo: CustomerRepository, id: string): Promise<CustomerDetail> => {
    return repo.getCustomerDetail(id);
};

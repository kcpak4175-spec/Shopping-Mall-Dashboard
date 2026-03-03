import { CustomerSearchSort } from '@/features/customers/ui/CustomerSearchSort';
import { CustomerTable } from '@/features/customers/ui/CustomerTable';
import { CustomerFooter } from '@/features/customers/ui/CustomerFooter';
import { getCustomerList } from '@/features/customers/application/getCustomerList';
import { getCustomerStats } from '@/features/customers/application/getCustomerStats';
import { MockCustomerRepository } from '@/features/customers/infra/MockCustomerRepository';
import { CustomerRepository } from '@/features/customers/domain/Customer';

const repo: CustomerRepository = new MockCustomerRepository();

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const query = typeof params.query === 'string' ? params.query : undefined;
    const sortBy = params.sortBy === 'totalSpent' ? 'totalSpent' : 'createdAt';
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const limit = 6;

    const [{ data: customers, total }, stats] = await Promise.all([
        getCustomerList(repo, { query, sortBy, page, limit }),
        getCustomerStats(repo)
    ]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">고객 관리</h1>
            <CustomerSearchSort />
            <CustomerTable customers={customers} />
            <CustomerFooter stats={stats} currentPage={page} totalPages={totalPages} />
        </div>
    );
}

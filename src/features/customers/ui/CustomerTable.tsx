import { Customer } from '../domain/Customer';

interface Props {
    customers: Customer[];
}

export function CustomerTable({ customers }: Props) {
    if (!customers || customers.length === 0) {
        return <div className="p-8 text-center text-gray-500">고객이 없습니다.</div>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 font-medium text-gray-700">고객명</th>
                        <th className="p-4 font-medium text-gray-700">이메일</th>
                        <th className="p-4 font-medium text-gray-700">주문수</th>
                        <th className="p-4 font-medium text-gray-700">총구매액</th>
                        <th className="p-4 font-medium text-gray-700">가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-1 text-gray-900 font-medium">
                                {customer.name}
                                {customer.isVip && <span className="text-yellow-500 text-sm ml-1">⭐</span>}
                            </td>
                            <td className="p-4 text-gray-600">{customer.email}</td>
                            <td className="p-4 text-gray-600">{customer.orderCount}</td>
                            <td className="p-4 text-gray-600">{customer.totalSpent.toLocaleString()}원</td>
                            <td className="p-4 text-gray-600">
                                {new Date(customer.createdAt).toLocaleDateString('ko-KR')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

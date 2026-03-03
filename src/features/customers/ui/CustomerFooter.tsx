'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { CustomerStats } from '../domain/Customer';

interface Props {
    stats: CustomerStats;
    currentPage: number;
    totalPages: number;
}

export function CustomerFooter({ stats, currentPage, totalPages }: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <div>
                총 {stats.totalCustomers.toLocaleString()}명 | 이번달 신규 {stats.newCustomersThisMonth.toLocaleString()}명 | VIP {stats.vipCustomers.toLocaleString()}명
            </div>

            <div className="flex gap-2 items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1 || isPending}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 bg-white"
                >
                    이전
                </button>
                <span className="px-3 py-1 font-medium">
                    {currentPage} / {totalPages || 1}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || isPending}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 bg-white"
                >
                    다음
                </button>
            </div>
        </div>
    );
}

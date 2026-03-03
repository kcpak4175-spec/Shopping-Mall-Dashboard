'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function CustomerSearchSort() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        params.set('page', '1');

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    const handleSort = (sortBy: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', sortBy);

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <input
                type="text"
                placeholder="이름 또는 이메일 검색"
                className="border p-2 rounded w-64"
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />

            <select
                className="border p-2 rounded w-40 cursor-pointer bg-white"
                defaultValue={searchParams.get('sortBy')?.toString() || 'createdAt'}
                onChange={(e) => handleSort(e.target.value)}
            >
                <option value="createdAt">가입일순</option>
                <option value="totalSpent">구매금액순</option>
            </select>
        </div>
    );
}

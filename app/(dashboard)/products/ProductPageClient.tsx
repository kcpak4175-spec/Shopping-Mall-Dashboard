'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ProductSearchFilter from '@/features/products/ui/ProductSearchFilter';
import ProductListTable from '@/features/products/ui/ProductListTable';
import ProductPagination from '@/features/products/ui/ProductPagination';
import ProductBulkActions from '@/features/products/ui/ProductBulkActions';
import { Product, ProductCategory, ProductStatus } from '@/features/products/domain/Product';

import { bulkDeleteProductsAction, deleteProductAction } from './actions';

interface ProductPageClientProps {
    products: Product[];
    totalPages: number;
    initialSearchQuery: string;
    initialCategory: ProductCategory;
    initialStatus: ProductStatus;
    currentPage: number;
}

export default function ProductPageClient({
    products,
    totalPages,
    initialSearchQuery,
    initialCategory,
    initialStatus,
    currentPage,
}: ProductPageClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // 검색 파라미터 업데이트 함수
    const updateSearchParams = (paramsToUpdate: Record<string, string | number>) => {
        const params = new URLSearchParams(window.location.search);

        // 만약 페이지 번호 변경이 아니라면, 필터 변경 시 무조건 1페이지로 리셋
        if (!('page' in paramsToUpdate)) {
            params.set('page', '1');
        }

        Object.entries(paramsToUpdate).forEach(([key, value]) => {
            if (value) {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSelectProduct = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(products.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <ProductSearchFilter
                searchQuery={initialSearchQuery}
                category={initialCategory}
                status={initialStatus}
                onSearch={(query) => updateSearchParams({ q: query })}
                onCategoryChange={(cat) => updateSearchParams({ category: cat === '전체' ? '' : cat })}
                onStatusChange={(stat) => updateSearchParams({ status: stat === '전체' ? '' : stat })}
            />

            <ProductBulkActions
                selectedCount={selectedIds.length}
                onBulkUpdateCategory={(newCategory) => {
                    // 실제 동작: Server Action 호출하여 업데이트 진행 (추가 구현 필요)
                    alert(`${selectedIds.length}개 상품의 카테고리를 ${newCategory}로 변경합니다.`);
                }}
                onBulkDelete={async () => {
                    if (confirm(`선택된 ${selectedIds.length}개 상품을 일괄 삭제하시겠습니까?`)) {
                        const result = await bulkDeleteProductsAction(selectedIds);
                        if (result.success) {
                            setSelectedIds([]);
                        } else {
                            alert(result.error);
                        }
                    }
                }}
            />

            <ProductListTable
                products={products}
                selectedIds={selectedIds}
                onSelectProduct={handleSelectProduct}
                onSelectAll={handleSelectAll}
                onEditProduct={(p) => router.push(`/products/edit/${p.id}`)}
                onDeleteProduct={async (id) => {
                    if (confirm('정말 삭제하시겠습니까?')) {
                        const result = await deleteProductAction(id);
                        if (!result.success) {
                            alert(result.error);
                        }
                    }
                }}
            />

            {totalPages > 1 && (
                <ProductPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => updateSearchParams({ page })}
                />
            )}
        </div>
    );
}

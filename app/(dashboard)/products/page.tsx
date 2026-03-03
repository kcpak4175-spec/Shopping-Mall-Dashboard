import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ProductPageClient from './ProductPageClient';
import { getProductList } from '@/features/products/application/productUseCases';
import { mockProductRepository } from '@/features/products/infra/MockProductRepository';
import { ProductCategory, ProductStatus } from '@/features/products/domain/Product';

export const metadata: Metadata = {
    title: '상품 관리 | Mall Dashboard',
};

// Next.js App Router Server Component
export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // 실제 DB 변경 시에는 의존성 주입 또는 React cache(의사 IoC) 사용
    // 여기서는 TDD 및 기초 구현 목적으로 MockRepository 사용
    const repository = mockProductRepository;

    const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : '';
    const category = (typeof searchParams.category === 'string' ? searchParams.category : '전체') as ProductCategory;
    const status = (typeof searchParams.status === 'string' ? searchParams.status : '전체') as ProductStatus;
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;

    // 유스케이스를 통해 데이터 가져오기
    const { data: products, totalPages, totalCount } = await getProductList(repository, {
        searchQuery,
        category,
        status,
        page,
        limit: 10,
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
                <Link href="/products/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    상품 등록
                </Link>
            </div>

            <ProductPageClient
                products={products}
                totalPages={totalPages}
                initialSearchQuery={searchQuery}
                initialCategory={category}
                initialStatus={status}
                currentPage={page}
            />
        </div>
    );
}

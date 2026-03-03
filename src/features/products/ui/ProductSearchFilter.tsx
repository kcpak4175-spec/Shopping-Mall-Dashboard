import React from 'react';
import { ProductCategory, ProductStatus } from '../domain/Product';

interface ProductSearchFilterProps {
    searchQuery: string;
    category: ProductCategory;
    status: ProductStatus;
    onSearch: (query: string) => void;
    onCategoryChange: (category: ProductCategory) => void;
    onStatusChange: (status: ProductStatus) => void;
}

const ProductSearchFilter: React.FC<ProductSearchFilterProps> = ({
    searchQuery,
    category,
    status,
    onSearch,
    onCategoryChange,
    onStatusChange,
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <label htmlFor="searchQuery" className="sr-only">상품명 검색</label>
                <input
                    id="searchQuery"
                    type="text"
                    placeholder="상품명 검색"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex gap-4">
                <div>
                    <label htmlFor="categorySelect" className="sr-only">카테고리</label>
                    <select
                        id="categorySelect"
                        aria-label="카테고리"
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value as ProductCategory)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="전체">전체 카테고리</option>
                        <option value="전자제품">전자제품</option>
                        <option value="의류">의류</option>
                        <option value="식품">식품</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="statusSelect" className="sr-only">상태</label>
                    <select
                        id="statusSelect"
                        aria-label="상태"
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value as ProductStatus)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="전체">전체 상태</option>
                        <option value="정상">정상</option>
                        <option value="부족">부족</option>
                        <option value="품절">품절</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductSearchFilter;

import React from 'react';
import Image from 'next/image';
import { Product } from '../domain/Product';

interface ProductListTableProps {
    products: Product[];
    selectedIds: string[];
    onSelectProduct: (id: string) => void;
    onSelectAll: (checked: boolean) => void;
    onEditProduct: (product: Product) => void;
    onDeleteProduct: (id: string) => void;
}

const ProductListTable: React.FC<ProductListTableProps> = ({
    products,
    selectedIds,
    onSelectProduct,
    onSelectAll,
    onEditProduct,
    onDeleteProduct,
}) => {
    const isAllSelected = products.length > 0 && selectedIds.length === products.length;

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 w-12 text-center text-gray-900">
                            <input
                                type="checkbox"
                                aria-label="모두 선택"
                                checked={isAllSelected}
                                onChange={(e) => onSelectAll(e.target.checked)}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                            />
                        </th>
                        <th className="p-4 w-20 text-gray-900">이미지</th>
                        <th className="p-4 text-gray-900">상품명</th>
                        <th className="p-4 text-gray-900">카테고리</th>
                        <th className="p-4 text-gray-900">가격</th>
                        <th className="p-4 text-gray-900">재고</th>
                        <th className="p-4 text-gray-900">상태</th>
                        <th className="p-4 text-gray-900">등록일</th>
                        <th className="p-4 w-24 text-center text-gray-900">관리</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {products.map((product) => {
                        const isSelected = selectedIds.includes(product.id);
                        const isLowStock = product.status === '부족';
                        const isOutOfStock = product.status === '품절';

                        return (
                            <tr
                                key={product.id}
                                onClick={() => onSelectProduct(product.id)}
                                className={`transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <td className="p-4 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        aria-label={`${product.name} 선택`}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            onSelectProduct(product.id);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                            unoptimized // Test compatibility or placeholder ease
                                        />
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-black">{product.name}</td>
                                <td className="p-4 text-gray-500">{product.category}</td>
                                <td className="p-4 font-medium text-black">{product.price.toLocaleString()}원</td>
                                <td className="p-4 text-gray-500">{product.stock}</td>
                                <td className={`p-4 font-medium ${isLowStock || isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                                    {product.status}
                                </td>
                                <td className="p-4 text-gray-500">
                                    {new Date(product.createdAt).toLocaleDateString('ko-KR')}
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEditProduct(product);
                                            }}
                                            className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-bold"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteProduct(product.id);
                                            }}
                                            className="px-2 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 font-bold"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={9} className="p-8 text-center text-gray-500">
                                조회된 상품이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListTable;

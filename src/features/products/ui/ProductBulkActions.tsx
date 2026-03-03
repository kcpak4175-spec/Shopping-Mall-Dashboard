import React, { useState } from 'react';
import { ProductCategory } from '../domain/Product';

interface ProductBulkActionsProps {
    selectedCount: number;
    onBulkUpdateCategory: (category: ProductCategory) => void;
    onBulkDelete: () => void;
}

const ProductBulkActions: React.FC<ProductBulkActionsProps> = ({
    selectedCount,
    onBulkUpdateCategory,
    onBulkDelete,
}) => {
    const [showCategorySelect, setShowCategorySelect] = useState(false);

    const disabled = selectedCount === 0;

    return (
        <div className="flex items-center gap-4 py-4">
            <span className="text-gray-700 font-medium">선택된 항목: {selectedCount}개</span>
            <div className="h-4 w-px bg-gray-300"></div>

            <div className="relative">
                {showCategorySelect ? (
                    <select
                        aria-label="카테고리 일괄변경"
                        onChange={(e) => {
                            const value = e.target.value as ProductCategory;
                            if (value !== '전체') {
                                onBulkUpdateCategory(value);
                                setShowCategorySelect(false);
                            }
                        }}
                        onBlur={() => setShowCategorySelect(false)}
                        className="px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        autoFocus
                    >
                        <option value="전체">카테고리 선택</option>
                        <option value="전자제품">전자제품</option>
                        <option value="의류">의류</option>
                        <option value="식품">식품</option>
                    </select>
                ) : (
                    <button
                        onClick={() => setShowCategorySelect(true)}
                        disabled={disabled}
                        className="px-4 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                    >
                        일괄수정
                    </button>
                )}
            </div>

            <button
                onClick={onBulkDelete}
                disabled={disabled}
                className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                일괄삭제
            </button>
        </div>
    );
};

export default ProductBulkActions;

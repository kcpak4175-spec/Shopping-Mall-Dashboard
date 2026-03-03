'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductCreateForm from '@/features/products/ui/ProductCreateForm';
import { getProductAction, updateProductAction } from './actions';
import { generateDescAction, recommendTagsAction, uploadProductImageAction } from '../../create/actions';
import { CreateProductDto, Product } from '@/features/products/domain/Product';

export default function ProductEditPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const id = params.id as string;

    useEffect(() => {
        async function fetchProduct() {
            const result = await getProductAction(id);
            if (result.success && result.data) {
                setProduct(result.data);
            } else {
                alert(result.error || '상품 정보를 불러오는데 실패했습니다.');
                router.push('/products');
            }
            setLoading(false);
        }
        fetchProduct();
    }, [id, router]);

    const handleUpdate = async (updateData: Omit<CreateProductDto, 'id' | 'createdAt'>) => {
        const result = await updateProductAction(id, updateData);
        if (!result.success) {
            alert(result.error);
            return false;
        }
        return true;
    };

    const handleUploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return await uploadProductImageAction(formData);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">로딩 중...</div>;
    if (!product) return null;

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto mb-6">
                <nav className="flex text-sm text-gray-500 mb-2">
                    <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push('/products')}>상품 관리</span>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium">상품 수정</span>
                </nav>
            </div>

            <ProductCreateForm
                onSubmit={handleUpdate}
                onUploadImage={handleUploadImage}
                onGenerateDesc={generateDescAction}
                onRecommendTags={recommendTagsAction}
                initialValues={{
                    name: product.name,
                    description: product.description || '',
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                }}
                initialImageUrls={product.imageUrls}
            />
        </div>
    );
}

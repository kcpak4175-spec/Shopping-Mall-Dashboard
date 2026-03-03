'use client';

import React from 'react';
import ProductCreateForm from '@/features/products/ui/ProductCreateForm';
import { createProductAction, generateDescAction, recommendTagsAction, uploadProductImageAction } from './actions';
import { CreateProductDto } from '@/features/products/domain/Product';

export default function ProductCreatePage() {

    const handleSubmit = async (data: Omit<CreateProductDto, 'id' | 'createdAt'>) => {
        const result = await createProductAction(data);
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

    return (
        <div className="p-8">
            <ProductCreateForm
                onSubmit={handleSubmit}
                onUploadImage={handleUploadImage}
                onGenerateDesc={generateDescAction}
                onRecommendTags={recommendTagsAction}
            />
        </div>
    );
}


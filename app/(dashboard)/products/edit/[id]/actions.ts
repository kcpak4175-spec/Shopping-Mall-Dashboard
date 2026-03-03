'use server';

import { mockProductRepository } from '@/features/products/infra/MockProductRepository';
import { CreateProductDto } from '@/features/products/domain/Product';
import { revalidatePath } from 'next/cache';

export async function getProductAction(id: string) {
    try {
        const product = await mockProductRepository.getProductById(id);
        if (!product) throw new Error('상품을 찾을 수 없습니다.');
        return { success: true, data: product };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateProductAction(id: string, data: Partial<CreateProductDto>) {
    try {
        await mockProductRepository.updateProduct(id, data);
        revalidatePath('/products');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

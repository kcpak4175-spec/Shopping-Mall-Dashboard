'use server';

import { mockProductRepository } from '@/features/products/infra/MockProductRepository';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(id: string) {
    try {
        await mockProductRepository.deleteProduct(id);
        revalidatePath('/products');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function bulkDeleteProductsAction(ids: string[]) {
    try {
        await mockProductRepository.bulkDeleteProducts(ids);
        revalidatePath('/products');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

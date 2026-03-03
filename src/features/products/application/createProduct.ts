import { CreateProductDto, Product } from '../domain/Product';
import { ProductRepository } from '../domain/ProductRepository';

export interface CreateProductResult {
    success: boolean;
    product?: Product;
    error?: string;
}

export const createProductUseCase = async (
    repository: ProductRepository,
    dto: CreateProductDto
): Promise<CreateProductResult> => {
    try {
        if (!dto.name.trim()) {
            return { success: false, error: '상품명을 입력해주세요.' };
        }

        if (dto.price < 0) {
            return { success: false, error: '가격은 0원 이상이어야 합니다.' };
        }

        if (dto.stock < 0) {
            return { success: false, error: '재고는 0 이상이어야 합니다.' };
        }

        const product = await repository.createProduct(dto);

        return { success: true, product };
    } catch (error: any) {
        return { success: false, error: error.message || '상품 등록 중 오류가 발생했습니다.' };
    }
};

import { ProductCategory } from '../domain/Product';
import { GetProductsParams, PaginatedProducts, ProductRepository } from '../domain/ProductRepository';

export const getProductList = async (
    repository: ProductRepository,
    params: GetProductsParams
): Promise<PaginatedProducts> => {
    return await repository.getProducts(params);
};

export const deleteProductUseCase = async (
    repository: ProductRepository,
    id: string
): Promise<void> => {
    await repository.deleteProduct(id);
};

export const bulkDeleteProductsUseCase = async (
    repository: ProductRepository,
    ids: string[]
): Promise<void> => {
    if (!ids || ids.length === 0) {
        throw new Error('삭제할 상품이 선택되지 않았습니다.');
    }
    await repository.bulkDeleteProducts(ids);
};

export const bulkUpdateCategoryUseCase = async (
    repository: ProductRepository,
    ids: string[],
    newCategory: ProductCategory
): Promise<void> => {
    if (!ids || ids.length === 0) {
        throw new Error('수정할 상품이 선택되지 않았습니다.');
    }
    await repository.bulkUpdateCategory(ids, newCategory);
};

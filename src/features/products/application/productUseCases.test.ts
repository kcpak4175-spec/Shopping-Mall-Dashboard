import { MockProductRepository } from '../infra/MockProductRepository';
import {
    getProductList,
    deleteProductUseCase,
    bulkDeleteProductsUseCase,
    bulkUpdateCategoryUseCase
} from './productUseCases';

describe('Product Use Cases', () => {
    let repository: MockProductRepository;

    beforeEach(() => {
        repository = new MockProductRepository();
    });

    describe('getProductList', () => {
        it('should paginate and return products', async () => {
            const result = await getProductList(repository, { page: 1, limit: 10 });
            expect(result.data.length).toBe(10);
            expect(result.currentPage).toBe(1);
        });

        it('should pass search queries to repository', async () => {
            const result = await getProductList(repository, { searchQuery: '티셔츠' });
            result.data.forEach(p => expect(p.name).toContain('티셔츠'));
        });
    });

    describe('deleteProductUseCase', () => {
        it('should call repository to delete a product', async () => {
            const deleteSpy = jest.spyOn(repository, 'deleteProduct');
            await deleteProductUseCase(repository, 'prod-1');
            expect(deleteSpy).toHaveBeenCalledWith('prod-1');
        });
    });

    describe('bulkDeleteProductsUseCase', () => {
        it('should call repository to delete multiple products', async () => {
            const bulkDeleteSpy = jest.spyOn(repository, 'bulkDeleteProducts');
            const ids = ['prod-1', 'prod-2'];
            await bulkDeleteProductsUseCase(repository, ids);
            expect(bulkDeleteSpy).toHaveBeenCalledWith(ids);
        });
    });

    describe('bulkUpdateCategoryUseCase', () => {
        it('should call repository to update category for multiple products', async () => {
            const bulkUpdateSpy = jest.spyOn(repository, 'bulkUpdateCategory');
            const ids = ['prod-1', 'prod-2'];
            await bulkUpdateCategoryUseCase(repository, ids, '식품');
            expect(bulkUpdateSpy).toHaveBeenCalledWith(ids, '식품');
        });
    });
});

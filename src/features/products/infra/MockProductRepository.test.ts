import { MockProductRepository } from './MockProductRepository';

describe('MockProductRepository', () => {
    let repository: MockProductRepository;

    beforeEach(() => {
        repository = new MockProductRepository();
    });

    describe('getProducts', () => {
        it('should return paginated products default list', async () => {
            const result = await repository.getProducts({ page: 1, limit: 10 });
            expect(result.data).toBeInstanceOf(Array);
            expect(result.data.length).toBeGreaterThan(0);
            expect(result.totalCount).toBeGreaterThan(0);
            expect(result.currentPage).toBe(1);
        });

        it('should filter products by category', async () => {
            const result = await repository.getProducts({ category: '전자제품' });
            result.data.forEach((product) => {
                expect(product.category).toBe('전자제품');
            });
        });

        it('should filter products by search query', async () => {
            const result = await repository.getProducts({ searchQuery: '노트북' });
            result.data.forEach((product) => {
                expect(product.name).toContain('노트북');
            });
        });

        it('should filter products by status', async () => {
            const result = await repository.getProducts({ status: '품절' });
            result.data.forEach((product) => {
                expect(product.status).toBe('품절');
            });
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product by id', async () => {
            const initial = await repository.getProducts({});
            const targetId = initial.data[0].id;

            await repository.deleteProduct(targetId);

            const afterDelete = await repository.getProducts({});
            expect(afterDelete.data.find(p => p.id === targetId)).toBeUndefined();
            expect(afterDelete.totalCount).toBe(initial.totalCount - 1);
        });
    });

    describe('bulkDeleteProducts', () => {
        it('should delete multiple products', async () => {
            const initial = await repository.getProducts({});
            const idsToDelete = [initial.data[0].id, initial.data[1].id];

            await repository.bulkDeleteProducts(idsToDelete);

            const afterDelete = await repository.getProducts({});
            expect(afterDelete.totalCount).toBe(initial.totalCount - 2);
        });
    });

    describe('bulkUpdateCategory', () => {
        it('should update category of multiple products', async () => {
            const initial = await repository.getProducts({});
            const idsToUpdate = [initial.data[0].id, initial.data[1].id];

            await repository.bulkUpdateCategory(idsToUpdate, '의류');

            const afterUpdate = await repository.getProducts({});
            const updatedProducts = afterUpdate.data.filter(p => idsToUpdate.includes(p.id));

            updatedProducts.forEach((product) => {
                expect(product.category).toBe('의류');
            });
        });
    });

    describe('createProduct', () => {
        it('should add a new product to the repository', async () => {
            const initial = await repository.getProducts({});
            const newDto = {
                id: 'new-prod-1',
                name: '새 상품',
                category: '전자제품' as const,
                price: 50000,
                stock: 100,
                description: '새로운 상품입니다.',
                imageUrl: '/new.png',
                imageUrls: ['/new.png'],
                createdAt: new Date().toISOString(),
            };

            const createdProduct = await repository.createProduct(newDto);

            expect(createdProduct.id).toBe('new-prod-1');
            expect(createdProduct.description).toBe('새로운 상품입니다.');

            const afterCreate = await repository.getProducts({});
            expect(afterCreate.totalCount).toBe(initial.totalCount + 1);
            expect(afterCreate.data[0].id).toBe('new-prod-1'); // Assuming prepend
        });
    });
});

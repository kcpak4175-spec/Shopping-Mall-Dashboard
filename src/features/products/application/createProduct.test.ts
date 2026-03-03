import { MockProductRepository } from '../infra/MockProductRepository';
import { createProductUseCase } from './createProduct';

describe('createProduct Use Case', () => {
    let repository: MockProductRepository;

    beforeEach(() => {
        repository = new MockProductRepository();
    });

    it('should successfully create a valid product', async () => {
        const validDto = {
            id: 'prod-new-1',
            name: 'Valid Product',
            category: '식품' as const,
            price: 15000,
            stock: 50,
            description: 'This is a valid product.',
            imageUrl: '/image.png',
            imageUrls: ['/image.png'],
            createdAt: new Date().toISOString(),
        };

        const result = await createProductUseCase(repository, validDto);

        expect(result.success).toBe(true);
        expect(result.product).toBeDefined();
        expect(result.product?.id).toBe('prod-new-1');

        const repoProducts = await repository.getProducts({});
        expect(repoProducts.data[0].id).toBe('prod-new-1');
    });

    it('should fail when name is empty', async () => {
        const invalidDto = {
            id: 'prod-new-2',
            name: '',
            category: '식품' as const,
            price: 15000,
            stock: 50,
            description: 'desc',
            imageUrl: '/img.png',
            imageUrls: ['/img.png'],
            createdAt: new Date().toISOString(),
        };

        const result = await createProductUseCase(repository, invalidDto);

        expect(result.success).toBe(false);
        expect(result.error).toBe('상품명을 입력해주세요.');
    });

    it('should fail when price is negative', async () => {
        const invalidDto = {
            id: 'prod-new-3',
            name: 'P',
            category: '식품' as const,
            price: -100,
            stock: 50,
            description: 'desc',
            imageUrl: '/img.png',
            imageUrls: ['/img.png'],
            createdAt: new Date().toISOString(),
        };

        const result = await createProductUseCase(repository, invalidDto);

        expect(result.success).toBe(false);
        expect(result.error).toBe('가격은 0원 이상이어야 합니다.');
    });

    it('should fail when stock is negative', async () => {
        const invalidDto = {
            id: 'prod-new-4',
            name: 'P',
            category: '식품' as const,
            price: 100,
            stock: -5,
            description: 'desc',
            imageUrl: '/img.png',
            imageUrls: ['/img.png'],
            createdAt: new Date().toISOString(),
        };

        const result = await createProductUseCase(repository, invalidDto);

        expect(result.success).toBe(false);
        expect(result.error).toBe('재고는 0 이상이어야 합니다.');
    });
});

import { createProduct, Product, ProductCategory, ProductStatus } from './Product';

describe('Product Entity', () => {
    it('should create a valid product', () => {
        const productData = {
            id: 'prod-1',
            name: '테스트 상품',
            category: '전자제품' as ProductCategory,
            price: 10000,
            stock: 50,
            description: '테스트 상품 상세 설명입니다.',
            imageUrl: '/test.png',
            imageUrls: ['/test.png', '/test2.png'],
            createdAt: '2026-03-03T00:00:00Z',
        };

        const product = createProduct(productData);

        expect(product.id).toBe('prod-1');
        expect(product.name).toBe('테스트 상품');
        expect(product.status).toBe('정상');
        expect(product.description).toBe('테스트 상품 상세 설명입니다.');
        expect(product.imageUrls).toHaveLength(2);
    });

    it('should set status to OUT_OF_STOCK when stock is 0', () => {
        const product = createProduct({
            id: 'prod-2',
            name: '품절 상품',
            category: '의류' as ProductCategory,
            price: 20000,
            stock: 0,
            description: '',
            imageUrl: '/test2.png',
            imageUrls: [],
            createdAt: '2026-03-03T00:00:00Z',
        });

        expect(product.status).toBe('품절');
    });

    it('should set status to LOW_STOCK when stock is under 10 and greater than 0', () => {
        const product = createProduct({
            id: 'prod-3',
            name: '부족 상품',
            category: '식품' as ProductCategory,
            price: 30000,
            stock: 5,
            description: '',
            imageUrl: '/test3.png',
            imageUrls: [],
            createdAt: '2026-03-03T00:00:00Z',
        });

        expect(product.status).toBe('부족');
    });
});

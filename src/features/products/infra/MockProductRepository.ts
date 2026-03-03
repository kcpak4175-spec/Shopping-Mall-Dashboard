import { createProduct, CreateProductDto, Product, ProductCategory } from '../domain/Product';
import { GetProductsParams, PaginatedProducts, ProductRepository } from '../domain/ProductRepository';

// 더미 데이터 생성기
const generateDummyProducts = (count: number): Product[] => {
    const products: Product[] = [];
    const categories: ProductCategory[] = ['의류', '전자제품', '식품'];

    for (let i = 1; i <= count; i++) {
        const stock = i % 5 === 0 ? 0 : i % 3 === 0 ? 5 : 50; // 일부러 품절, 부족 상태 생성
        const status = stock === 0 ? '품절' : stock < 10 ? '부족' : '정상';

        products.push({
            id: `prod-${i}`,
            name: `더미 상품 ${i} ${i % 2 === 0 ? '노트북' : '티셔츠'}`,
            category: categories[i % 3],
            price: 10000 + i * 1000,
            stock,
            status,
            description: `더미 상품 ${i}에 대한 상세 설명입니다.`,
            imageUrl: `https://via.placeholder.com/150?text=Product+${i}`,
            imageUrls: [`https://via.placeholder.com/150?text=Product+${i}`, `https://via.placeholder.com/150?text=Sub+${i}`],
            createdAt: new Date(Date.now() - i * 100000).toISOString(),
        });
    }
    return products;
};

export class MockProductRepository implements ProductRepository {
    private products: Product[] = [];

    constructor() {
        this.products = generateDummyProducts(50); // 기본 50개 생성
    }

    async getProducts(params: GetProductsParams): Promise<PaginatedProducts> {
        const { searchQuery, category, status, page = 1, limit = 10 } = params;

        let filtered = [...this.products];

        if (searchQuery) {
            filtered = filtered.filter(p => p.name.includes(searchQuery));
        }

        if (category && category !== '전체') {
            filtered = filtered.filter(p => p.category === category);
        }

        if (status && status !== '전체') {
            filtered = filtered.filter(p => p.status === status);
        }

        const totalCount = filtered.length;
        const totalPages = Math.ceil(totalCount / limit);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedData = filtered.slice(startIndex, endIndex);

        // 실제 API 통신처럼 지연 효과
        await new Promise(resolve => setTimeout(resolve, 100));

        return {
            data: paginatedData,
            totalCount,
            currentPage: page,
            totalPages,
        };
    }

    async getProductById(id: string): Promise<Product | null> {
        const product = this.products.find(p => p.id === id);
        await new Promise(resolve => setTimeout(resolve, 50));
        return product || null;
    }

    async createProduct(dto: CreateProductDto): Promise<Product> {
        const newProduct = createProduct(dto);
        this.products.unshift(newProduct);
        await new Promise(resolve => setTimeout(resolve, 50));
        return newProduct;
    }

    async deleteProduct(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    async updateProduct(id: string, dto: Partial<CreateProductDto>): Promise<Product> {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error(`상품을 찾을 수 없습니다: ${id}`);
        }

        const updatedProduct = {
            ...this.products[index],
            ...dto,
            // CreateProductDto에서 id와 createdAt은 선택적일 수 있지만, 
            // Product 엔티티에서는 필수이므로 원본 값을 유지합니다.
            id: this.products[index].id,
            createdAt: this.products[index].createdAt,
        };

        this.products[index] = updatedProduct;
        await new Promise(resolve => setTimeout(resolve, 50));
        return updatedProduct;
    }

    async bulkDeleteProducts(ids: string[]): Promise<void> {
        this.products = this.products.filter(p => !ids.includes(p.id));
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    async bulkUpdateCategory(ids: string[], newCategory: ProductCategory): Promise<void> {
        this.products = this.products.map(p => {
            if (ids.includes(p.id)) {
                return { ...p, category: newCategory };
            }
            return p;
        });
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

export const mockProductRepository = new MockProductRepository();

import { Product, ProductCategory, ProductStatus, CreateProductDto } from './Product';

export interface GetProductsParams {
    searchQuery?: string;
    category?: ProductCategory;
    status?: ProductStatus;
    page?: number;
    limit?: number;
}

export interface PaginatedProducts {
    data: Product[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export interface ProductRepository {
    getProducts(params: GetProductsParams): Promise<PaginatedProducts>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(dto: CreateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    updateProduct(id: string, dto: Partial<CreateProductDto>): Promise<Product>;
    bulkDeleteProducts(ids: string[]): Promise<void>;
    bulkUpdateCategory(ids: string[], newCategory: ProductCategory): Promise<void>;
}

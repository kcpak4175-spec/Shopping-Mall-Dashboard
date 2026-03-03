export type ProductCategory = '전체' | '전자제품' | '의류' | '식품';
export type ProductStatus = '전체' | '정상' | '부족' | '품절';

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    description: string;
    status: ProductStatus;
    imageUrl: string;
    imageUrls: string[];
    createdAt: string;
}

export interface CreateProductDto {
    id: string;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    imageUrls: string[];
    createdAt: string;
}

export const createProduct = (data: CreateProductDto): Product => {
    let status: ProductStatus = '정상';

    if (data.stock === 0) {
        status = '품절';
    } else if (data.stock < 10) {
        status = '부족';
    }

    return {
        ...data,
        status,
    };
};

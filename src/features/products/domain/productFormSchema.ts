import { z } from 'zod';
import { type ProductCategory } from './Product';

export const PRODUCT_CATEGORIES: ProductCategory[] = ['전체', '전자제품', '의류', '식품'];

export const productFormSchema = z.object({
    name: z
        .string()
        .min(1, '상품명을 입력해주세요.')
        .max(100, '상품명은 100자 이하로 입력해주세요.'),
    description: z
        .string()
        .max(1000, '상품 설명은 1000자 이하로 입력해주세요.'),
    category: z.enum(['전체', '전자제품', '의류', '식품'] as const, {
        message: '올바른 카테고리를 선택해주세요.',
    }),
    price: z
        .number()
        .min(0, '가격은 0원 이상이어야 합니다.'),
    stock: z
        .number()
        .int('재고는 정수여야 합니다.')
        .min(0, '재고는 0 이상이어야 합니다.'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

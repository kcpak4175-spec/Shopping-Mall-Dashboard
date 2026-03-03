import { productFormSchema, type ProductFormValues } from './productFormSchema';

describe('productFormSchema', () => {
    const validData: ProductFormValues = {
        name: '테스트 상품',
        description: '상품 설명입니다.',
        category: '전자제품',
        price: 10000,
        stock: 50,
    };

    it('유효한 데이터를 통과시킨다', () => {
        const result = productFormSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('설명이 비어있어도 통과시킨다', () => {
        const result = productFormSchema.safeParse({ ...validData, description: '' });
        expect(result.success).toBe(true);
    });

    describe('상품명 (name)', () => {
        it('빈 문자열이면 실패한다', () => {
            const result = productFormSchema.safeParse({ ...validData, name: '' });
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(i => i.path.includes('name'));
                expect(nameError?.message).toBe('상품명을 입력해주세요.');
            }
        });

        it('100자를 초과하면 실패한다', () => {
            const longName = 'a'.repeat(101);
            const result = productFormSchema.safeParse({ ...validData, name: longName });
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(i => i.path.includes('name'));
                expect(nameError?.message).toBe('상품명은 100자 이하로 입력해주세요.');
            }
        });
    });

    describe('설명 (description)', () => {
        it('1000자를 초과하면 실패한다', () => {
            const longDesc = 'a'.repeat(1001);
            const result = productFormSchema.safeParse({ ...validData, description: longDesc });
            expect(result.success).toBe(false);
            if (!result.success) {
                const descError = result.error.issues.find(i => i.path.includes('description'));
                expect(descError?.message).toBe('상품 설명은 1000자 이하로 입력해주세요.');
            }
        });
    });

    describe('가격 (price)', () => {
        it('음수이면 실패한다', () => {
            const result = productFormSchema.safeParse({ ...validData, price: -1 });
            expect(result.success).toBe(false);
            if (!result.success) {
                const priceError = result.error.issues.find(i => i.path.includes('price'));
                expect(priceError?.message).toBe('가격은 0원 이상이어야 합니다.');
            }
        });
    });

    describe('재고 수량 (stock)', () => {
        it('음수이면 실패한다', () => {
            const result = productFormSchema.safeParse({ ...validData, stock: -1 });
            expect(result.success).toBe(false);
            if (!result.success) {
                const stockError = result.error.issues.find(i => i.path.includes('stock'));
                expect(stockError?.message).toBe('재고는 0 이상이어야 합니다.');
            }
        });
    });

    describe('카테고리 (category)', () => {
        it('유효하지 않은 카테고리이면 실패한다', () => {
            const result = productFormSchema.safeParse({ ...validData, category: '잘못된 카테고리' });
            expect(result.success).toBe(false);
        });
    });
});

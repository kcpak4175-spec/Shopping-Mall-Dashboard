import { StoreSettings, createStoreSettings } from './StoreSettings';

describe('StoreSettings Domain Entity', () => {
    it('유효한 데이터로 StoreSettings 객체를 생성할 수 있다', () => {
        const validData = {
            storeName: '내 멋진 쇼핑몰',
            logoUrl: 'https://example.com/logo.png',
            currency: 'KRW' as const,
            isTaxIncluded: true,
        };

        const result = createStoreSettings(validData);
        expect(result.isSuccess).toBe(true);
        if (result.isSuccess) {
            expect(result.data.storeName).toBe('내 멋진 쇼핑몰');
            expect(result.data.currency).toBe('KRW');
            expect(result.data.isTaxIncluded).toBe(true);
        }
    });

    it('스토어명이 비어있으면 생성에 실패한다', () => {
        const invalidData = {
            storeName: '   ',
            logoUrl: 'https://example.com/logo.png',
            currency: 'KRW' as const,
            isTaxIncluded: false,
        };

        const result = createStoreSettings(invalidData);
        expect(result.isSuccess).toBe(false);
        if (!result.isSuccess) {
            expect(result.error).toBe('스토어명은 필수 입력값입니다.');
        }
    });

    it('스토어명이 50자를 초과하면 생성에 실패한다', () => {
        const invalidData = {
            storeName: '가'.repeat(51),
            logoUrl: 'https://example.com/logo.png',
            currency: 'KRW' as const,
            isTaxIncluded: false,
        };

        const result = createStoreSettings(invalidData);
        expect(result.isSuccess).toBe(false);
        if (!result.isSuccess) {
            expect(result.error).toBe('스토어명은 최대 50자까지 입력 가능합니다.');
        }
    });
});

import { recommendSeoTags } from './recommendSeoTags';

describe('recommendSeoTags Use Case', () => {
    it('should recommend basic tags', async () => {
        const result = await recommendSeoTags('가성비 마우스', '좋은 마우스입니다.');
        expect(result).toContain('가성비');
        expect(result).toContain('추천상품');
        expect(result.length).toBeLessThanOrEqual(5);
    });

    it('should recommend premium tags if description contains specific words', async () => {
        const result = await recommendSeoTags('고급 우산', '아주 프리미엄 우산입니다.');
        expect(result).toContain('프리미엄');
    });

    it('should throw error if name is empty', async () => {
        await expect(recommendSeoTags('', '설명')).rejects.toThrow('상품명이 필요합니다.');
    });
});

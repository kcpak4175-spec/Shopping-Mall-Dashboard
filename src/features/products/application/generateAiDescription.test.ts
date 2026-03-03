import { generateAiDescription } from './generateAiDescription';

describe('generateAiDescription Use Case', () => {
    it('should generate a description based on name and category', async () => {
        const result = await generateAiDescription('프리미엄 노트북', '전자제품');
        expect(result).toContain('[AI 생성]');
        expect(result).toContain('프리미엄 노트북');
        expect(result).toContain('전자제품');
    });

    it('should throw error if name is empty', async () => {
        await expect(generateAiDescription('', '전자제품')).rejects.toThrow('상품명이 필요합니다.');
    });
});

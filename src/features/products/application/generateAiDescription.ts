export const generateAiDescription = async (name: string, category: string): Promise<string> => {
    // 실제 AI API 연동 대신 모의 응답 반환
    await new Promise(resolve => setTimeout(resolve, 800)); // 지연 효과

    if (!name.trim()) {
        throw new Error('상품명이 필요합니다.');
    }

    return `[AI 생성] "${name}"은(는) ${category} 카테고리의 최고 상품입니다. 
우수한 품질과 트렌디한 디자인으로 많은 사랑을 받고 있습니다. 
지금 바로 만나보세요!`;
};

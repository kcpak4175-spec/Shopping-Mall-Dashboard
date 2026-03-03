export const recommendSeoTags = async (name: string, description: string): Promise<string[]> => {
    // 실제 AI API 연동 대신 모의 응답 반환
    await new Promise(resolve => setTimeout(resolve, 600)); // 지연 효과

    if (!name.trim()) {
        throw new Error('상품명이 필요합니다.');
    }

    const baseTags = [name.split(' ')[0], '추천상품', '신상품', '세일'];

    // 설명에 특정 단어가 있으면 태그 추가 (단순 모의 로직)
    if (description.includes('프리미엄') || description.includes('고급')) {
        baseTags.push('프리미엄');
    }

    // 중복 제거 및 최대 5개 반환
    return Array.from(new Set(baseTags)).slice(0, 5);
};

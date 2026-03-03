'use server';

import { createProductUseCase } from '@/features/products/application/createProduct';
import { generateAiDescription } from '@/features/products/application/generateAiDescription';
import { recommendSeoTags } from '@/features/products/application/recommendSeoTags';
import { mockProductRepository } from '@/features/products/infra/MockProductRepository';
import { SupabaseImageRepository } from '@/features/products/infra/SupabaseImageRepository';
import { CreateProductDto } from '@/features/products/domain/Product';

// 임시 모의 리포지토리 인스턴스 (실무에서는 의존성 주입 등 사용 가능)
// TODO: DB 연동 시 ApiProductRepository 등으로 교체
const repository = mockProductRepository;
const imageRepository = new SupabaseImageRepository();

export async function createProductAction(data: Omit<CreateProductDto, 'id' | 'createdAt'>) {
    const dto: CreateProductDto = {
        ...data,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
    };

    return await createProductUseCase(repository, dto);
}

/**
 * 상품 이미지를 Supabase Storage에 업로드합니다.
 * @param formData - 이미지 파일이 포함된 FormData (key: "file")
 * @returns 업로드 결과 (성공 시 공개 URL, 실패 시 에러 메시지)
 */
export async function uploadProductImageAction(formData: FormData): Promise<{
    success: boolean;
    url?: string;
    path?: string;
    error?: string;
}> {
    try {
        const file = formData.get('file') as File | null;
        if (!file) {
            return { success: false, error: '파일이 없습니다.' };
        }

        // 고유 파일명 생성: timestamp + 랜덤 문자열 + 원본 확장자
        const ext = file.name.split('.').pop() || 'png';
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const filePath = `products/${uniqueName}`;

        const result = await imageRepository.upload(file, filePath);
        return { success: true, url: result.url, path: result.path };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : '이미지 업로드 중 오류가 발생했습니다.';
        return { success: false, error: message };
    }
}

export async function generateDescAction(name: string, category: string) {
    return await generateAiDescription(name, category);
}

export async function recommendTagsAction(name: string, description: string) {
    return await recommendSeoTags(name, description);
}

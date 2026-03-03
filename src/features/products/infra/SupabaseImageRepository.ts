import { createClient } from '@/shared/lib/supabase.server';
import { ImageRepository, ImageUploadResult } from '../domain/ImageRepository';

const BUCKET_NAME = 'product-images';

/**
 * Supabase Storage를 사용한 이미지 저장소 구현체 (인프라 레이어)
 * Server Action / Server Component 환경에서만 사용 가능합니다.
 */
export class SupabaseImageRepository implements ImageRepository {
    /**
     * 이미지 파일을 Supabase Storage에 업로드합니다.
     * @param file - 업로드할 파일 (File 또는 Blob)
     * @param fileName - 저장될 파일 이름 (경로 포함 가능, e.g. "products/abc123/image1.webp")
     */
    async upload(file: File, fileName: string): Promise<ImageUploadResult> {
        const supabase = await createClient();

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            throw new Error(`이미지 업로드에 실패했습니다: ${error.message}`);
        }

        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        return {
            url: publicUrlData.publicUrl,
            path: data.path,
        };
    }

    /**
     * Supabase Storage에서 이미지를 삭제합니다.
     * @param path - Storage 내부 경로
     */
    async delete(path: string): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([path]);

        if (error) {
            throw new Error(`이미지 삭제에 실패했습니다: ${error.message}`);
        }
    }
}

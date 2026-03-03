/**
 * 이미지 업로드 결과 타입
 */
export interface ImageUploadResult {
    /** 공개 접근 가능한 URL */
    url: string;
    /** Storage 내부 경로 (삭제 시 사용) */
    path: string;
}

/**
 * 이미지 저장소 인터페이스 (도메인 레이어)
 * 외부 스토리지 서비스와의 통신 규격만 정의합니다.
 */
export interface ImageRepository {
    /**
     * 이미지 파일을 업로드합니다.
     * @param file - 업로드할 파일
     * @param fileName - 저장될 파일 이름
     * @returns 업로드 결과 (공개 URL + 내부 경로)
     */
    upload(file: File, fileName: string): Promise<ImageUploadResult>;

    /**
     * 저장된 이미지를 삭제합니다.
     * @param path - Storage 내부 경로
     */
    delete(path: string): Promise<void>;
}

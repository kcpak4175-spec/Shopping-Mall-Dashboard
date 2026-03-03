-- =====================================================
-- 상품 이미지 관리를 위한 마이그레이션
-- 1) products 테이블에 이미지 컬럼 추가
-- 2) Supabase Storage 버킷 생성
-- 3) Storage RLS 정책 설정
-- =====================================================

-- 1. products 테이블에 이미지 관련 컬럼 추가
ALTER TABLE public.products ADD COLUMN image_url TEXT;
ALTER TABLE public.products ADD COLUMN image_urls TEXT[] DEFAULT '{}';

-- 2. Storage 버킷 생성 (public = true → 이미지 URL로 직접 접근 가능)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- 3. Storage RLS 정책 - 관리자만 업로드 가능
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND public.is_admin()
);

-- 4. Storage RLS 정책 - 관리자만 삭제 가능
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' AND public.is_admin()
);

-- 5. Storage RLS 정책 - 누구나 조회 가능 (공개 상품 이미지)
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

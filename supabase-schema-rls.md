# Supabase Database Schema & RLS Policies (Mall Dashboard)

이 문서는 제공된 메인 대시보드 명세를 바탕으로 구성한 Supabase 데이터베이스 스키마와 Row Level Security (RLS) 정책을 정의합니다.

## 1. 개요 및 설계 방향
- **Supabase Auth 연동**: Next.js App Router 환경에서 사용자 인증을 관리하기 위해 `auth.users` 테이블과 연동되는 관리자 프로필 테이블을 `public` 스키마에 구축합니다.
- **핵심 지표 도출**: 대시보드의 4가지 핵심 지표(매출, 주문, 고객, 재고)를 효율적으로 계산하기 위해 `orders`, `users` (고객), `products` 테이블을 설계합니다.
- **보안 (RLS)**: 관리자 대시보드의 특성상, `public.admin_users` 테이블에 등록된 인가된 관리자만 데이터를 조회 및 수정할 수 있도록 강력한 RLS 정책을 적용합니다.

---

## 2. 데이터베이스 스키마 설계 (SQL)

Supabase SQL Editor에서 실행할 수 있는 DDL 쿼리입니다.

```sql
-- 1. 관리자 프로필 테이블 (auth.users 연동)
-- public 스키마의 연동 정보는 이 테이블을 바라보게 됩니다.
CREATE TABLE public.admin_users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- auth.users에 새 사용자가 생성될 때 public.admin_users에도 자동 생성하는 트리거 (선택 사항)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_users (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. 상품(재고) 테이블
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    low_stock_threshold INTEGER NOT NULL DEFAULT 10, -- 이 수치 이하일 때 '재고 부족'으로 간주
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 3. 고객(쇼핑몰 사용자) 테이블 
-- (대시보드 신규 고객 지표용. 실제 쇼핑몰 서비스의 고객 정보)
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 4. 주문 테이블 (매출 및 주문 건수 지표용)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 5. 주문 상세(아이템) 테이블 (추후 상세 분석용)
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Row Level Security (RLS) 정책 설정

쇼핑몰 대시보드 데이터는 민감하므로, **인증된 관리자(admin_users에 존재하는 사용자)만 접근**할 수 있도록 전체 테이블에 RLS를 활성화하고 정책을 부여합니다.

```sql
-- 모든 주요 테이블에 RLS 활성화
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 공통으로 사용할 '관리자 확인' 함수 생성
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- [정책 1] admin_users 테이블:
-- 관리자는 자신의 정보만 수정 가능, 조회는 다른 관리자 정보도 볼 수 있도록 허용 (상황에 따라 조절)
CREATE POLICY "Admins can view all admin profiles" 
ON public.admin_users FOR SELECT 
USING ( public.is_admin() );

CREATE POLICY "Admins can update own profile" 
ON public.admin_users FOR UPDATE 
USING ( auth.uid() = id );


-- [정책 2] products 테이블: 관리자 전면 허용 (CRUD)
CREATE POLICY "Admins have full access to products" 
ON public.products FOR ALL 
USING ( public.is_admin() );


-- [정책 3] customers 테이블: 관리자는 모든 고객 정보 조회 및 관리 가능
CREATE POLICY "Admins have full access to customers" 
ON public.customers FOR ALL 
USING ( public.is_admin() );


-- [정책 4] orders 및 order_items 테이블: 관리자는 모든 주문 데이터 통제 가능
CREATE POLICY "Admins have full access to orders" 
ON public.orders FOR ALL 
USING ( public.is_admin() );

CREATE POLICY "Admins have full access to order_items" 
ON public.order_items FOR ALL 
USING ( public.is_admin() );

```

## 4. 프론트엔드 연동 참고 (Next.js)

위 스키마를 Supabase에 배포한 후, 프로젝트 루트에서 다음 명령어를 실행하여 타입스크립트 타입을 추출(`tech-stack.md` 규칙 준수)합니다.

```bash
# Supabase CLI를 통한 타입 생성 예시 명령
npx supabase gen types typescript --project-id "<여러분의-프로젝트-ID>" --schema public > src/shared/types/supabase.ts
```

이후 `src/features/.../infra` 영역에서 서버 사이드 클라이언트(`@supabase/ssr`)를 생성하여 위 테이블들을 안전하게 쿼리할 수 있습니다.

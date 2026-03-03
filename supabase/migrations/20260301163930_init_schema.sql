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
  VALUES (new.id, new.email, (new.raw_user_meta_data->>'full_name')::TEXT);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. 상품(재고) 테이블
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 4. 주문 테이블 (매출 및 주문 건수 지표용)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 5. 주문 상세(아이템) 테이블 (추후 상세 분석용)
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) 정책 설정

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

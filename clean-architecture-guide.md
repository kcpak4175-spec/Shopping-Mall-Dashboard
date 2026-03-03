# Mall Dashboard - Clean Architecture (Feature-Sliced Design)

이 문서는 `mall-dashboard` 프로젝트에 클린 아키텍처(기능 중심 구조, Feature-Sliced Design)를 적용하기 위한 구체적인 폴더 구조와 각 계층의 역할을 정의합니다. Next.js App Router 환경에 최적화되어 있습니다.

## 핵심 원칙
1. **관심사의 분리**: 프레임워크(UI, 라우팅)와 비즈니스 로직(도메인, 유스케이스)을 철저히 분리합니다.
2. **단방향 의존성**: 의존성은 항상 외부(UI, 인프라)에서 내부(도메인)로 향합니다. 내부 코드는 외부 환경(Next.js, 외부 라이브러리)에 의존하지 않아야 합니다.
3. **기능 중심 분리 (Feature-Sliced)**: `products`, `orders` 등 특정 도메인 단위로 폴더를 나누고, 기능별 폴더 내부에서 클린 아키텍처 계층으로 나눕니다.

## 폴더 구조 상세

```text
mall-dashboard/
├── app/                      # [Next.js 프레임워크 전용 영역 (라우팅, 뷰)]
│   ├── (dashboard)/          # 대시보드 레이아웃 그룹 (Header, Sidebar 등)
│   │   ├── products/         # /products 경로
│   │   │   ├── page.tsx      # 페이지 진입점 (UI 컴포넌트와 유스케이스 조립)
│   │   │   └── loading.tsx
│   │   └── orders/           # /orders 경로
│   │       └── page.tsx
│   ├── layout.tsx            # Root 레이아웃
│   ├── global.css            # 전역 스타일 설정
│   └── api/                  # (선택) 외부 시스템용 API 또는 Webhook 엔드포인트
│
├── src/                      # [핵심 소스코드 (클린 아키텍처 적용 영역)]
│   ├── features/             # 🌟 비즈니스 도메인별 기능 묶음 (가장 중요)
│   │   │
│   │   ├── products/         # [도메인: 상품 관리]
│   │   │   ├── domain/       # 1️⃣ 순수 비즈니스 로직 및 타입 정의 (외부 의존성 X)
│   │   │   │   ├── Product.ts           # 상품 엔티티 (모델 데이터 타입 제약)
│   │   │   │   └── ProductRepository.ts # 상품 저장소 규격 (인터페이스만 정의)
│   │   │   │
│   │   │   ├── application/  # 2️⃣ 유스케이스 (도메인과 외부 시스템의 다리 역할)
│   │   │   │   ├── getProductList.ts    # '상품 목록 조회' 기능 흐름 제어
│   │   │   │   └── createProduct.ts     # '상품 등록' 기능 흐름 제어
│   │   │   │
│   │   │   ├── infra/        # 3️⃣ 외부 시스템/DB 연동 (도메인 인터페이스를 실제로 구현)
│   │   │   │   └── ApiProductRepository.ts # REST API를 통한 데이터 Fetching 구현체
│   │   │   │
│   │   │   └── ui/           # 4️⃣ 해당 도메인 전용 UI 컴포넌트 (프레임워크 종속)
│   │   │       ├── ProductCard.tsx      # 상품 정보 표시 컴포넌트
│   │   │       └── ProductListTable.tsx # 상품 목록 테이블 UI
│   │   │
│   │   ├── orders/           # [도메인: 주문 관리]
│   │   │   ├── domain/       # ... (Order 엔티티 등)
│   │   │   ├── application/  # ...
│   │   │   ├── infra/        # ...
│   │   │   └── ui/           # ...
│   │   │
│   │   └── auth/             # [도메인: 사용자 계정 및 인증]
│   │       └── ...
│   │
│   ├── shared/               # 앱 전체에서 공통으로 사용되는 인프라, UI 컴포넌트
│   │   ├── ui/               # 도메인에 종속되지 않는 덤 컴포넌트 (디자인 시스템)
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   │
│   │   ├── lib/              # 외부 라이브러리 래퍼 및 설정
│   │   │   ├── api.ts        # Axios 또는 Fetch 인스턴스 설정
│   │   │   └── supabase.browser.ts # DB 또는 인증 인스턴스 초기화 등
│   │   │
│   │   ├── utils/            # 순수 함수 공통 모듈 (날짜 변환기, 문자열 파서 등)
│   │   │   └── formatDate.ts
│   │   │
│   │   ├── types/            # 전역 타입 정의 (API 에러 형식 등)
│   │   └── constants/        # 전역 상수 보관
│   │
│   └── core/                 # 앱 전반을 감싸는 설정 및 프로바이더
│       └── providers/        # Redux Provider, QueryClientProvider, ThemeProvider 등
│
├── public/                   # 정적 이미지 자산
├── next.config.ts            
├── tailwind.config.ts / postcss.config.ts
└── package.json
```

## 계층(Layer) 상세 설명 가이드

### 1. Domain (도메인 레이어) - `src/features/[name]/domain`
*   **역할:** 프로젝트의 핵심 데이터 구조(엔티티)와 비즈니스 규칙을 정의합니다.
*   **특징:**
    *   **순수 TypeScript**로만 작성됩니다.
    *   `react`, `next`, `axios` 같은 라이브러리에 절대 의존하지 않습니다.
    *   외부 데이터 소스(API, DB)와 소통하기 위한 인터페이스(`Repository`)만 정의합니다.

### 2. Application (유스케이스 레이어) - `src/features/[name]/application`
*   **역할:** 사용자가 시도하는 "특정 행동(Use Case)"의 실행 흐름을 통제합니다.
*   **특징:**
    *   "상품을 등록한다", "상품 목록을 가져온다" 같은 하나의 명확한 책임을 가집니다.
    *   도메인 레이어에 정의된 인터페이스(Repository)를 통해 데이터를 받아오고, 순수 비즈니스 로직을 적용합니다.
    *   특정 프레임워크(UI 컴포넌트)에 종속되지 않습니다.

### 3. Infrastructure (인프라 레이어) - `src/features/[name]/infra`
*   **역할:** 도메인 레이어에서 정의한 인터페이스(`Repository`)의 실제 세부 구현체입니다.
*   **특징:**
    *   외부 API 통신, 데이터베이스 연결, 서드파티 서비스 호출 등을 담당합니다.
    *   (`RepositoryImpl` 클래스 또는 함수 객체 형태) 백엔드 응답을 '도메인 엔티티'로 변환하는 역할도 수행합니다.

### 4. UI (프레젠테이션 레이어) - `src/features/[name]/ui`
*   **역할:** 화면에 데이터를 렌더링하고, 사용자 이벤트를 받아 Application(유스케이스) 레이어로 전달합니다.
*   **특징:**
    *   Next.js 15+ 에서는 특정 도메인 전용 리액트 컴포넌트(Client Component 포함)들이 이곳에 위치합니다.
    *   `app/` 내부의 `page.tsx`는 이곳에 정의된 컴포넌트들을 가져와 화면 조립하는 역할만 합니다.

### 5. Shared (공유 레이어) - `src/shared`
*   **역할:** 특정 기능(Domain)에 속하지 않고 프로젝트 전체에서 공통으로 사용되는 인프라를 의미합니다.
*   **특징:**
    *   범용 UI 컴포넌트 세트(디자인 시스템), 전역 유틸리티 함수, 공통 네트워크 클라이언트 설정 코드가 위치합니다.

## Next.js (App Router) 렌더링 시 흐름 예시

1.  사용자가 `/products` 페이지에 접근합니다.
2.  `app/(dashboard)/products/page.tsx` 가 실행됩니다. (컨트롤러 역할)
3.  `page.tsx` 안에서 `src/features/products/application/getProductList.ts` (유스케이스)를 호출합니다.
    *   (이 과정에서 `getProductList` 유스케이스는 주입된 `ApiProductRepository` 구현체를 사용해 외부 서버 측에서 실 데이터를 Fetch합니다.)
4.  반환 받은 도메인 데이터 리스트(`Product[]`)를 `src/features/products/ui/ProductListTable.tsx` 컴포넌트의 Props로 넘겨주며 페이지를 렌더링합니다.

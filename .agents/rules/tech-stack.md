---
trigger: always_on
---

# Tech Stack Rules (Next.js + Supabase + Tailwind CSS)

이 프로젝트는 최신 성능과 개발 경험(DX)을 극대화하기 위해 Next.js 15+ (App Router), Supabase (PostgreSQL), TypeScript, Tailwind CSS V4를 조합하여 사용하며, 아래의 스택별 설계 및 코딩 규칙을 엄격히 준수합니다.

## 1. Next.js (프레임워크)
- **App Router 우선**: 모든 라우팅은 `app/` 디렉터리 기반으로 구성합니다.
- **Server Actions 및 데이터 패칭**:
  - `fetch`를 활용한 서버 컴포넌트 내 직접 데이터 패칭을 기본으로 합니다. API Route(`/api`) 사용은 외부 서비스 연동이나 웹훅(Webhook) 처리 시로 제한합니다.
  - 데이터 생성, 수정, 삭제(Mutation)는 전용 `actions.ts` 혹은 `application/` 폴더 내의 유스케이스 함수 형태인 **Server Actions**로 일원화합니다.
  - `use client` 명령어를 통한 클라이언트 컴포넌트는 오직 인터랙션(예: 상태 관리, 이벤트 훅)이 필수적인 트리의 최하단에만 선언합니다.

## 2. Supabase (BaaS / 데이터베이스 / 인증)
- **안전한 서버 사이드 연동**: 
  - 브라우저 클라이언트에서 직접 Supabase DB를 쿼리하는 방식(`@supabase/supabase-js`의 클라이언트 훅 사용 등)은 지양합니다.
  - 데이터의 Fetching 및 Mutation은 모두 Next.js **Server Component** 또는 **Server Action** 영역에서 수행하여 민감한 데이터 노출을 원천적으로 차단합니다.
  - `@supabase/ssr` 라이브러리를 통해 서버 환경(Server Component, Action, Route Handler)에서 쿠키 기반 세션으로 안전하게 클라이언트를 생성합니다.
- **Row Level Security (RLS) 필수 적용**:
  - Supabase 테이블 생성 시 **RLS를 반드시 활성화(Enable)**하며, 최소 권한 원칙(Principle of Least Privilege)에 맞춘 보안 정책을 필수로 작성합니다.
- **강력한 타입 세이프티 보장**: 
  - 에디터 자동완성과 안정성을 위해 Supabase CLI를 통해 데이터베이스 스키마 타입을 자동 생성(`types/supabase.ts`) 받아 적용합니다.
  - Supabase 클라이언트 생성 시 제네릭으로 해당 Database 타입을 주입하여 강력한 타입 추론 환경을 구성합니다.

## 3. TypeScript (정적 타이핑)
- **명시적 인터페이스와 타입 선언**: `any` 타입의 사용을 엄격히 금지합니다. 모든 변수, 함수 매개변수 및 반환값에 명확한 타입이나 인터페이스를 지정합니다. 
- 클린 아키텍처 관점에서, 외부 의존성이 배제된 **도메인 엔티티 타입**과 DB 스키마 의존적인 **Supabase 제네레이트 타입**은 확실히 분리하여 사용합니다. (Infra 레이어에서 매핑(Mapper) 적용)

## 4. Tailwind CSS v4 (스타일링)
- **Utility-First 클래스 사용**: 재사용되거나 상태에 따라 동적으로 변하는 컴포넌트에 한해서만 테일윈드 클래스 조합(예: `clsx`, `tailwind-merge` 활용)을 구성하며, 의미 없는 전역 커스텀 클래스나 인라인 CSS는 피합니다.
- **디자인 토큰 통일**: 색상, 폰트, 스페이싱 등은 Tailwind v4 설정에서 CSS 변수(`var(--)`) 혹은 테마 구성으로 일원화하여 프로젝트 전반의 시각적 일관성을 유지합니다.

## 5.마이그레이션 (Migrations)
- supabase/migrations 폴더에 위치
- 마이그레이션을 수정하거나 삭제하거나 새로 생성할 때는 항상 사용자의 허가 받기.
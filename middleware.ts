import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // 사용자의 세션(유저 정보) 가져오기
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 경로에 따른 리다이렉션 방어 로직
    const isLoginPage = request.nextUrl.pathname.startsWith('/login')
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname === '/'

    if (!user && isDashboardPage) {
        // 비로그인 사용자가 대시보드 쪽 접근 시 로그인 페이지로
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user && isLoginPage) {
        // 로그인 사용자가 로그인 페이지 접근 시 대시보드 메인으로
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
}

// 미들웨어가 실행될 라우트 설정
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

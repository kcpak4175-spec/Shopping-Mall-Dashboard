'use server'

import { createClient } from '@/shared/lib/supabase.server'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // 간단한 유효성 검증
    if (!email || !password) {
        return { error: '이메일과 비밀번호를 모두 입력해주세요.' }
    }

    const supabase = await createClient()

    // Supabase 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    // 에러 처리
    if (error) {
        // 네트워크 오류, 서버 접속 실패 등 (status가 0 또는 5xx 일 때)
        if (error.status === 0 || (error.status && error.status >= 500)) {
            return { error: '서버에 연결할 수 없습니다. 다시 시도해주세요' }
        }

        // 자격 증명 실패 (400 상태 등)
        return { error: '이메일 또는 비밀번호가 올바르지 않습니다' }
    }

    // 성공 시 리다이렉트
    redirect('/')
}

import { loginAction } from './loginAction'
import { createClient } from '../../../shared/lib/supabase.server'
import { redirect } from 'next/navigation'

// 모킹
jest.mock('../../../shared/lib/supabase.server', () => ({
    createClient: jest.fn(),
}))

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}))

describe('loginAction', () => {
    let mockSupabase: any

    beforeEach(() => {
        jest.clearAllMocks()

        // Supabase 클라이언트 모킹 세팅
        mockSupabase = {
            auth: {
                signInWithPassword: jest.fn(),
            },
        }

            ; (createClient as jest.Mock).mockResolvedValue(mockSupabase)
    })

    it('올바른 자격 증명일 때 로그인이 성공하고 리다이렉트되어야 한다.', async () => {
        // 성공 응답 모킹
        mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
            data: { user: { id: 'test-user-id' }, session: {} },
            error: null,
        })

        const formData = new FormData()
        formData.append('email', 'admin@store.com')
        formData.append('password', 'correct-password')

        // redirect가 throw를 발생시키므로 try/catch로 래핑
        try {
            await loginAction(null, formData)
        } catch (e: any) {
            expect(e.message).toBe('NEXT_REDIRECT')
        }

        expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
            email: 'admin@store.com',
            password: 'correct-password',
        })
        expect(redirect).toHaveBeenCalledWith('/dashboard')
    })

    it('잘못된 이메일 또는 비밀번호일 때 올바른 에러 메시지를 반환해야 한다.', async () => {
        // 인증 에러 모킹
        mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
            data: { user: null, session: null },
            error: { message: 'Invalid login credentials', status: 400 },
        })

        const formData = new FormData()
        formData.append('email', 'wrong@store.com')
        formData.append('password', 'wrong-password')

        const result = await loginAction(null, formData)

        expect(result).toEqual({ error: '이메일 또는 비밀번호가 올바르지 않습니다' })
        expect(redirect).not.toHaveBeenCalled()
    })

    it('인터넷 연결/서버 문제시 네트워크 에러 메시지를 반환해야 한다.', async () => {
        // 네트워크/서버 에러 상황 모킹
        mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
            data: { user: null, session: null },
            error: { message: 'Failed to fetch', status: 0 }, // 보통 0 이거나 500
        })

        const formData = new FormData()
        formData.append('email', 'admin@store.com')
        formData.append('password', 'password')

        const result = await loginAction(null, formData)

        expect(result).toEqual({ error: '서버에 연결할 수 없습니다. 다시 시도해주세요' })
    })
})

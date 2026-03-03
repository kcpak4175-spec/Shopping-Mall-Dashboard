/**
 * @jest-environment node
 */
import { middleware } from './middleware'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Supabase.ssr 의 createServerClient 모킹
jest.mock('@supabase/ssr', () => ({
    createServerClient: jest.fn(),
}))

describe('middleware', () => {
    let mockSupabase: any
    let mockResponse: any

    beforeEach(() => {
        jest.clearAllMocks()

        mockSupabase = {
            auth: {
                getUser: jest.fn(),
            },
        }

        mockResponse = {
            cookies: {
                set: jest.fn(),
            },
        }

            ; (createServerClient as jest.Mock).mockReturnValue(mockSupabase)

        // NextResponse의 메서드들을 모킹
        jest.spyOn(NextResponse, 'next').mockReturnValue(mockResponse)
        jest.spyOn(NextResponse, 'redirect').mockReturnValue(mockResponse)
    })

    it('비로그인 사용자가 /dashboard 에 접근하면 /login 으로 리다이렉트되어야 한다.', async () => {
        const req = new NextRequest(new URL('http://localhost:3000/dashboard'))

        // 유저가 없는 상황 모킹
        mockSupabase.auth.getUser.mockResolvedValueOnce({ data: { user: null } })

        const res = await middleware(req)

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', req.url))
    })

    it('로그인 사용자가 /login 에 접근하면 /dashboard 로 리다이렉트되어야 한다.', async () => {
        const req = new NextRequest(new URL('http://localhost:3000/login'))

        // 유저가 있는 상황 모킹
        mockSupabase.auth.getUser.mockResolvedValueOnce({ data: { user: { id: 'test' } } })

        const res = await middleware(req)

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/dashboard', req.url))
    })

    it('로그인 사용자가 /dashboard 에 접근하면 통과되어야 한다(next 호출).', async () => {
        const req = new NextRequest(new URL('http://localhost:3000/dashboard'))

        // 유저가 있는 상황 모킹
        mockSupabase.auth.getUser.mockResolvedValueOnce({ data: { user: { id: 'test' } } })

        const res = await middleware(req)

        expect(NextResponse.next).toHaveBeenCalled()
        expect(NextResponse.redirect).not.toHaveBeenCalled()
    })
})

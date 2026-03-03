'use client'

import { useActionState } from 'react'
import { loginAction } from '../application/loginAction'

export default function LoginForm() {
    const [state, action, isPending] = useActionState(loginAction, null)

    return (
        <form action={action} className="flex flex-col gap-6 w-full max-w-sm mt-8">
            {/* 이메일 주소 */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    이메일 주소
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@store.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
                />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    비밀번호
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        placeholder="비밀번호를 입력하세요"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
                    />
                    {/* 비밀번호 숨김/보기 아이콘 (임시) */}
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 옵션 링크 */}
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input
                        type="checkbox"
                        name="remember"
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    로그인 유지
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                    비밀번호 찾기
                </a>
            </div>

            {/* 액션 상태 및 에러 렌더링 */}
            {state?.error && (
                <p className="text-sm text-red-500 font-medium">{state.error}</p>
            )}

            {/* 제출 버튼 */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
            >
                {isPending ? '로그인 중...' : '로그인'}
                {!isPending && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </svg>
                )}
            </button>
        </form>
    )
}

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginForm from '../ui/LoginForm'

// Server Action 모킹
jest.mock('../application/loginAction', () => ({
  loginAction: jest.fn(),
}))

describe('LoginForm', () => {
  it('이메일, 비밀번호 필드와 로그인 버튼이 렌더링되어야 한다.', () => {
    // Red: 컴포넌트가 아직 존재하지 않아 실패해야 함
    render(<LoginForm />)

    expect(screen.getByPlaceholderText('admin@store.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument()
  })

  it('입력 없이 폼을 제출하면 브라우저 기본 HTML5 기본 검증에 걸려야 함(required)', () => {
    render(<LoginForm />)
    
    // 이메일 필드는 required
    const emailInput = screen.getByPlaceholderText('admin@store.com')
    expect(emailInput).toBeRequired()

    // 폼 객체를 가져와 직접 검증 (버튼이 type=submit이거나 폼에 onSubmit이 되어야 함)
    const button = screen.getByRole('button', { name: '로그인' })
    expect(button).toHaveAttribute('type', 'submit')
  })
})

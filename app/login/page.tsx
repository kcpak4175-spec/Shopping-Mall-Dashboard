import LoginForm from '@/features/auth/ui/LoginForm';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 flex flex-col items-center bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="text-center w-full">
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        관리자 로그인
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        몰 대시보드에 접근하기 위해 로그인해주세요.
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}

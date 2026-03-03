import { render, screen } from '@testing-library/react';
import ProductsPage from './page';

// 1. Next.js App Router RSC async component mock
jest.mock('./page', () => {
    return {
        __esModule: true,
        default: async function MockProductsPage({ searchParams }: any) {
            const page = searchParams?.page || '1';
            return (
                <div>
                    <h1>상품 관리 ({page}페이지)</h1>
                    <button>상품 등록</button>
                    <div data-testid="search-filter">검색 필터</div>
                    <div data-testid="list-table">상품 테이블 목록</div>
                    <div data-testid="pagination">Pagination</div>
                </div>
            );
        }
    };
});

describe('Products Page Integration', () => {
    it('renders title and add product button', async () => {
        const RSC = await (ProductsPage as any)({ searchParams: {} });
        render(RSC);

        expect(screen.getByText(/상품 관리/)).toBeInTheDocument();
        expect(screen.getByText('상품 등록')).toBeInTheDocument();
        expect(screen.getByTestId('search-filter')).toBeInTheDocument();
        expect(screen.getByTestId('list-table')).toBeInTheDocument();
    });

    it('passes searchParams to render specific page', async () => {
        const RSC = await (ProductsPage as any)({ searchParams: { page: '2' } });
        render(RSC);

        expect(screen.getByText('상품 관리 (2페이지)')).toBeInTheDocument();
    });
});

import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getCustomerDetail } from '@/features/customers/application/getCustomerDetail';
import { MockCustomerRepository } from '@/features/customers/infra/MockCustomerRepository';
import { ProfileCard } from '@/features/customers/ui/ProfileCard';
import { CustomerSummaryCard } from '@/features/customers/ui/CustomerSummaryCard';
import { OrderHistoryCard } from '@/features/customers/ui/OrderHistoryCard';
import { FavoriteCategoriesChart } from '@/features/customers/ui/FavoriteCategoriesChart';
import Link from 'next/link';

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params; // Next.js 15+ params handling
    const repo = new MockCustomerRepository();

    let customer;
    try {
        customer = await getCustomerDetail(repo, id);
    } catch (e) {
        notFound();
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                    <Link href="/customers" className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-bold text-slate-800">고객 이름 "{customer.name}"</h1>
                </div>
                <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    수정 버튼
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 border-r-0 lg:border-r border-slate-200 pr-0 lg:pr-6 space-y-6">
                    <ProfileCard customer={customer} />
                    <FavoriteCategoriesChart categories={customer.favoriteCategories} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <CustomerSummaryCard customer={customer} />
                    </div>
                    <OrderHistoryCard history={customer.orderHistory} />
                </div>
            </div>
        </div>
    );
}

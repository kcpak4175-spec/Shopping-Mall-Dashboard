'use client';

import React from 'react';
import { StoreSettings } from '../domain/StoreSettings';

interface StoreInfoFormProps {
    data: StoreSettings;
    onChange: (data: StoreSettings) => void;
}

export function StoreInfoForm({ data, onChange }: StoreInfoFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let newValue: string | boolean = value;

        if (type === 'checkbox') {
            newValue = (e.target as HTMLInputElement).checked;
        }

        onChange({
            ...data,
            [name]: newValue,
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">스토어 기본 정보</h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">스토어명</label>
                    <input
                        id="storeName"
                        type="text"
                        name="storeName"
                        value={data.storeName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">로고 업로드 (선택)</label>
                    <div className="mt-1 flex items-center space-x-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden">
                            {data.logoUrl ? (
                                <img src={data.logoUrl} alt="로고 미리보기" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-gray-400 text-xs">No Logo</span>
                            )}
                        </div>
                        <button type="button" className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            변경
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">통화</label>
                    <select
                        id="currency"
                        name="currency"
                        value={data.currency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="KRW">KRW - 원</option>
                        <option value="USD">USD - 달러</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <input
                        id="isTaxIncluded"
                        type="checkbox"
                        name="isTaxIncluded"
                        checked={data.isTaxIncluded}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isTaxIncluded" className="ml-2 block text-sm text-gray-900">
                        세금 포함가격
                    </label>
                </div>
            </div>
        </div>
    );
}

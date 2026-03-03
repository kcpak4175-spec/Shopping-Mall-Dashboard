'use client';

import React from 'react';
import { NotificationSettings } from '../domain/NotificationSettings';

interface AlertSettingsFormProps {
    data: NotificationSettings;
    onChange: (data: NotificationSettings) => void;
}

export function AlertSettingsForm({ data, onChange }: AlertSettingsFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        onChange({
            ...data,
            [name]: type === 'checkbox' ? checked : Number(value),
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h2 className="text-lg font-semibold mb-4">재고 알림 설정</h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700">재고 부족 기준</label>
                    <input
                        id="lowStockThreshold"
                        type="number"
                        min="0"
                        name="lowStockThreshold"
                        value={data.lowStockThreshold}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <label htmlFor="isEmailEnabled" className="block text-sm font-medium text-gray-900">이메일 알림</label>
                        <p className="text-xs text-gray-500">재고 부족 시 이메일로 알림을 받습니다.</p>
                    </div>
                    <input
                        id="isEmailEnabled"
                        type="checkbox"
                        name="isEmailEnabled"
                        checked={data.isEmailEnabled}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <label htmlFor="isSlackEnabled" className="block text-sm font-medium text-gray-900">슬랙 알림</label>
                        <p className="text-xs text-gray-500">팀 슬랙 채널로 직접 알림을 받습니다.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">연동하기</button>
                        <input
                            id="isSlackEnabled"
                            type="checkbox"
                            name="isSlackEnabled"
                            checked={data.isSlackEnabled}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

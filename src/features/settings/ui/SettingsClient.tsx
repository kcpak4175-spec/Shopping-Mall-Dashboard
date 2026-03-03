'use client';

import React, { useState } from 'react';
import { SettingsTabs } from '@/features/settings/ui/SettingsTabs';
import { StoreInfoForm } from '@/features/settings/ui/StoreInfoForm';
import { AlertSettingsForm } from '@/features/settings/ui/AlertSettingsForm';
import { SettingsSubmitButton } from '@/features/settings/ui/SettingsSubmitButton';
import { SettingsData } from '@/features/settings/domain/SettingsRepository';
import { saveSettingsAction } from '@/features/settings/actions';

interface SettingsClientProps {
    initialData: SettingsData;
}

export default function SettingsClient({ initialData }: SettingsClientProps) {
    const [data, setData] = useState<SettingsData>(initialData);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await saveSettingsAction(formData);

        if (result.success) {
            setMessage({ type: 'success', text: '설정이 성공적으로 저장되었습니다.' });
        } else {
            setMessage({ type: 'error', text: result.error || '저장 중 오류가 발생했습니다.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-full relative pb-24">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">설정</h1>
            </div>

            <SettingsTabs />

            {message && (
                <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <StoreInfoForm
                data={data.store}
                onChange={(store) => setData((prev) => ({ ...prev, store }))}
            />

            <AlertSettingsForm
                data={data.notification}
                onChange={(notification) => setData((prev) => ({ ...prev, notification }))}
            />

            <SettingsSubmitButton />
        </form>
    );
}

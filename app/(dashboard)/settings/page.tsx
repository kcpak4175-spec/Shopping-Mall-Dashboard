import React from 'react';
import SettingsClient from '@/features/settings/ui/SettingsClient';
import { getSettings } from '@/features/settings/application/getSettings';
import { MockSettingsRepository } from '@/features/settings/infra/MockSettingsRepository';

export const metadata = {
    title: '설정 | Mall Dashboard',
};

export default async function SettingsPage() {
    // UseCase를 통해 데이터 Fetching (Server Component)
    // 실제 DB가 연동되면 SupabaseSettingsRepository 등으로 교체 가능
    const initialData = await getSettings(MockSettingsRepository);

    return (
        <div className="max-w-4xl mx-auto h-full relative">
            <SettingsClient initialData={initialData} />
        </div>
    );
}

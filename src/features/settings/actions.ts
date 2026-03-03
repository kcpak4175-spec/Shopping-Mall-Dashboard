'use server';

import { revalidatePath } from 'next/cache';
import { SettingsData } from './domain/SettingsRepository';
import { updateSettings } from './application/updateSettings';
import { MockSettingsRepository } from './infra/MockSettingsRepository';
import { createStoreSettings } from './domain/StoreSettings';
import { createNotificationSettings } from './domain/NotificationSettings';

export async function saveSettingsAction(formData: FormData) {
    // 1. FormData 수집
    const storeName = formData.get('storeName') as string;
    const currency = formData.get('currency') as 'KRW' | 'USD';
    const logoUrl = formData.get('logoUrl') as string | undefined;
    const isTaxIncluded = formData.get('isTaxIncluded') === 'on' || formData.get('isTaxIncluded') === 'true';

    const lowStockThreshold = Number(formData.get('lowStockThreshold'));
    const isEmailEnabled = formData.get('isEmailEnabled') === 'on' || formData.get('isEmailEnabled') === 'true';
    const isSlackEnabled = formData.get('isSlackEnabled') === 'on' || formData.get('isSlackEnabled') === 'true';

    // 2. 도메인 엔티티를 통한 유효성 검증 (TDD Red/Green 통과 로직 활용)
    const storeResult = createStoreSettings({ storeName, currency, logoUrl, isTaxIncluded });
    const notiResult = createNotificationSettings({ lowStockThreshold, isEmailEnabled, isSlackEnabled });

    if (!storeResult.isSuccess || !notiResult.isSuccess) {
        const errorMsg = !storeResult.isSuccess ? storeResult.error : (!notiResult.isSuccess ? notiResult.error : '알 수 없는 오류');
        return { success: false, error: errorMsg };
    }

    const newSettings: SettingsData = {
        store: storeResult.data,
        notification: notiResult.data,
    };

    // 3. 어플리케이션(UseCase) 호출로 비즈니스 로직 및 저장 처리
    await updateSettings(MockSettingsRepository, newSettings);

    // 4. 캐시 무효화 (Next.js App Router 반영)
    revalidatePath('/settings');
    revalidatePath('/(dashboard)/settings');

    return { success: true };
}

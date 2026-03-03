import { Result } from './StoreSettings';

export interface NotificationSettings {
    lowStockThreshold: number;
    isEmailEnabled: boolean;
    isSlackEnabled: boolean;
}

export function createNotificationSettings(data: {
    lowStockThreshold: number;
    isEmailEnabled: boolean;
    isSlackEnabled: boolean;
}): Result<NotificationSettings> {
    if (data.lowStockThreshold < 0) {
        return { isSuccess: false, error: '재고 부족 기준은 0 이상이어야 합니다.' };
    }

    if (!Number.isInteger(data.lowStockThreshold)) {
        return { isSuccess: false, error: '재고 부족 기준은 정수이어야 합니다.' };
    }

    return {
        isSuccess: true,
        data: {
            lowStockThreshold: data.lowStockThreshold,
            isEmailEnabled: data.isEmailEnabled,
            isSlackEnabled: data.isSlackEnabled,
        },
    };
}

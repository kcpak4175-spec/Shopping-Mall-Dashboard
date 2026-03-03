import { SettingsRepository, SettingsData } from '../domain/SettingsRepository';

// 실제 DB 연동 전, 서버 시뮬레이션을 위한 임시 Mock Data
let mockDbSettings: SettingsData = {
    store: {
        storeName: 'Mall Dashboard Demo',
        logoUrl: '',
        currency: 'KRW',
        isTaxIncluded: true,
    },
    notification: {
        lowStockThreshold: 10,
        isEmailEnabled: true,
        isSlackEnabled: false,
    },
};

export const MockSettingsRepository: SettingsRepository = {
    async getSettings(): Promise<SettingsData> {
        // 네트워크 딜레이 시뮬레이션
        return new Promise((resolve) => setTimeout(() => resolve(mockDbSettings), 500));
    },

    async updateSettings(data: SettingsData): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockDbSettings = { ...data };
                resolve();
            }, 500);
        });
    }
};

import { SettingsRepository, SettingsData } from '../domain/SettingsRepository';
import { updateSettings } from './updateSettings';

describe('updateSettings UseCase', () => {
    it('저장소에 설정 데이터를 정상적으로 업데이트한다', async () => {
        const mockData: SettingsData = {
            store: {
                storeName: '새로운 스토어',
                currency: 'USD',
                isTaxIncluded: false,
            },
            notification: {
                lowStockThreshold: 5,
                isEmailEnabled: false,
                isSlackEnabled: true,
            },
        };

        const mockRepo: SettingsRepository = {
            getSettings: jest.fn(),
            updateSettings: jest.fn().mockResolvedValue(undefined),
        };

        await updateSettings(mockRepo, mockData);

        expect(mockRepo.updateSettings).toHaveBeenCalledTimes(1);
        expect(mockRepo.updateSettings).toHaveBeenCalledWith(mockData);
    });
});

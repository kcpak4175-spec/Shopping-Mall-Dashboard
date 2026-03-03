import { SettingsRepository, SettingsData } from '../domain/SettingsRepository';
import { getSettings } from './getSettings';

describe('getSettings UseCase', () => {
    it('저장소에서 설정 데이터를 정상적으로 조회한다', async () => {
        const mockData: SettingsData = {
            store: {
                storeName: '테스트 스토어',
                currency: 'KRW',
                isTaxIncluded: true,
            },
            notification: {
                lowStockThreshold: 10,
                isEmailEnabled: true,
                isSlackEnabled: false,
            },
        };

        const mockRepo: SettingsRepository = {
            getSettings: jest.fn().mockResolvedValue(mockData),
            updateSettings: jest.fn(),
        };

        const result = await getSettings(mockRepo);

        expect(mockRepo.getSettings).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockData);
    });
});

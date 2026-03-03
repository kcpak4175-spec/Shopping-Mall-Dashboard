import { NotificationSettings, createNotificationSettings } from './NotificationSettings';

describe('NotificationSettings Domain Entity', () => {
    it('유효한 데이터로 NotificationSettings 객체를 생성할 수 있다', () => {
        const validData = {
            lowStockThreshold: 10,
            isEmailEnabled: true,
            isSlackEnabled: false,
        };

        const result = createNotificationSettings(validData);
        expect(result.isSuccess).toBe(true);
        if (result.isSuccess) {
            expect(result.data.lowStockThreshold).toBe(10);
            expect(result.data.isEmailEnabled).toBe(true);
            expect(result.data.isSlackEnabled).toBe(false);
        }
    });

    it('재고 부족 기준(lowStockThreshold)이 음수값이면 생성에 실패한다', () => {
        const invalidData = {
            lowStockThreshold: -1,
            isEmailEnabled: true,
            isSlackEnabled: false,
        };

        const result = createNotificationSettings(invalidData);
        expect(result.isSuccess).toBe(false);
        if (!result.isSuccess) {
            expect(result.error).toBe('재고 부족 기준은 0 이상이어야 합니다.');
        }
    });

    it('재고 부족 기준이 소수점이면 정수로 변환되거나 에러를 발생한다 (여기서는 에러 정책 적용)', () => {
        const invalidData = {
            lowStockThreshold: 10.5,
            isEmailEnabled: true,
            isSlackEnabled: false,
        };

        const result = createNotificationSettings(invalidData);
        expect(result.isSuccess).toBe(false);
        if (!result.isSuccess) {
            expect(result.error).toBe('재고 부족 기준은 정수이어야 합니다.');
        }
    });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AlertSettingsForm } from './AlertSettingsForm';
import { NotificationSettings } from '../domain/NotificationSettings';

const mockNotification: NotificationSettings = {
    lowStockThreshold: 10,
    isEmailEnabled: true,
    isSlackEnabled: false,
};

describe('AlertSettingsForm Component', () => {
    it('알림 설정 정보가 화면에 올바르게 렌더링된다', () => {
        // LabelText 등으로 필드를 찾을 예정이므로, 컴포넌트가 적절한 label 태그를 가져야 함.
        const handleChange = jest.fn();
        render(<AlertSettingsForm data={mockNotification} onChange={handleChange} />);

        // 재고 부족 기준
        const thresholdInput = screen.getByLabelText('재고 부족 기준') as HTMLInputElement;
        expect(thresholdInput.value).toBe('10');

        // 이메일 알림
        const emailToggle = screen.getByLabelText('이메일 알림') as HTMLInputElement;
        expect(emailToggle.checked).toBe(true);

        // 슬랙 알림
        const slackToggle = screen.getByLabelText('슬랙 알림') as HTMLInputElement;
        expect(slackToggle.checked).toBe(false);
    });

    it('사용자가 재고 부족 기준을 변경하면 onChange가 호출된다', () => {
        const handleChange = jest.fn();
        render(<AlertSettingsForm data={mockNotification} onChange={handleChange} />);

        const thresholdInput = screen.getByLabelText('재고 부족 기준');
        fireEvent.change(thresholdInput, { target: { value: '20' } });

        expect(handleChange).toHaveBeenCalledWith({
            ...mockNotification,
            lowStockThreshold: 20,
        });
    });
});

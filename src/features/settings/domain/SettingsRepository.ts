import { StoreSettings } from './StoreSettings';
import { NotificationSettings } from './NotificationSettings';

export interface SettingsData {
    store: StoreSettings;
    notification: NotificationSettings;
}

export interface SettingsRepository {
    getSettings(): Promise<SettingsData>;
    updateSettings(data: SettingsData): Promise<void>;
}

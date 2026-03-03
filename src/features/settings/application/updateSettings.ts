import { SettingsRepository, SettingsData } from '../domain/SettingsRepository';

export async function updateSettings(repository: SettingsRepository, data: SettingsData): Promise<void> {
    await repository.updateSettings(data);
}

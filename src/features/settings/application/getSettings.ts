import { SettingsRepository, SettingsData } from '../domain/SettingsRepository';

export async function getSettings(repository: SettingsRepository): Promise<SettingsData> {
    return await repository.getSettings();
}

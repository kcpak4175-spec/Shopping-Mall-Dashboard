export type Currency = 'KRW' | 'USD';

export interface StoreSettings {
    storeName: string;
    logoUrl?: string;
    currency: Currency;
    isTaxIncluded: boolean;
}

export type Result<T> =
    | { isSuccess: true; data: T }
    | { isSuccess: false; error: string };

export function createStoreSettings(data: {
    storeName: string;
    logoUrl?: string;
    currency: Currency;
    isTaxIncluded: boolean;
}): Result<StoreSettings> {
    const trimmedName = data.storeName.trim();

    if (!trimmedName) {
        return { isSuccess: false, error: '스토어명은 필수 입력값입니다.' };
    }

    if (trimmedName.length > 50) {
        return { isSuccess: false, error: '스토어명은 최대 50자까지 입력 가능합니다.' };
    }

    return {
        isSuccess: true,
        data: {
            storeName: trimmedName,
            logoUrl: data.logoUrl,
            currency: data.currency,
            isTaxIncluded: data.isTaxIncluded,
        },
    };
}

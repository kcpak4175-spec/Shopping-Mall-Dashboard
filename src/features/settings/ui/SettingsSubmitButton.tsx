'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

interface SettingsSubmitButtonProps {
    label?: string;
}

export function SettingsSubmitButton({ label = '저장' }: SettingsSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <div className="fixed bottom-6 right-6">
            <button
                type="submit"
                disabled={pending}
                className={`px-6 py-3 rounded-full text-white font-medium shadow-lg transition-colors
          ${pending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {pending ? '저장 중...' : label}
            </button>
        </div>
    );
}

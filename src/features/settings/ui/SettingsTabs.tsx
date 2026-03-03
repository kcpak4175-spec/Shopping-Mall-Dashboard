'use client';

import React from 'react';

const tabs = [
    { name: '스토어 정보', current: true },
    { name: '알림 설정', current: false },
    { name: '팀 관리', current: false },
    { name: '결제', current: false },
];

export function SettingsTabs() {
    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${tab.current
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
                        aria-current={tab.current ? 'page' : undefined}
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>
        </div>
    );
}

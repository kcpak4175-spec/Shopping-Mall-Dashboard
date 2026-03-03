import React, { useState } from 'react';

interface AiAssistantSectionProps {
    onGenerateDescription: () => Promise<void>;
    onRecommendSeoTags: () => Promise<void>;
}

export default function AiAssistantSection({ onGenerateDescription, onRecommendSeoTags }: AiAssistantSectionProps) {
    const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
    const [isRecommendingTags, setIsRecommendingTags] = useState(false);

    const handleGenerateDesc = async () => {
        setIsGeneratingDesc(true);
        try {
            await onGenerateDescription();
        } finally {
            setIsGeneratingDesc(false);
        }
    };

    const handleRecommendTags = async () => {
        setIsRecommendingTags(true);
        try {
            await onRecommendSeoTags();
        } finally {
            setIsRecommendingTags(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-sm border border-indigo-100 mt-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h2 className="text-lg font-bold text-indigo-900">AI 도우미</h2>
            </div>

            <p className="text-sm text-indigo-700 mb-6">
                상품명과 기본 정보를 입력하고 AI의 도움을 받아보세요. 매력적인 설명과 검색 최적화 태그를 자동으로 생성해 드립니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    onClick={handleGenerateDesc}
                    disabled={isGeneratingDesc}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                    {isGeneratingDesc ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>생성 중...</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" /></svg>
                            <span>AI로 상품 설명 생성</span>
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleRecommendTags}
                    disabled={isRecommendingTags}
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                    {isRecommendingTags ? (
                        <>
                            <div className="w-5 h-5 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
                            <span>추천 중...</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                            <span>SEO 태그 추천</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

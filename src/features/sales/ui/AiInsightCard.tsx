import { SalesInsight } from '../domain/Sales';
import { Sparkles } from 'lucide-react';

interface AiInsightCardProps {
    insights: SalesInsight[];
}

export function AiInsightCard({ insights }: AiInsightCardProps) {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-900/40 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-sm w-full">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-indigo-100">AI 인사이트</h3>
            </div>

            <ul className="space-y-4">
                {insights.map((insight) => (
                    <li key={insight.id} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-2"></span>
                        <p className="text-gray-900 dark:text-gray-300 leading-relaxed text-sm">
                            {insight.content}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

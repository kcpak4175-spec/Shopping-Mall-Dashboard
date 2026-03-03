import { SalesInsight } from '../domain/Sales';
import { Sparkles } from 'lucide-react';

interface AiInsightCardProps {
    insights: SalesInsight[];
}

export function AiInsightCard({ insights }: AiInsightCardProps) {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 shadow-sm w-full">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">AI 인사이트</h3>
            </div>

            <ul className="space-y-4">
                {insights.map((insight) => (
                    <li key={insight.id} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></span>
                        <p className="text-gray-900 leading-relaxed text-sm">
                            {insight.content}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

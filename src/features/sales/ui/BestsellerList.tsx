import { Bestseller } from '../domain/Sales';
import { Trophy } from 'lucide-react';

interface BestsellerListProps {
    data: Bestseller[];
}

export function BestsellerList({ data }: BestsellerListProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm w-full h-full">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">베스트셀러 (Top 5)</h3>
            </div>

            <div className="flex flex-col gap-4">
                {data.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${item.rank <= 3 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>
                                {item.rank}
                            </div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{item.productName}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {item.salesVolume.toLocaleString()} <span className="text-xs font-normal">개</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

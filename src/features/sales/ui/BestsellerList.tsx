import { Bestseller } from '../domain/Sales';
import { Trophy } from 'lucide-react';

interface BestsellerListProps {
    data: Bestseller[];
}

export function BestsellerList({ data }: BestsellerListProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm w-full h-full">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-gray-900">베스트셀러 (Top 5)</h3>
            </div>

            <div className="flex flex-col gap-4">
                {data.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${item.rank <= 3 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                                {item.rank}
                            </div>
                            <span className="font-medium text-gray-800">{item.productName}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-600">
                            {item.salesVolume.toLocaleString()} <span className="text-xs font-normal">개</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

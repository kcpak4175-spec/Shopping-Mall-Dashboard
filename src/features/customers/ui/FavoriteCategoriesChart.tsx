import React from 'react';
import { FavoriteCategory } from '../domain/Customer';

interface Props {
    categories: FavoriteCategory[];
}

export const FavoriteCategoriesChart: React.FC<Props> = ({ categories }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">선호 카테고리</h3>

            <div className="space-y-5">
                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-slate-700">{category.name}</span>
                            <span className="font-bold text-slate-800">{category.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${category.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="py-4 text-center text-slate-500 text-sm">
                        데이터가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

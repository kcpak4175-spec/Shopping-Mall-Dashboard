import React, { useState } from 'react';

interface OrderSearchFilterProps {
    initialSearchQuery?: string;
    initialStartDate?: string;
    initialEndDate?: string;
    onSearch: (filters: { searchQuery?: string; startDate?: string; endDate?: string }) => void;
}

const OrderSearchFilter: React.FC<OrderSearchFilterProps> = ({
    initialSearchQuery = '',
    initialStartDate = '',
    initialEndDate = '',
    onSearch,
}) => {
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({
            searchQuery: searchQuery.trim() || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        });
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex-1 min-w-[200px]">
                <label htmlFor="searchQuery" className="sr-only">검색어</label>
                <input
                    id="searchQuery"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="주문번호 또는 고객명 통합검색"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex items-center gap-2">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        시작일
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <span className="text-gray-500 self-end mb-2">~</span>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        종료일
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
                검색
            </button>
        </form>
    );
};

export default OrderSearchFilter;

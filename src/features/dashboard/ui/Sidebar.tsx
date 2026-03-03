import Link from 'next/link';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart2,
    Settings,
} from 'lucide-react';

const menuItems = [
    { name: '대시보드', href: '/', icon: LayoutDashboard },
    { name: '상품관리', href: '/products', icon: Package },
    { name: '주문관리', href: '/orders', icon: ShoppingCart },
    { name: '고객관리', href: '/customers', icon: Users },
    { name: '분석', href: '/analytics', icon: BarChart2 },
    { name: '설정', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-blue-600">Mall Admin</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

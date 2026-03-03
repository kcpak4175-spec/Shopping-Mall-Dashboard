import DashboardLayout from '../../src/features/dashboard/ui/DashboardLayout';

export default function RootDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardLayout>{children}</DashboardLayout>;
}

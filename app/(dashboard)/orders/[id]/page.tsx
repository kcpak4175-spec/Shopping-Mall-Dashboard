import { ApiOrderRepository } from '@/features/orders/infra/ApiOrderRepository';
import { getOrderDetail } from '@/features/orders/application/getOrderDetail';
import OrderDetailClient from '@/features/orders/ui/detail/OrderDetailClient';

interface OrderDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
    const { id } = await params;
    const repository = new ApiOrderRepository();
    const order = await getOrderDetail(id, repository);

    return <OrderDetailClient order={order} />;
}

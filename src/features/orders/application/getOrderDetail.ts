import { OrderDetail } from '../domain/Order';
import { OrderRepository } from '../domain/OrderRepository';

export async function getOrderDetail(id: string, repository: OrderRepository): Promise<OrderDetail> {
    return repository.getOrderDetail(id);
}

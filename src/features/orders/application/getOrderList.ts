import { Order } from '../domain/Order';
import { OrderFilter, OrderRepository } from '../domain/OrderRepository';

export async function getOrderList(
    repository: OrderRepository,
    filter: OrderFilter
): Promise<Order[]> {
    return await repository.getOrders(filter);
}

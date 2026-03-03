import { OrderRepository, OrderStats } from '../domain/OrderRepository';

export async function getOrderStats(repository: OrderRepository): Promise<OrderStats> {
    return await repository.getOrderStats();
}

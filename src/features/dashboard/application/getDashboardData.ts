import { DashboardRepository, DashboardData } from '../domain/types';

export const getDashboardData = async (repository: DashboardRepository): Promise<DashboardData> => {
    return await repository.getDashboardData();
};

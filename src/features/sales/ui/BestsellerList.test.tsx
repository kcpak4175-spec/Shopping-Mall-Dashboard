import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BestsellerList } from './BestsellerList';

describe('BestsellerList', () => {
    const mockData = [
        { id: '1', rank: 1, productName: 'Test Product A', salesVolume: 100 },
        { id: '2', rank: 2, productName: 'Test Product B', salesVolume: 80 },
    ];

    it('should render the title', () => {
        render(<BestsellerList data={mockData} />);
        expect(screen.getByText('베스트셀러 (Top 5)')).toBeInTheDocument();
    });

    it('should render the correct number of items', () => {
        render(<BestsellerList data={mockData} />);
        expect(screen.getByText('Test Product A')).toBeInTheDocument();
        expect(screen.getByText(/100/)).toBeInTheDocument();
    });
});

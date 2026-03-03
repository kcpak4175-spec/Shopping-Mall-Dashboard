import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AiInsightCard } from './AiInsightCard';

describe('AiInsightCard', () => {
    const mockInsights = [
        { id: '1', content: 'Insight 1' },
        { id: '2', content: 'Insight 2' },
        { id: '3', content: 'Insight 3' },
    ];

    it('should render the title correctly', () => {
        render(<AiInsightCard insights={mockInsights} />);
        expect(screen.getByText('AI 인사이트')).toBeInTheDocument();
    });

    it('should render the given insights as a list', () => {
        render(<AiInsightCard insights={mockInsights} />);
        expect(screen.getByText('Insight 1')).toBeInTheDocument();
        expect(screen.getByText('Insight 2')).toBeInTheDocument();
    });
});

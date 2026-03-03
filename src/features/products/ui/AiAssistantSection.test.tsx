import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AiAssistantSection from './AiAssistantSection';

describe('AiAssistantSection', () => {
    it('renders the section buttons', () => {
        render(<AiAssistantSection onGenerateDescription={jest.fn()} onRecommendSeoTags={jest.fn()} />);

        expect(screen.getByText('AI로 상품 설명 생성')).toBeInTheDocument();
        expect(screen.getByText('SEO 태그 추천')).toBeInTheDocument();
    });

    it('handles description generation click and loading state', async () => {
        const user = userEvent.setup();
        const mockGenerate = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(<AiAssistantSection onGenerateDescription={mockGenerate} onRecommendSeoTags={jest.fn()} />);

        const button = screen.getByRole('button', { name: /AI로 상품 설명 생성/i });
        await user.click(button);

        expect(mockGenerate).toHaveBeenCalledTimes(1);
        expect(screen.getByText('생성 중...')).toBeInTheDocument();
        expect(button).toBeDisabled();

        await waitFor(() => {
            expect(screen.queryByText('생성 중...')).not.toBeInTheDocument();
        });
        expect(button).not.toBeDisabled();
    });

    it('handles SEO tag recommendation click and loading state', async () => {
        const user = userEvent.setup();
        const mockRecommend = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(<AiAssistantSection onGenerateDescription={jest.fn()} onRecommendSeoTags={mockRecommend} />);

        const button = screen.getByRole('button', { name: /SEO 태그 추천/i });
        await user.click(button);

        expect(mockRecommend).toHaveBeenCalledTimes(1);
        expect(screen.getByText('추천 중...')).toBeInTheDocument();
        expect(button).toBeDisabled();

        await waitFor(() => {
            expect(screen.queryByText('추천 중...')).not.toBeInTheDocument();
        });
        expect(button).not.toBeDisabled();
    });
});

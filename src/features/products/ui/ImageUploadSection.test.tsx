import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageUploadSection from './ImageUploadSection';

describe('ImageUploadSection', () => {
    const mockOnUpload = jest.fn();
    const mockOnRemove = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the dropzone and previews', () => {
        render(<ImageUploadSection images={['/img1.png']} onUpload={mockOnUpload} onRemove={mockOnRemove} />);

        expect(screen.getByText(/상품 이미지/)).toBeInTheDocument();
        expect(screen.getByAltText('미리보기 1')).toBeInTheDocument();
        expect(screen.getByTestId('dropzone')).toBeInTheDocument();
    });

    it('calls onUpload when files are selected', async () => {
        const user = userEvent.setup();
        render(<ImageUploadSection images={[]} onUpload={mockOnUpload} onRemove={mockOnRemove} />);

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const input = screen.getByTestId('file-input');

        await user.upload(input, file);

        expect(mockOnUpload).toHaveBeenCalledTimes(1);
        expect(mockOnUpload.mock.calls[0][0][0]).toStrictEqual(file);
    });

    it('calls onRemove when delete button is clicked', async () => {
        const user = userEvent.setup();
        render(<ImageUploadSection images={['/img1.png']} onUpload={mockOnUpload} onRemove={mockOnRemove} />);

        const deleteButton = screen.getByRole('button', { name: '삭제' });
        await user.click(deleteButton);

        expect(mockOnRemove).toHaveBeenCalledWith(0);
    });

    it('hides dropzone when there are 3 images', () => {
        render(<ImageUploadSection images={['/1.png', '/2.png', '/3.png']} onUpload={mockOnUpload} onRemove={mockOnRemove} />);

        expect(screen.getAllByRole('img').length).toBe(3);
        expect(screen.queryByTestId('dropzone')).not.toBeInTheDocument();
    });
});

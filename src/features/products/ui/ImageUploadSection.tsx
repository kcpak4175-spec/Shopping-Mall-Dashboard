import React, { useRef, useState } from 'react';

interface ImageUploadSectionProps {
    images: string[];
    onUpload: (files: File[]) => void;
    onRemove: (index: number) => void;
}

export default function ImageUploadSection({ images, onUpload, onRemove }: ImageUploadSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(Array.from(e.target.files));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUpload(Array.from(e.dataTransfer.files));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">상품 이미지 (최대 3개)</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Upload Zone */}
                {images.length < 3 && (
                    <div
                        data-testid="dropzone"
                        className={`col-span-1 aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 bg-gray-50'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                            <span className="text-gray-400 text-xl">+</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">이미지 추가</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            data-testid="file-input"
                        />
                    </div>
                )}

                {/* Previews */}
                {images.map((url, index) => (
                    <div key={index} className="col-span-1 aspect-square rounded-lg overflow-hidden relative group border border-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`미리보기 ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                aria-label="삭제"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

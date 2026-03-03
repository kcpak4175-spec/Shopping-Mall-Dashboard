'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { CreateProductDto, ProductCategory } from '../domain/Product';
import { PRODUCT_CATEGORIES } from '../domain/productFormSchema';
import ImageUploadSection from './ImageUploadSection';
import AiAssistantSection from './AiAssistantSection';
import { useRouter } from 'next/navigation';

interface ProductCreateFormProps {
    onSubmit: (data: Omit<CreateProductDto, 'id' | 'createdAt'>) => Promise<boolean>;
    onUploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
    onGenerateDesc: (name: string, category: string) => Promise<string>;
    onRecommendTags: (name: string, description: string) => Promise<string[]>;
    initialValues?: {
        name: string;
        description: string;
        category: ProductCategory;
        price: number;
        stock: number;
    };
    initialImageUrls?: string[];
}

function getErrorMessages(errors: unknown[]): string[] {
    return errors
        .map((e) => {
            if (typeof e === 'string') return e;
            if (e && typeof e === 'object' && 'message' in e) return String((e as { message: string }).message);
            return String(e);
        })
        .filter(Boolean);
}

export default function ProductCreateForm({ onSubmit, onUploadImage, onGenerateDesc, onRecommendTags, initialValues, initialImageUrls }: ProductCreateFormProps) {
    const router = useRouter();
    const [images, setImages] = React.useState<string[]>(initialImageUrls || []);
    const [imageFiles, setImageFiles] = React.useState<File[]>([]);
    const [tags, setTags] = React.useState<string[]>([]);

    const form = useForm({
        defaultValues: {
            name: initialValues?.name || '',
            description: initialValues?.description || '',
            category: (initialValues?.category || '전체') as ProductCategory,
            price: initialValues?.price || 0,
            stock: initialValues?.stock || 0,
        },
        onSubmit: async ({ value }) => {
            // 1. 이미지 파일들을 Supabase Storage에 업로드
            const uploadedUrls: string[] = [];
            for (const file of imageFiles) {
                const result = await onUploadImage(file);
                if (result.success && result.url) {
                    uploadedUrls.push(result.url);
                } else {
                    alert(result.error || '이미지 업로드에 실패했습니다.');
                    return;
                }
            }

            // 3. 기존 유지 이미지 + 새로 업로드된 이미지 결합
            const existingUrls = images.filter(url => !url.startsWith('blob:'));
            const finalImageUrls = [...existingUrls, ...uploadedUrls];

            // 4. 업로드된 URL로 상품 생성/수정
            const success = await onSubmit({
                name: value.name,
                category: value.category,
                price: value.price,
                stock: value.stock,
                description: `${value.description}${tags.length > 0 ? `\n\n태그: ${tags.join(', ')}` : ''}`,
                imageUrl: finalImageUrls[0] || '',
                imageUrls: finalImageUrls,
            });

            if (success) {
                router.push('/products');
            }
        },
    });

    const handleUpload = (files: File[]) => {
        // 로컬 미리보기용 URL 생성
        const newUrls = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newUrls].slice(0, 3));
        // 업로드용 File 객체 보관
        setImageFiles(prev => [...prev, ...files].slice(0, 3));
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleGenerateDesc = async () => {
        const name = form.getFieldValue('name');
        const category = form.getFieldValue('category');
        if (!name) {
            alert('상품명을 먼저 입력해주세요.');
            return;
        }
        try {
            const desc = await onGenerateDesc(name, category);
            form.setFieldValue('description', desc);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleRecommendTags = async () => {
        const name = form.getFieldValue('name');
        const description = form.getFieldValue('description');
        if (!name) {
            alert('상품명을 먼저 입력해주세요.');
            return;
        }
        try {
            const recommendedTags = await onRecommendTags(name, description);
            setTags(recommendedTags);
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="max-w-4xl mx-auto pb-12"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">상품 등록</h1>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
                    >
                        취소
                    </button>
                    <form.Subscribe
                        selector={(state) => state.isSubmitting}
                        children={(isSubmitting) => (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? '저장 중...' : '저장'}
                            </button>
                        )}
                    />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">기본 정보</h2>

                <div className="space-y-5">
                    <form.Field
                        name="name"
                        validators={{
                            onSubmit: z.string().min(1, '상품명을 입력해주세요.').max(100, '상품명은 100자 이하로 입력해주세요.'),
                        }}
                    >
                        {(field) => {
                            const errors = getErrorMessages(field.state.meta.errors);
                            return (
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        상품명 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="상품명을 입력하세요"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow ${errors.length > 0 ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.length > 0 && (
                                        <p className="mt-1 text-sm text-red-600">{errors.join(', ')}</p>
                                    )}
                                </div>
                            );
                        }}
                    </form.Field>

                    <form.Field
                        name="description"
                        validators={{
                            onSubmit: z.string().max(1000, '상품 설명은 1000자 이하로 입력해주세요.'),
                        }}
                    >
                        {(field) => {
                            const errors = getErrorMessages(field.state.meta.errors);
                            return (
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        상품 설명
                                    </label>
                                    <textarea
                                        id="description"
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        rows={4}
                                        placeholder="상품에 대한 상세 설명을 입력하세요"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-y ${errors.length > 0 ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.length > 0 && (
                                        <p className="mt-1 text-sm text-red-600">{errors.join(', ')}</p>
                                    )}
                                </div>
                            );
                        }}
                    </form.Field>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <form.Field name="category">
                            {(field) => (
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                        카테고리
                                    </label>
                                    <select
                                        id="category"
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value as ProductCategory)}
                                        onBlur={field.handleBlur}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                    >
                                        {PRODUCT_CATEGORIES.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </form.Field>

                        <form.Field
                            name="price"
                            validators={{
                                onSubmit: z.number().min(0, '가격은 0원 이상이어야 합니다.'),
                            }}
                        >
                            {(field) => {
                                const errors = getErrorMessages(field.state.meta.errors);
                                return (
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                            가격 (원)
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber || 0)}
                                            onBlur={field.handleBlur}
                                            placeholder="0"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.length > 0 ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.length > 0 && (
                                            <p className="mt-1 text-sm text-red-600">{errors.join(', ')}</p>
                                        )}
                                    </div>
                                );
                            }}
                        </form.Field>

                        <form.Field
                            name="stock"
                            validators={{
                                onSubmit: z.number().int('재고는 정수여야 합니다.').min(0, '재고는 0 이상이어야 합니다.'),
                            }}
                        >
                            {(field) => {
                                const errors = getErrorMessages(field.state.meta.errors);
                                return (
                                    <div>
                                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                                            재고 수량
                                        </label>
                                        <input
                                            type="number"
                                            id="stock"
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber || 0)}
                                            onBlur={field.handleBlur}
                                            placeholder="0"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.length > 0 ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.length > 0 && (
                                            <p className="mt-1 text-sm text-red-600">{errors.join(', ')}</p>
                                        )}
                                    </div>
                                );
                            }}
                        </form.Field>
                    </div>

                    {tags.length > 0 && (
                        <div className="mt-2">
                            <span className="text-sm font-medium text-gray-700 block mb-2">추천된 SEO 태그:</span>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ImageUploadSection images={images} onUpload={handleUpload} onRemove={handleRemoveImage} />
            <AiAssistantSection onGenerateDescription={handleGenerateDesc} onRecommendSeoTags={handleRecommendTags} />
        </form>
    );
}

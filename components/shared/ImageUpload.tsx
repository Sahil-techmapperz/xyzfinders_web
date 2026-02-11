'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
    maxSizeMB?: number;
    initialImages?: string[]; // Add support for initial images in edit mode
}

export default function ImageUpload({
    onImagesChange,
    maxImages = 5,
    maxSizeMB = 5,
    initialImages = []
}: ImageUploadProps) {
    const [previews, setPreviews] = useState<string[]>(initialImages);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update previews when initialImages change (for edit mode)
    useEffect(() => {
        if (initialImages.length > 0) {
            setPreviews(initialImages);
        }
    }, [initialImages]);

    const validateFile = (file: File): boolean => {
        // Check file type
        if (!file.type.startsWith('image/')) {
            toast.error(`${file.name} is not an image file`);
            return false;
        }

        // Check file size
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
            toast.error(`${file.name} is larger than ${maxSizeMB}MB`);
            return false;
        }

        return true;
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;

        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(validateFile);

        if (previews.length + validFiles.length > maxImages) {
            toast.error(`You can only upload up to ${maxImages} images`);
            return;
        }

        try {
            const base64Images = await Promise.all(
                validFiles.map(file => convertToBase64(file))
            );

            const newPreviews = [...previews, ...base64Images];
            setPreviews(newPreviews);
            onImagesChange(newPreviews);
        } catch (error) {
            console.error('Error converting images:', error);
            toast.error('Failed to process images');
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    const removeImage = (index: number) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
        onImagesChange(newPreviews);
    };

    return (
        <div className="space-y-4">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition cursor-pointer ${isDragging
                    ? 'border-brand-orange bg-orange-50'
                    : 'border-gray-300 hover:border-brand-orange'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
                <i className="ri-image-add-line text-4xl text-brand-orange mb-3 block"></i>
                <p className="text-gray-600 font-medium mb-1">
                    {isDragging ? 'Drop images here' : 'Upload images or Drop a file'}
                </p>
                <p className="text-sm text-gray-400">
                    Max {maxImages} images, up to {maxSizeMB}MB each
                </p>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <i className="ri-close-line text-sm"></i>
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-brand-orange text-white text-xs px-2 py-1 rounded">
                                    Primary
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

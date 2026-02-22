import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  multiple?: boolean;
  maxFiles?: number;
  onUploadComplete?: (urls: string[]) => void;
  existingImages?: string[];
}

export const ImageUpload = ({ 
  multiple = false, 
  maxFiles = 10,
  onUploadComplete,
  existingImages = []
}: ImageUploadProps) => {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check file limit
    if (images.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      
      if (multiple) {
        Array.from(files).forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append('image', files[0]);
      }

      const endpoint = multiple ? '/api/upload/multiple' : '/api/upload/single';
      const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        const newUrls = multiple ? data.urls : [data.url];
        const fullUrls = newUrls.map((url: string) => `${apiUrl}${url}`);
        const updatedImages = [...images, ...fullUrls];
        setImages(updatedImages);
        onUploadComplete?.(updatedImages);
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onUploadComplete?.(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || images.length >= maxFiles}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxFiles}
          className="w-full sm:w-auto"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Images'}
        </Button>
        <span className="text-sm text-muted-foreground">
          {images.length} / {maxFiles} images
        </span>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded">
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            No images uploaded yet
          </p>
          <p className="text-xs text-muted-foreground">
            Click the button above to upload images
          </p>
        </div>
      )}
    </div>
  );
};

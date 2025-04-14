'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface BlogImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

export default function BlogImageUploader({ onUploadComplete }: BlogImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `blog-heads/${fileName}`;

    const { error } = await supabase.storage
      .from('blogs-images')
      .upload(filePath, file);

    if (error) {
      alert('Upload failed: ' + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from('blogs-images')
      .getPublicUrl(filePath);

    if (data?.publicUrl) {
      setPreviewUrl(data.publicUrl);
      onUploadComplete(data.publicUrl);
    }

    setUploading(false);
  };

  return (
    <div className="mb-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="mt-2 rounded-md w-full max-h-40 object-cover" />
      )}
    </div>
  );
}

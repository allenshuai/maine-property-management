'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import BlogImageUploader from './BlogImageUpload';

interface EditBlogProps {
  isOpen: boolean;
  onClose: () => void;
  blogId: string;
  onBlogUpdated: () => void;
}

export default function EditBlog({ isOpen, onClose, blogId, onBlogUpdated }: EditBlogProps) {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && blogId) {
      const fetchBlog = async () => {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', blogId)
          .single();

        if (error) {
          alert('Failed to fetch blog: ' + error.message);
        } else if (data) {
          setTitle(data.title || '');
          setAuthorName(data.author_name || '');
          setExcerpt(data.excerpt || '');
          setContent(data.content || '');
          setImageUrl(data.image_url || '');
        }
      };

      fetchBlog();
    }
  }, [isOpen, blogId]);

  const handleUpdate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from('blogs')
      .update({
        title,
        author_name: authorName,
        excerpt,
        content,
        image_url: imageUrl,
      })
      .eq('id', blogId);

    setLoading(false);

    if (error) {
      alert('Failed to update blog: ' + error.message);
    } else {
      onBlogUpdated();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg h-[650px] flex flex-col overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Blog</h2>

        <input
          type="text"
          placeholder="Title"
          className="border px-3 py-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author Name"
          className="border px-3 py-2 rounded mb-3"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <textarea
          placeholder="Short Description"
          className="border px-3 py-2 rounded mb-3 resize-none"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="border px-3 py-2 rounded flex-1 resize-none overflow-y-auto mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Existing image preview */}
        {imageUrl && (
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Current Image:</p>
            <img
              src={imageUrl}
              alt="Blog Header"
              className="w-full max-h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        <BlogImageUploader onUploadComplete={(url) => setImageUrl(url)} />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

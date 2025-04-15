'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; 
import BlogImageUploader from './BlogImageUpload';

interface AddBlogProps {
  onBlogAdded: () => void;
}

export default function AddBlog({ onBlogAdded }: AddBlogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);

    const { error } = await supabase.from('blogs').insert([
      { 
        title, 
        content,
        image_url: imageUrl,
        author_name: authorName,
        excerpt,
      }
    ]);

    setLoading(false);

    if (error) {
      alert('Failed to add blog: ' + error.message);
    } else {
      onBlogAdded();
      setIsOpen(false);
      setTitle('');
      setContent('');
      setAuthorName('');
      setExcerpt('');
      setImageUrl('');
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white w-32 text-gray-600 px-4 py-2 border border-gray-300 rounded-md hover:text-white hover:bg-amber-800 cursor-pointer"
        >
          Publish NEW
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg h-[600px] flex flex-col overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add Blog</h2>
            
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

            <BlogImageUploader onUploadComplete={(url) => setImageUrl(url)} />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

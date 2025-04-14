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
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleAdd = async () => {
    setLoading(true);

    const { error } = await supabase.from('blogs').insert([
      { 
        title, 
        content,
        image_url: imageUrl,
     }
    ]);

    setLoading(false);

    if (error) {
      alert('Failed to add blog: ' + error.message);
    } else {
      onBlogAdded(); // refresh parent table
      setIsOpen(false); // close modal
      setTitle('');
      setContent('');
			setImageUrl('');
    }
  };

  return (
    <>
      <div className="">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white w-32 text-gray-600 px-4 py-2 border border-gray-300 rounded-md hover:text-white hover:bg-amber-800 cursor-pointer"
        >
          Publish NEW
        </button>
      </div>

      {/* className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800" */}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg h-[400px] flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Add Blog</h2>
            <input
              type="text"
              placeholder="Title"
              className="border px-3 py-2 rounded mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="border px-3 py-2 rounded flex-1 resize-none overflow-y-auto mb-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
						<BlogImageUploader onUploadComplete={(url) => setImageUrl(url)} />
            <div className="flex justify-end gap-2">
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

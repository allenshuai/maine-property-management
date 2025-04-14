'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Blog {
  id: number;
  title: string;
  created_at: string;
  image_url?: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, created_at, image_url')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error.message);
      } else {
        setBlogs(data || []);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col md:flex-row gap-6 items-center md:items-start"
          >
            {/* Left: Blog Image */}
            <div className="w-full md:w-1/2 h-64 bg-gray-100 flex justify-center items-center overflow-hidden rounded">
              {blog.image_url ? (
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>

            {/* Right: Blog Info */}
            <div className="w-full md:w-1/2 text-gray-700">
              <p className="text-sm text-gray-500 mb-1">
                {new Date(blog.created_at).toLocaleDateString('en-US')}
              </p>
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

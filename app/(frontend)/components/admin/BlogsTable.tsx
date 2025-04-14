'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AddBlog from './AddBlog';
// import { Input } from '@/components/ui/input'; // optional custom Input component
import { MdSearch } from 'react-icons/md';


interface Blog {
  id: string;
  title: string;
  created_at: string;
}

interface BlogsTableProps {
  refreshSignal?: boolean;
  onChange: () => void;
}

export default function BlogsTable({ refreshSignal, onChange }: BlogsTableProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('blogs').select('id, title, created_at');
    if (error) {
      console.error('Error fetching blogs:', error.message);
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [refreshSignal]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this blog post?');
    if (!confirm) return;

    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      alert('Failed to delete blog: ' + error.message);
    } else {
      onChange?.();
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    (blog.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (blog.id?.toString().toLowerCase() || '').includes(search.toLowerCase())
  );
  

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative flex justify-between items-center">
        <MdSearch className="absolute left-3 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search by ID or Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
        />
        <AddBlog onBlogAdded={onChange} />
      </div>


      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-300 bg-white shadow-sm">
          <thead>
            <tr className="text-left">
              <th className="p-3 border-b border-b-gray-300">ID</th>
              <th className="p-3 border-b border-b-gray-300">Title</th>
              <th className="p-3 border-b border-b-gray-300">Date Created</th>
              <th className="p-3 border-b border-b-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-600 truncate max-w-[150px]">{blog.id}</td>
                <td className="p-3">{blog.title}</td>
                <td className="p-3 text-sm text-gray-500">{new Date(blog.created_at).toLocaleString()}</td>
                <td className="p-3 text-right space-x-2">
                  <button className="text-gray-600 hover:underline">Edit</button>
                  <button
                    className="text-gray-600 hover:underline"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredBlogs.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  excerpt?: string;
  author_name?: string;
  image_url?: string;
  created_at: string;
}

const PAGE_SIZE = 6;

export default function LatestBlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);

    // Get total blog count first
    const { count } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true });

    if (count) setTotalPages(Math.ceil(count / PAGE_SIZE));

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Failed to fetch blogs:', error.message);
    } else {
      setBlogs(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Blog</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog.id} className="flex flex-col">
									<Link href={`/blogs/${blog.id}`}>
										<img
											src={blog.image_url || '/placeholder.png'}
											alt={blog.title}
											className="w-full h-52 object-cover rounded-xl mb-4"
										/>
									</Link>
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
									<Link href={`/blogs/${blog.id}`}>
										<h3 className="text-xl font-semibold text-gray-900 mb-1">
											{blog.title}
										</h3>
									</Link>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <p className="text-sm text-gray-700 mt-auto">
                    Written by {blog.author_name || 'Anonymous'}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
							<div className="border-t border-gray-200 mt-12 pt-4">
								<div className="flex justify-between items-center text-sm text-gray-600">
									{/* Left Button */}
									<button
										disabled={page === 1}
										onClick={() => handlePageChange(page - 1)}
										className="hover:underline disabled:text-gray-400 flex items-center gap-1"
									>
										<MdArrowBack className="text-lg" />
										<span>Previous</span>
									</button>

									<div className="flex items-center gap-1">
										{Array.from({ length: totalPages }, (_, i) => (
											<button
												key={i}
												onClick={() => handlePageChange(i + 1)}
												className={`w-8 h-8 rounded-md flex items-center justify-center ${
													page === i + 1
														? 'bg-gray-800 text-white'
														: 'text-gray-700 hover:bg-gray-100'
												}`}
											>
												{i + 1}
											</button>
										))}
									</div>

									<button
										disabled={page === totalPages}
										onClick={() => handlePageChange(page + 1)}
										className="hover:underline disabled:text-gray-400 flex items-center gap-1"
									>
										<span>Next</span>
										<MdArrowForward className="text-lg" />
									</button>
								</div>
							</div>

          </>
        )}
      </div>
    </section>
  );
}

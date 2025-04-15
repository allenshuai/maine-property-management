'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  excerpt?: string;
  author_name?: string;
  image_url?: string;
  created_at: string;
  likes: number;
}

export default function TopBlogsSection() {
  const [topBlogs, setTopBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchTopBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('likes', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching top blogs:', error.message);
      } else {
        setTopBlogs(data || []);
      }
    };

    fetchTopBlogs();
  }, []);

  if (topBlogs.length === 0) return null;

  const [mainBlog, ...sideBlogs] = topBlogs;

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Top Blogs</h2>

        <div className="flex flex-col md:flex-row gap-6">
				<div className="md:h-[500px] flex flex-col md:flex-row gap-6">
  {/* LEFT */}
  <div className="md:w-1/2 flex flex-col h-full justify-between">
    {mainBlog.image_url && (
      <Link href={`/blogs/${mainBlog.id}`}>
			<div className="relative w-full h-[300px] rounded-xl overflow-hidden">
				<Image
					src={mainBlog.image_url}
					alt={mainBlog.title}
					fill
					className="object-cover"
				/>
			</div>
		</Link>
    )}
    <div className="flex flex-col justify-between flex-1 mt-4">
      <div>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(mainBlog.created_at).toLocaleDateString()}
        </p>
				<Link href={`/blog/${mainBlog.id}`}>
					<h3 className="text-2xl font-semibold text-gray-900 mb-2">
						{mainBlog.title}
						
					</h3>
				</Link>
        <p className="text-gray-600 mb-3">{mainBlog.excerpt}</p>
      </div>
      <p className="text-sm text-gray-700 mt-auto font-medium">
        Written by {mainBlog.author_name || 'Anonymous'}
      </p>
    </div>
  </div>

  {/* RIGHT */}
  <div className="md:w-1/2 flex flex-col justify-between gap-6 h-full">
    {sideBlogs.map((blog) => (
      <div
        key={blog.id}
        className="flex gap-4 h-1/2"
      >
        {blog.image_url && (
					<Link href={`/blogs/${blog.id}`}>
						<div className="relative w-[216px] h-full rounded-xl overflow-hidden">
							<Image
								src={blog.image_url}
								alt={blog.title}
								fill
								className="object-cover"
							/>
						</div>	
					</Link>
        )}

        <div className="flex flex-col justify-between flex-1">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              {new Date(blog.created_at).toLocaleDateString()}
            </p>
						<Link href={`/blog/${blog.id}`}>
							<h4 className="text-lg font-semibold text-gray-900 mb-1">
								{blog.title}
							</h4>
						</Link>
            <p className="text-sm text-gray-600 line-clamp-2">
              {blog.excerpt}
            </p>
          </div>
          <p className="text-sm text-gray-700 mt-auto">
            Written by {blog.author_name || 'Anonymous'}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


			</div>

      </div>
    </section>
  );
}

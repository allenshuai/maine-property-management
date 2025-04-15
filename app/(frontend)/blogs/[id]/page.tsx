import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

// type BlogPageParams = {
//   params: {
//     id: string;
//   };
// };

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !blog) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full max-h-[400px] object-cover rounded-xl mb-4"
        />
      )}
      <p className="text-sm text-gray-500 mb-6">
        Written by {blog.author_name} – {new Date(blog.created_at).toLocaleDateString('en-US')}
      </p>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-6">
            {blog.title}
          </h1>
        </div>
        <div className="md:w-2/3 text-gray-700 space-y-6 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </div>
  );
}

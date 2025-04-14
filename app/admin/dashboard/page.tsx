'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
// import AddBlog from '@/app/(frontend)/components/admin/AddBlog';
import BlogsTable from '@/app/(frontend)/components/admin/BlogsTable';
import Image from 'next/image';
import { 
  MdDashboard, 
  MdArticle, 
  MdPeople, 
  MdSettings } from 'react-icons/md';


export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'users' | 'settings'>('dashboard');

  const [refreshBlogs, setRefreshBlogs] = useState(false);
  const triggerRefresh = () => setRefreshBlogs(prev => !prev);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);  
  };

  useEffect(() => {
    const checkSessionAndInitTab = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin');
      } else {
        const urlTab = searchParams.get('tab');
        if (urlTab && ['dashboard', 'blogs', 'users', 'settings'].includes(urlTab)) {
          setActiveTab(urlTab as typeof activeTab);
        }
        setLoading(false);
      }
    };

    checkSessionAndInitTab();
  }, [router, searchParams]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md flex flex-col">
      <div className="h-[120px] mb-6 pt-6 px-4">
        <Image src="/logo.png" alt="Logo" width={48} height={48} />
        <h1 className="pt-2 text-lg font-semibold text-gray-700 leading-tight mt-1">
          Summit Valley<br />Properties
        </h1>
      </div>


        <nav className="flex flex-col gap-4">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded text-left ${
              activeTab === 'dashboard'
                ? 'font-bold text-gray-800'
                : 'font-semibold text-gray-400 hover:bg-gray-200'
            }`}
          >
            <MdDashboard className="text-gray-400 text-lg" />
            Dashboard
          </button>

          <button
            onClick={() => handleTabChange('blogs')}
            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded text-left ${
              activeTab === 'blogs'
                ? 'font-bold text-gray-800'
                : 'font-semibold text-gray-400 hover:bg-gray-200'
            }`}
          >
            <MdArticle className="text-gray-400 text-lg" />
            Blogs
          </button>

          <button
            onClick={() => handleTabChange('users')}
            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded text-left ${
              activeTab === 'users'
                ? 'font-bold text-gray-800'
                : 'font-semibold text-gray-400 hover:bg-gray-200'
            }`}
          >
            <MdPeople className="text-gray-400 text-lg" />
            Users
          </button>

          <button
            onClick={() => handleTabChange('settings')}
            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded text-left ${
              activeTab === 'settings'
                ? 'font-bold text-gray-800'
                : 'font-semibold text-gray-400 hover:bg-gray-200'
            }`}
          >
            <MdSettings className="text-gray-400 text-lg" />
            Settings
          </button>
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 px-12">
        {/* Top Bar */}
        <div className="h-[144px] bg-gray-100">
        
        </div>
        <div className="h-[64px] flex items-center pt-6 border-gray-300 text-4xl font-semibold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </div>

        {/* Content Area */}
        <div className="">
          {activeTab === 'dashboard' && (
            <p className="text-lg pt-8">Hii! Welcome to the dashboard.</p>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-6 pt-8">
              {/* <div className="flex justify-between items-center pt-4">
                <AddBlog onBlogAdded={triggerRefresh} />
              </div> */}
              <div className="bg-white rounded shadow p-4">
                <BlogsTable refreshSignal={refreshBlogs} onChange={triggerRefresh} />
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <p className="text-lg">Users page coming soon...</p>
          )}

          {activeTab === 'settings' && (
            <p className="text-lg">Settings page coming soon...</p>
          )}
        </div>
      </main>
    </div>
  );
}

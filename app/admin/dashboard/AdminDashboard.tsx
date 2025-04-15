'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import BlogsTable from '@/app/(frontend)/components/admin/BlogsTable';
import Image from 'next/image';
import { MdDashboard, MdArticle, MdPeople, MdSettings } from 'react-icons/md';

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
          {(['dashboard', 'blogs', 'users', 'settings'] as const).map((tab) => {
            const icons = {
              dashboard: <MdDashboard className="text-gray-400 text-lg" />,
              blogs: <MdArticle className="text-gray-400 text-lg" />,
              users: <MdPeople className="text-gray-400 text-lg" />,
              settings: <MdSettings className="text-gray-400 text-lg" />,
            };

            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded text-left ${
                  activeTab === tab
                    ? 'font-bold text-gray-800'
                    : 'font-semibold text-gray-400 hover:bg-gray-200'
                }`}
              >
                {icons[tab]}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 px-12">
        <div className="h-[144px] bg-gray-100"></div>
        <div className="h-[64px] flex items-center pt-6 border-gray-300 text-4xl font-semibold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </div>

        <div className="">
          {activeTab === 'dashboard' && (
            <p className="text-lg pt-8">Hii! Welcome to the dashboard.</p>
          )}
          {activeTab === 'blogs' && (
            <div className="space-y-6 pt-8">
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

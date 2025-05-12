// app/(dashboard)/components/DashboardShell.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { MdDashboard, MdArticle, MdPeople, MdSettings } from 'react-icons/md';
import BlogsTable from '@/app/(frontend)/components/admin/BlogsTable';
import UsersTable from '@/app/(frontend)/components/admin/UsersTable';
import { supabase } from '@/lib/supabaseClient';

type DashboardShellProps = {
  requiredRole: 'admin' | 'user';
};

export default function DashboardShell({ requiredRole }: DashboardShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'users' | 'settings'>('dashboard');
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [refreshBlogs, setRefreshBlogs] = useState(false);

  const triggerRefresh = () => setRefreshBlogs((prev) => !prev);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  useEffect(() => {
    const checkAccess = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace('/signin');
        return;
      }

      const role = data.user.user_metadata?.role;
      if (!role) {
        router.replace('/signin');
        return;
      }

      setIsAdmin(role === 'admin');

      if (role !== requiredRole && requiredRole === 'admin') {
        router.replace('/signin');
        return;
      }

      const urlTab = searchParams.get('tab');
      if (urlTab && ['dashboard', 'blogs', 'users', 'settings'].includes(urlTab)) {
        setActiveTab(urlTab as typeof activeTab);
      }

      setLoading(false);
    };

    checkAccess();
  }, [router, searchParams, requiredRole]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: blogs } = await supabase.from('blogs').select('id');
      setTotalBlogs(blogs?.length ?? 0);

      const res = await fetch('/api/admin/getusers');
      const json = await res.json();
      setTotalUsers(json.users?.length ?? 0);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-lg text-gray-500">Checking access...</div>;
  }

  const restricted = <p className="text-gray-400 italic pt-12">Restricted to admin only.</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 shadow-md flex flex-col">
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

      {/* Main content */}
      <main className="flex-1 bg-white px-12">
        <div className="h-[144px] bg-white"></div>
        <div className="h-[64px] flex items-center pt-6 border-gray-300 text-4xl font-light">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </div>

        <div className="pt-8 space-y-6">
          {activeTab === 'dashboard' &&
            (isAdmin ? (
              <div className="flex gap-6">
                <div className="flex flex-row bg-white rounded-full shadow p-6">
                  <h3 className="text-gray-500 text-xl pr-8">Total Blogs</h3>
                  <p className="text-2xl font-bold">{totalBlogs}</p>
                </div>
                <div className="flex flex-row bg-white rounded-full shadow p-6">
                  <h3 className="text-gray-500 text-xl pr-8">Total Users</h3>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
              </div>
            ) : (
              restricted
            ))}

          {activeTab === 'blogs' && (isAdmin ? <BlogsTable refreshSignal={refreshBlogs} onChange={triggerRefresh} /> : restricted)}
          {activeTab === 'users' && (isAdmin ? <UsersTable /> : restricted)}
          {activeTab === 'settings' && restricted}
        </div>
      </main>
    </div>
  );
}

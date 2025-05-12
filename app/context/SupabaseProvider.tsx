'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

type Role = 'admin' | 'user' | null;

const AuthContext = createContext<{ session: User | null; userRole: Role }>({
  session: null,
  userRole: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<Role>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (data?.user) {
        setSession(data.user);
        fetchRole(data.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setSession(user);
      if (user) fetchRole(user.id);
      else setUserRole(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (!error && data?.role) {
      setUserRole(data.role);
    }
  };

  return (
    <AuthContext.Provider value={{ session, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

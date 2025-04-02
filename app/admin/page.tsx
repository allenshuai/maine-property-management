"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // adjust path as needed
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-32">
      <form onSubmit={handleLogin} className="p-8 rounded bg-white shadow-md">
        <h2 className="text-3xl mb-8">Admin Login</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 mb-4 w-full"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}

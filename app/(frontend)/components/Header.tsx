"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/app/context/SupabaseProvider";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { session, userRole } = useAuth();
  const router = useRouter();
  let hideTimeout: NodeJS.Timeout;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

	console.log('💬 session:', session);
	console.log('💬 userRole:', userRole);

  return (
    <header className="relative flex justify-between px-7 md:px-14 py-6 md:py-8 bg-gray-100">
      <Link href="/" className="flex items-center space-x-3">
        <div className="w-10 h-10 relative">
          <Image
            src="/Logo.png"
            alt="Summit Valley Properties"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <span className="md:text-2xl text-[14px] font-medium text-gray-800" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Summit Valley Property Management
        </span>
      </Link>

      <button className="md:hidden text-gray-800 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      <nav className="hidden md:flex items-center space-x-6 text-gray-70 font-regular md:text-[16px] sm:text-[8px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <Link href="/services" className="hover:text-gray-900">Our Services</Link>
        <Link href="/listings" className="hover:text-gray-900">Listings</Link>
        <Link href="/blogs" className="hover:text-gray-900">Blogs</Link>
        <Link href="/about" className="hover:text-gray-900">About</Link>
        <Link href="/contact" className="hover:text-gray-900">Contact</Link>

        <div
          className="relative"
          onMouseEnter={() => {
            clearTimeout(hideTimeout);
            setShowDropdown(true);
          }}
          onMouseLeave={() => {
            hideTimeout = setTimeout(() => setShowDropdown(false), 300);
          }}
        >
          {session && userRole ? (
            <>
              <Link
                href={`/dashboard/${userRole}`}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
              >
                Dashboard
              </Link>
              {showDropdown && (
                <button
                  onClick={handleLogout}
                  className="absolute right-0 mt-1 px-4 py-1.5 w-20 text-center text-[14px] text-gray-100 bg-gray-500 border border-gray-200 rounded-full shadow-lg animate-bubble z-50 hover:underline"
                  style={{ top: '100%', transform: 'translateY(10px)' }}
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
              >
                Sign In
              </Link>
              {showDropdown && (
                <>
                  <Link
                    href="/signin?role=user"
                    className="absolute right-0 mt-1 px-4 py-1.5 w-20 text-center text-[14px] text-gray-100 bg-gray-500 border border-gray-200 rounded-full shadow-lg animate-bubble z-50 hover:underline"
                    style={{ top: '100%', transform: 'translateY(10px)' }}
                  >
                    User
                  </Link>
                  <Link
                    href="/signin?role=admin"
                    className="absolute right-0 mt-11 px-4 py-1.5 w-20 text-center text-[14px] text-gray-100 bg-gray-500 border border-gray-200 rounded-full shadow-lg animate-bubble-delay z-50 hover:underline"
                    style={{ top: '100%', transform: 'translateY(10px)' }}
                  >
                    Admin
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

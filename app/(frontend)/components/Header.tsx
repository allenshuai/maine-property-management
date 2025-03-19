"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header(){
	const [isOpen, setIsOpen] = useState(false);

  return(
    <header className="relative flex justify-between px-7 md:px-14 py-6 md:py-8 bg-gray-100">
      <Link href="/" className="flex items-center space-x-3">
				<div className="w-10 h-10 relative">
					<Image
						src="/Logo.png"
						alt="Summit Valley Properties"
						layout="fill"
						objectFit="contain"
					/>
				</div>
				<span className="md:text-3xl text-[13px] font-semibold text-gray-800">Summit Valley Property Management</span>
			</Link>

			{/* mobile */}
			<button
				className="md:hidden text-gray-800 focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
			</button>

			{/* deckstop links */}
			<nav className="hidden md:flex items-center space-x-6 text-gray-700">
				<Link href="/services" className="hover:text-gray-900">Our Services</Link>
				<Link href="/listings" className="hover:text-gray-900">Listings</Link>
				<Link href="/blogs" className="hover:text-gray-900">Blogs</Link>
				<Link href="/about" className="hover:text-gray-900">About</Link>
				<Link 
					href="/contact" 
					className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
				>
					Contact Us
				</Link>
			</nav>

			{/* mobile links */}
			{isOpen && (
        <div className={`absolute right-0 top-full w-3/5 bg-white z-50 shadow-lg rounded-lg p-4 flex flex-col space-y-3 md:hidden transition-all duration-300 ${
					isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
				}`}>
          <Link href="/services" className="hover:text-gray-900">Our Services</Link>
          <Link href="/listings" className="hover:text-gray-900">Listings</Link>
          <Link href="/blogs" className="hover:text-gray-900">Blogs</Link>
          <Link href="/about" className="hover:text-gray-900">About</Link>
					<Link href="/contact" className="hover:text-gray-900">Contact Us</Link>
        </div>
      )}

    </header>
  )
}	
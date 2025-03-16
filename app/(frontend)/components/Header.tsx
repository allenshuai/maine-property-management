"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header(){
  return(
    <header className="flex justify-between px-12 py-8 bg-gray-100 shadow-sm">
      <div className="flex items-center space-x-3">
				<div className="w-10 h-10 relative">
					<Image
						src="/logo.png"
						alt="Summit Valley Properties"
						layout="fill"
						objectFit="contain"
					/>
				</div>
				<span className="text-3xl font-semibold text-gray-800">Summit Valley Properties</span>
			</div>

				{/* links */}
			<nav className="flex items-center space-x-6 text-gray-700">
				<Link href="/services" className="hover:text-gray-900">Services</Link>
				<Link href="/properties" className="hover:text-gray-900">Properties</Link>
				<Link href="/blogs" className="hover:text-gray-900">Blogs</Link>
				<Link href="/about" className="hover:text-gray-900">About</Link>
				<Link 
					href="/contact" 
					className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
				>
					Contact Us
				</Link>
			</nav>
      
    </header>
  )
}	
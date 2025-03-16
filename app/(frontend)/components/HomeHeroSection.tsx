"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomeHeroSection() {
	return (
		<section className="h-screen flex items-center justify-between px-16 bg-gray-100">
			<div className="w-1/2 flex justify-center">
				<div className="relative w-[400px] h-[400px] overflow-hidden" >
					<Image
						src="/LogoProperty.png"
						alt="beautiful"
						fill
						className="object-cover"
					/>
				</div>
			</div>

			<div className="w-1/2">
				
				<h1 className="flex flex-wrap items-end font-bold text-black mb-10">
					<span className="text-6xl -ml-12">Maximizing Value,</span>
					<span className="text-lg text-gray-500 self-end ml-2">
						Minimizing Hassle
					</span>
				</h1>

				<div className="text-gray-600 mb-10 space-y-2">
					<p className="">Serving Southern and Midcoast Maine. </p>
					<p>We provide full-service, transparent, and proactive property 
          management <br/>protecting your investment day in and day out.</p>
				</div>
        

        <div className="flex space-x-4 mb-10">
          <Link 
            href="/contact" 
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition"
          >
            Contact us
          </Link>
          <Link 
            href="/listings" 
            className="border border-black text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            See Listings
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 border-t border-gray-300 pt-4 space-y-0">
          <p className="text-gray-700">Have any questions?</p>
					<p className="text-gray-700 mb-4">Contact us!</p>
          <p className="text-xl font-semibold text-black tracking-wider">+123 (456) 7890</p>
        </div>

		

      </div>

		</section>

	)
}
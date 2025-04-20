"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomeHeroSection() {
	return (
		<section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-0 md:px-16 bg-gray-100">
			<div className="w-full md:w-1/2 flex justify-center">
				<div className="relative w-[250px] md:w-[400px] h-[250px] md:h-[400px] overflow-hidden" >
					<Image
						src="/LogoProperty.png"
						alt="beautiful"
						fill
						className="object-cover"
					/>
				</div>
			</div>

			<div className="w-full md:w-1/2 text-center md:text-left">
				
				<h1 className="md:mt-0 mt-6 flex flex-wrap items-end font-bold text-black mb-4 md:mb-10 justify-center md:justify-start">
					<span 
						className="text-4xl md:text-5xl md:-ml-12"
						style={{fontFamily: 'Montserrat, sans-serif'}}
					>
						Maximizing Value,
					</span>
					<span className="text-md md:text-lg text-gray-500 self-end ml-2"
						style={{fontFamily: 'Montserrat, sans-serif'}}
					>
						Minimizing Hassle
					</span>
				</h1>

				<div 
					className="md:px-0 px-8 text-left md:text-left text-gray-600 mb-6 md:mb-10 space-y-2 text-sm md:text-base"
					style={{fontFamily: 'Montserrat, sans-serif'}}
					>
					<p className=""
					>Full-service, transparent, and proactive property management</p>
					<p>serving Southern & Midcoast Maine.</p>
				</div>
        

        <div 
					className="md:px-0 px-4 flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 mb-10 w-full"
					style={{fontFamily: 'Montserrat, sans-serif'}}
				>
          <Link 
            href="/contact" 
            className="border border-black bg-black text-white px-6 py-3 rounded-full w-full md:w-auto text-center
						hover:bg-gray-900 hover:scale-110 transition duration-300 ease-in-out"
          >
            Contact us
          </Link>
          <Link 
            href="/listings" 
            className="border border-black text-black px-6 py-3 rounded-full w-full md:w-auto text-center
						hover:bg-gray-200 hover:scale-110 transition duration-300 ease-in-out"
          >
            See Listings
          </Link>
        </div>

        {/* Contact Info */}
        <div 
					className="mt-4 md:mt-8 border-t border-gray-300 pt-4 space-y-0 text-center md:text-left"
					style={{fontFamily: 'Montserrat, sans-serif'}}
				>
        <p className="text-gray-700">Have any questions?</p>
				<p className="text-gray-700 mb-2 md:mb-4">Contact us!</p>
          <p className="md:text-xl text-lg font-semibold text-black tracking-wider
					animate-bounce">(207) - 239 - 2410</p>
        </div>

	
      </div>

		</section>

	)
}
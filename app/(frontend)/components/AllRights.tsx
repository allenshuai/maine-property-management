"use client";

import Link from "next/link";
import { 
	FaFacebookF, 
	FaTwitter, 
	FaInstagram, 
	FaLinkedinIn, 
	FaYoutube,
} from "react-icons/fa";

export default function RightsFooter() {
	return(
		<div className="max-w-screen-2xl mx-auto px-14 py-6 mt-10 border-t border-gray-400 flex justify-between items-center">
		{/* Copyright Text (Left) */}
			<p className="text-gray-600 text-sm">© 2025 Summit Valley Properties. All Rights Reserved.</p>

			{/* Social Media Icons (Right) */}
			<div className="flex space-x-4">
				<Link href="#" className="hover:text-gray-900">
					<FaFacebookF size={18} />
				</Link>
				<Link href="#" className="hover:text-gray-900">
					<FaTwitter size={18} />
				</Link>
				<Link href="#" className="hover:text-gray-900">
					<FaInstagram size={18} />
				</Link>
				<Link href="#" className="hover:text-gray-900">
					<FaLinkedinIn size={18} />
				</Link>
				<Link href="#" className="hover:text-gray-900">
					<FaYoutube size={18} />
				</Link>
			</div>
		</div>
	)
}
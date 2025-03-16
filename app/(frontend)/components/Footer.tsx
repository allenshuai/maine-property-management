"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
	FaFacebookF, 
	FaTwitter, 
	FaInstagram, 
	FaLinkedinIn, 
	FaYoutube,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
	const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubscribe = () => {
    if (!email.trim()) {
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return;
    }
    setMessage({ text: "Subscribed!", type: "success" });
  };

	useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer); // clean up to prevent memory leaks
    }
  }, [message]);
	
  return (
    <footer className="bg-white py-12 w-full">
      <div className="max-w-screen-2xl mx-auto px-14 flex flex-col">
        {/* Logo in its own row */}
        <div className="flex justify-start mb-2">
          <Image 
						src="/logo.png" 
						alt="Summit Valley Properties" 
						width={40} 
						height={40} 
					/>
        </div>

        {/* Three sections in a row (same layout as before) */}
        <div className="grid grid-cols-3 gap-16">
          {/* Left Section: Company Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">Summit Valley Properties</h2>
            <p className="text-md text-gray-600 mt-4 leading-relaxed">
              Serving Southern and Mid-coast Maine. <br />
              Maximizing Value, Minimizing Hassle.
            </p>
          </div>

          {/* Middle Section: Newsletter */}
          <div>
            <h3 className=" text-lg font-bold text-gray-900">Subscribe to our newsletter</h3>
            <p className="text-md text-gray-600 mt-4">
              Subscribe to stay tuned for the latest news and interesting offers and real estate
            </p>
            <div className="flex mt-4">
							<input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-md px-4 py-3 w-full border border-gray-300 rounded-l-3xl focus:outline-none"
                required
              />
              <button 
                className="text-md bg-stone-500 text-white px-6 py-3 rounded-r-3xl hover:bg-stone-800 hover:underline transition cursor-pointer"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
						<div className="h-[20px] flex items-center">
							<p 
								className={`text-sm transition-all duration-200 ${
									message.type === "error" ? "text-red-500" : message.type === "success" ? "text-green-600" : "invisible opacity-0"
								}`}
							>
								{message.text || "byyee"} 
							</p>
						</div>
          </div>

          {/* Right Section: Contact Info */}
          <div className="pl-32">
            <h3 className="text-lg font-bold text-gray-900">Contact us</h3>
            <ul className="text-md text-gray-600 mt-4 space-y-3">
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-500" size={18} />
                <span>contact@svproperties.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-gray-500" size={18} />
                <span>(123) 456 - 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-gray-500" size={18} />
                <span>389 Boston Ave, Medford, 02155</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
    </footer>
  );
}

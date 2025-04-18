"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function PropertiesPage() {
  useEffect(() => {
    const scriptId = "rv-jsinit";
  
    if (!document.getElementById(scriptId)) {
      const t = new Date().getTime();
      const js = document.createElement("script");
      js.id = scriptId;
      js.src = `https://app.rentvine.com/public/widget/init.js?_=${t}`;
      js.async = true;
      document.body.appendChild(js);
    }
  }, []);
  

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-16 py-8">
      <div className="w-full h-[300px] relative overflow-hidden rounded-lg shadow-lg mb-8">
        <Image 
          src="/ListingHero.jpg" 
          alt="Available Properties"
          width={1200} 
          height={300} 
          className="w-full h-full object-cover"
        />
      </div>



      {/* <h1 className="text-4xl font-bold mb-8">Available Properties</h1> */}
      
      {/* Rentvine Listings Widget */}
      <div className="rentvine_widget" data-subdomain="summitvalley" data-component="listings"></div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function PropertiesPage() {
  useEffect(() => {
    const scriptId = "rv-jsinit";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://app.rentvine.com/public/widget/init.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-8">Available Properties</h1>
      
      {/* Rentvine Listings Widget */}
      <div className="rentvine_widget" data-subdomain="summitvalley" data-component="listings"></div>
    </div>
  );
}

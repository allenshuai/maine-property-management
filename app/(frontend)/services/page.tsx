"use client";

import { services } from "../components/ServicesData";

export default function ServicesPage() {

	const firstThreeServices = services.slice(0, 3);
  const remainingServices = services.slice(3);
	
  return (
    <div className="w-full overflow-x-hidden"> {/* Stops horizontal scrolling */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 pt-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {firstThreeServices.map((service, index) => (
            <div 
              key={index} 
              className={`p-8 text-left flex flex-col ${
                index % 2 !== 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="mb-4">{service.icon}</div>
              <div className="min-h-[60px]">
                <h2 className="text-xl font-bold">{service.title}</h2>
                <div className="border-b-2 border-gray-400 w-20 mt-5"></div>
              </div>
              <div className="text-gray-700 mt-4">
                {service.description.map((item, i) => (
                  <p key={i} className="mb-2">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width Parallax Image (Now aligned properly) */}
      <div 
				className="relative w-screen h-[400px] bg-fixed bg-cover bg-center"
				style={{ backgroundImage: "url('/ServicesBackground.jpg')" }} // Make sure this path is correct
			>
				{/* Transparent Overlay */}
				{/* <div className="absolute inset-0"></div> */}

				{/* Floating Text (Centered) */}
				<div className="absolute inset-0 flex items-center justify-center">
					<h2 className="text-white text-2xl md:text-3xl font-semibold text-center px-6">
						We are dedicated to being your partner in optimizing the potential of your rental property.
					</h2>
				</div>
			</div>


      <div className="max-w-screen-xl mx-auto px-6 md:px-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-0">
        {remainingServices.map((service, index) => (
          <div 
            key={index} 
            className={`p-8 text-left ${
              index % 2 !== 0 ? "bg-white" : "bg-gray-100"
            }`}
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-xl font-bold">{service.title}</h2>
            <div className="border-b-2 border-gray-400 w-10 mt-2 mb-4"></div>
            <div className="text-gray-700 mt-4">
              {service.description.map((item, i) => (
                <p key={i} className="mb-2">{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

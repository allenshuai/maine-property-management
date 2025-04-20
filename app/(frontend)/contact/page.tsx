"use client";

import ContactForm from "../components/ContactForm";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="md:mt-8 flex md:flex-row flex-col min-h-screen px-6 md:px-16 py-12 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:gap-x-12 justify-between md:items-start mb-12 text-gray-700">
        <div className="relative md:w-1/2 w-full h-[200px] md:h-[500px] mb-8 md:mb-0 rounded-lg overflow-hidden">
          <Image
            src="/contactPagePhoto.jpg" // 👈 replace with your actual image path
            alt="Contact us"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* <h1 className="text-3xl md:text-5xl font-normal md:w-1/2 flex-1">Contact Us.</h1> */}
        {/* <div className="flex md:flex-col"> */}
          {/* <h1 className="text-3xl md:text-6xl font-bold md:w-1/2 flex-1">Contact Us.</h1> */}
          {/* <h1 className="">haha</h1> */}
        {/* </div> */}

        {/* right side */}
        <div className="md:w-1/2">
          <h2 
            className="text-md md:text-2xl font-bold mb-2"
            style={{fontFamily: 'Montserrat, sans-serif'}}
          >
            Get In Touch Today</h2>
          <p 
            className="text-md md:text-md font-base mb-6 md:mb-10"
            style={{fontFamily: 'Montserrat, sans-serif'}}
          >
            Feel free to reach out to us for any inquiries or to schedule an appintment. 
            We are here to help you with all any of your real estate needs.
          </p>

          <ContactForm />

        </div>
      </div>

      {/* <div className="flex justify-center">
        <ContactForm />
      </div> */}
    </div>
  );
}
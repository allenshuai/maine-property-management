"use client";

import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="md:mt-8 flex md:flex-row flex-col min-h-screen px-6 md:px-16 py-12 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-start mb-12 text-gray-700">
        <h1 className="text-3xl md:text-5xl font-normal md:w-1/2 flex-1">Contact Us.</h1>
        <div className="flex md:flex-col">
          {/* <h1 className="text-3xl md:text-6xl font-bold md:w-1/2 flex-1">Contact Us.</h1> */}
          {/* <h1 className="">haha</h1> */}
        </div>
        <div className="md:w-1/2">
          <h2 className="text-md md:text-lg font-semibold mb-2">Get In Touch Today</h2>
          <p className="text-md md:text-lg font-bold mb-6 md:mb-10">
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
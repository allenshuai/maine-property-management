"use client";

import { useState } from "react";

const ContactForm = () => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const handledOption = (option: string) => {
		setSelectedOption((prev) => (prev === option ? null : option));
	};

	return (
		<div className="max-w-lg w-full">
			<form className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>	
            <label className="block text-sm font-semibold">First Name *</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-gray-300"
            />
          </div>

					<div>
            <label className="block text-sm font-semibold">Last Name *</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-gray-300"
            />
          </div>
				</div>

				<div>
          <label className="block text-sm font-semibold">Email *</label>
          <input
            type="email"
            required
            className="w-full p-2 border border-gray-300"
          />
        </div>


				<div>
          <label className="block text-sm font-semibold">Interested In</label>
          <div className="flex gap-6 mt-2">
            {["Buy", "Rent", "Other"].map((option) => (
              <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox" // Use checkbox instead of radio for toggle effect
                checked={selectedOption === option}
                onChange={() => handledOption(option)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 ${
                  selectedOption === option
                    ? "border-gray-700"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === option && (
                  <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
                )}
              </span>
              {option}
            </label>
            ))}
          </div>
        </div>


				<div>
          <label className="block text-sm font-semibold">Message</label>
          <textarea
            rows={4}
            className="w-full p-2 border border-gray-300"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 text-lg font-semibold"
        >
          Send
        </button>

			</form>
		</div>
	);
};

export default ContactForm;
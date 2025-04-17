"use client";

import { useState } from "react";

const ContactForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const data = {
			name: `${firstName} ${lastName}`,
			email,
			message: `${message}\n\nInterested In: ${selectedOption ?? "N/A"}`,
		};

		try {
			const res = await fetch(
				"https://script.google.com/macros/s/AKfycbxgX7VOO4I7IbjWldvEsXx3exoikmzp7gdODetm4duHuQOAcyUYMH49hVUZ1dS8hzRU/exec",
				{
					method: "POST",
					headers: {
						"Content-Type": "text/plain;charset=utf-8",
					},
					body: JSON.stringify(data),
				}
			);

			const json = await res.json();
			if (json.success) {
				setSuccess(true);
				setFirstName("");
				setLastName("");
				setEmail("");
				setMessage("");
				setSelectedOption(null);
			} else {
				alert("Something went wrong. Please try again.");
			}
		} catch (err) {
			console.error(err);
			alert("Error sending message.");
		} finally {
			setLoading(false);
		}
	};

	const handledOption = (option: string) => {
		setSelectedOption((prev) => (prev === option ? null : option));
	};

	return (
		<div className="max-w-lg w-full">
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-semibold">First Name *</label>
						<input
							type="text"
							required
							className="w-full p-2 border border-gray-300"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>

					<div>
						<label className="block text-sm font-semibold">Last Name *</label>
						<input
							type="text"
							required
							className="w-full p-2 border border-gray-300"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-semibold">Email *</label>
					<input
						type="email"
						required
						className="w-full p-2 border border-gray-300"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold">Interested In</label>
					<div className="flex gap-6 mt-2">
						{["Buy", "Rent", "Other"].map((option) => (
							<label key={option} className="flex items-center cursor-pointer">
								<input
									type="checkbox"
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
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					></textarea>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-black text-white py-3 text-lg font-semibold disabled:opacity-50"
				>
					{loading ? "Sending..." : "Send"}
				</button>

				{success && (
					<p className="text-green-600 font-semibold pt-2">Message sent!</p>
				)}
			</form>
		</div>
	);
};

export default ContactForm;

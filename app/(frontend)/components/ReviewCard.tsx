import Image from "next/image";

interface ReviewCardProps {
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
}

export default function ReviewCard({ 
	name, 
	role, 
	image, 
	review, 
	rating 
}: ReviewCardProps) {
	return (
	
<div className="w-[360px] h-full bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col p-6">
      {/* Profile Image */}
      <div className="flex justify-center">
        <Image
          src={image}
          alt={name}
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
      </div>

      {/* Name and Role */}
      <div className="text-center mt-4">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>

			<div className="flex flex-col flex-grow text-center mt-5 p-5">
				{/* Review Text */}
				<p className="text-gray-600 text-sm space-y-1 flex-grow">{review}</p>

				{/* Star Rating */}
				<div className="flex justify-center mt-6">
					{[...Array(5)].map((_, starIndex) => (
						<span
							key={starIndex}
							className={`text-yellow-500 text-xl ${
								starIndex < rating ? "opacity-100" : "opacity-40"
							}`}
						>
							{/* ★ */}
							⭐
						</span>
					))}
				</div>
			</div>
    </div>
  );
}
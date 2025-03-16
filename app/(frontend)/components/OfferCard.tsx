import Image from "next/image";
import Link from "next/link";

interface OfferCardProps {
  title: string;
  description: string[];
  image: string;
}

export default function OfferCard({ title, description, image }: OfferCardProps) {
    return (
      <div className="w-[360px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        <div className="relative w-full h-48">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover" 
          />
        </div>
  
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex-grow text-center">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <ul className="text-gray-600 mt-5 text-sm space-y-1">
              {description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
  
          <div className="mt-10 text-center">
            <Link href="/learn-more" className="inline-block text-green-600 font-semibold hover:underline">
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    );
  }
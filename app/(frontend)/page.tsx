import HomeHeroSection from "./components/HomeHeroSection";
import OfferSection from "./components/HomeOfferSection";
import ReviewSection from "./components/HomeReviewSection";


export default function Home() {
  return (
    <main className="">
      <HomeHeroSection/>
      <OfferSection/>
      <ReviewSection/>
      {/* use framer motion for animation */}
    </main>
  );
}

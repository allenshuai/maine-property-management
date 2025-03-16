// import {Monoton} from "next/font/google";
import HomeHeroSection from "./components/HomeHeroSection";
import OfferSection from "./components/HomeOfferSection";
import ReviewSection from "./components/HomeReviewSection";
// const monotonFont = Monoton({
//   subsets: ["latin"],
//   weight: "400",
// })

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

import {Monoton} from "next/font/google";
import HomeHeroSection from "./components/HomeHeroSection";
import OfferSection from "./components/HomeOfferSection";

const monotonFont = Monoton({
  subsets: ["latin"],
  weight: "400",

})
export default function Home() {
  return (
    <main className="">
      <HomeHeroSection/>
      <OfferSection/>
      {/* use framer motion for animation */}
    </main>
  );
}

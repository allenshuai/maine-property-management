import {Monoton} from "next/font/google";

const monotonFont = Monoton({
  subsets: ["latin"],
  weight: "400",

})
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className={`text-6xl mb-6 font-bold ${monotonFont.className}`}>Main Property Management.</h1>
      <h2 className="text-4xl font-bold">COMING SOON.</h2>
    </div>
  );
}

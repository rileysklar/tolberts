import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const Leaderboard = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center justify-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
          <div className="flex flex-col items-start justify-center gap-4">
            <h1 className="noto text-3xl text-stone-900 sm:text-4xl md:text-5xl">
              Tolbert's Restaurant
            </h1>
            <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
              Frank X. Tolbert's life-long passion for chili inspired him to
              write his world-famous book "A Bowl of Red" 50 years ago. He
              founded the Terlingua Championship Chili Cook-Off in 1967 and
              joined forces with son Frank 2 in 1976 to open the first Tolbert's
              Restaurant in Dallas, with daughter Kathleen helping manage
              starting in 1977. Kathleen, with her husband Paul Ryan, selected
              Grapevine's historic Main Street as the new home of Tolbert's in
              2006. The tradition continues as Tolbert's Restaurant & Chili
              Parlor features classic southwestern cuisine with our signature
              Bowl of Red, using the same recipe developed by Frank X. Tolbert
              and his son. Enjoy your visit and tell your friends!
            </p>
            <p className="mt-2 text-sm italic text-stone-600 sm:text-base">— Kathleen, Paul and Steven Ryan</p>
            <a href="/about">
              <button
                className={`a flex flex-row items-center gap-2 rounded-full bg-teal-600 px-5 py-2 text-lg font-semibold text-white hover:bg-teal-700`}
              >
                Learn More <ChevronRight className="h-4 w-4" />
              </button>{" "}
            </a>
          </div>
          <div
            className="flex min-h-[280px] items-end justify-end rounded-xl bg-cover bg-center shadow-2xl sm:min-h-[320px] lg:min-h-[380px]"
            style={{
              backgroundImage: `url(/tolberts.webp)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

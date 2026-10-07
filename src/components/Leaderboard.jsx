import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const Leaderboard = () => {
  return (
    <div className="site-container site-section grid grid-cols-1 items-center justify-center gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col items-start justify-center gap-4">
        <h1 className="noto text-3xl text-stone-900 sm:text-4xl md:text-5xl">
          Tolbert's Restaurant
        </h1>
        <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
          Frank X. Tolbert's life-long passion for chili inspired him to write
          his world-famous book "A Bowl of Red" 50 years ago. He founded the
          Terlingua Championship Chili Cook-Off in 1967 and joined forces with
          son Frank 2 in 1976 to open the first Tolbert's Restaurant in Dallas,
          with daughter Kathleen helping manage starting in 1977. Kathleen, with
          her husband Paul Ryan, selected Grapevine's historic Main Street as
          the new home of Tolbert's in 2006. The tradition continues as
          Tolbert's Restaurant & Chili Parlor features classic southwestern
          cuisine with our signature Bowl of Red, using the same recipe
          developed by Frank X. Tolbert and his son. Enjoy your visit and tell
          your friends!
        </p>
        <p className="mt-2 text-sm italic text-stone-600 sm:text-base">
          — Kathleen, Paul and Steven Ryan
        </p>
        <Button asChild className="gap-2 text-base sm:text-lg">
          <a href="/about/">
            Learn More <ChevronRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <div
        className="flex min-h-[280px] items-end justify-end rounded-xl bg-cover bg-center shadow-2xl sm:min-h-[320px] lg:min-h-[380px]"
        style={{
          backgroundImage: `url(/tolberts.webp)`,
        }}
      ></div>
    </div>
  );
};

export default Leaderboard;

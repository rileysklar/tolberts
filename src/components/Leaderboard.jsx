import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const Leaderboard = () => {
  return (
    <div className=" w-full">
      <div
        className="mx-auto max-w-7xl
  "
      >
        <div className="align-center grid grid-cols-1 justify-center gap-8 p-6 lg:grid-cols-2 lg:gap-2 lg:p-12 lg:py-24">
          <div className="flex flex-col items-start justify-center gap-4 lg:pr-6">
            <h1 className=" noto text-2xl text-stone-900 md:text-5xl">
              Tolbert's Restaurant
            </h1>
            <p className="sm:text-md mt-1 text-stone-900">
              Frank X. Tolbert’s life-long passion for chili inspired him to
              write his world-famous book “A Bowl of Red” 50 years ago. He
              founded the Terlingua Championship Chili Cook-Off in 1967 and
              joined forces with son Frank 2 in 1976 to open the first Tolbert’s
              Restaurant in Dallas, with daughter Kathleen helping manage
              starting in 1977. Kathleen, with her husband Paul Ryan, selected
              Grapevine’s historic Main Street as the new home of Tolbert’s in
              2006. The tradition continues as Tolbert’s Restaurant & Chili
              Parlor features classic southwestern cuisine with our signature
              Bowl of Red, using the same recipe developed by Frank X. Tolbert
              and his son. Enjoy your visit and tell your friends!
            </p>
            <p>— Kathleen, Paul and Steven Ryan</p>
            <a href="/about">
              <Button variant="default" className="mt-2">
                Learn More <ChevronRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
          <div
            className="flex items-end justify-end rounded-lg bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage: `url(/tolberts.webp)`,
              height: "300px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

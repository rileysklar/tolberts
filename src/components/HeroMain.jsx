import { useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import videoFallbackImage from "../assets/tolberts-gallery-1.jpg"; // Import the fallback image

export default function HeroMain() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Use ref callback to handle cached videos that are already ready
  const videoRef = useCallback((video) => {
    if (video && video.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full bg-stone-900">
      {/* Video element with fallback image */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute z-0 hidden h-full w-full object-cover transition-opacity duration-1000 ease-out sm:block ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="https://tolbertscms.com/wp-content/uploads/2024/07/Copy-of-minute-cut.mp4"
          type="video/mp4"
        />
        {/* Fallback image displayed if video fails to load */}
        <img
          src={videoFallbackImage.src}
          className="h-full w-full object-cover"
          alt="Tolbert's Restaurant"
        />
      </video>
      {/* Mobile-specific fallback image */}
      <img
        src="/tolbs-outside-mobile.jpg"
        className="absolute z-0 block h-full w-full object-cover sm:hidden"
        alt="Tolbert's Restaurant"
      />
      <div className="grid h-full grid-cols-1 sm:w-full">
        <div className="urbanist relative z-10 flex w-full flex-col justify-center bg-gradient-to-r from-stone-800/90 via-stone-700/70 to-transparent px-4 py-8 sm:px-12 sm:py-16 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <h1 className="max-w-xl text-6xl font-bold leading-tight text-white sm:text-7xl lg:text-8xl">
              Tolbert's Restaurant
            </h1>
            <h3 className="urbanist mt-2 text-4xl font-bold text-white sm:mt-3 sm:text-5xl lg:text-6xl">
              & Chili Parlor 🌶️
            </h3>
            <div className="cta mt-6 inline-flex flex-col gap-4 sm:hidden">
              <a href="/calendar">
                <Button
                  variant=""
                  className="w-full rounded-full bg-white px-8 py-6 text-xl font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:bg-stone-100 hover:shadow-xl active:translate-y-[1px] active:scale-95"
                >
                  🗓️ Concert Calendar
                </Button>
              </a>
              <a href="https://order.spoton.com/rbbt-tolberts-restaurant-and-chili-parlor-15291/grapevine-tx/64e7d0d48137b6003f171eba">
                <Button
                  variant=""
                  className="w-full rounded-full bg-teal-600 px-8 py-6 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:bg-teal-700 hover:shadow-xl active:translate-y-[1px] active:scale-95"
                >
                  🚙 Order Food
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

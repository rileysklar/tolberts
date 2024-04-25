import { Button } from "../components/ui/button";
import Form from "../components/Form";

export default function HeroMain() {
  return (
    <div className="relative h-[90dvh] w-full bg-black">
      <video
        autoPlay
        muted
        loop
        className="absolute z-0 h-full w-full object-cover"
      >
        <source
          src="http://tolbertscms.com/wp-content/uploads/2024/04/tolbs-compressed.mp4"
          type="video/mp4"
        />
      </video>
      <div className="grid h-full grid-cols-1  gap-4 sm:w-full sm:grid-cols-2">
        <div className=" urbanist relative z-10 flex flex-col justify-center bg-gradient-to-r  from-stone-700 to-transparent p-[64px] sm:col-span-1">
          <div className="">
            <h1 className="text-6xl	font-bold text-white sm:text-8xl">
              Tolbert's Restaurant
            </h1>
            <h3 className="urbanist text-4xl font-bold text-white sm:text-5xl">
              50 Years of Chili
            </h3>

            <a href="/calendar">
              <Button
                variant="default"
                className="mt-2 rounded-full py-6 text-xl"
              >
                🗓️ Concert Calendar
              </Button>
            </a>
          </div>
        </div>
        <div className="form z-100 absolute">
          <Form client:load />
        </div>
      </div>
    </div>
  );
}

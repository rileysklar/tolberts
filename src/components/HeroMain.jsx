import { Button } from "../components/ui/button";
import Form from "../components/Form";
import OrderDropdown from "./OrderDropdown";

export default function HeroMain() {
  return (
    <div className="relative h-[80vh] w-[full] bg-stone-900">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute z-0 hidden h-full w-full object-cover sm:block"
      >
        <source
          src="https://tolbertscms.com/wp-content/uploads/2024/07/Copy-of-minute-cut.mp4"
          type="video/mp4"
        />
      </video>
      <img
        src="/tolbs-outside-mobile.jpg"
        className="absolute z-0 block h-full w-full object-cover sm:hidden"
        alt="Tolbert's Restaurant"
      />
      <div className="grid h-full grid-cols-1  gap-4 sm:w-full">
        <div className=" urbanist relative z-10 flex w-full flex-col justify-center bg-gradient-to-r  from-stone-700 to-transparent p-4 sm:col-span-1 sm:p-[64px]">
          <div className="mx-auto w-full max-w-7xl">
            <h1 className="max-w-xl	text-6xl font-bold text-white sm:text-8xl">
              Tolbert's Restaurant
            </h1>
            {/* <Form client:load /> */}
            <h3 className="urbanist mt-1 text-4xl font-bold text-white sm:text-6xl">
              & Chili Parlor 🌶️
            </h3>
            <div className="cta mt-2 inline-flex flex-col gap-1 sm:hidden">
              <a href="/calendar">
                <Button
                  variant=""
                  className="hover:stone-900 mt-2 w-full rounded-full bg-white py-6 text-xl text-stone-900 transition-all  duration-300 hover:translate-y-[-1px] hover:bg-stone-100 active:translate-y-[1px] active:scale-90"
                >
                  🗓️ Concert Calendar
                </Button>
              </a>
              <a href="https://order.spoton.com/rbbt-tolberts-restaurant-and-chili-parlor-15291/grapevine-tx/64e7d0d48137b6003f171eba">
                <Button
                  variant=""
                  className="hide hover:stone-900 mt-2 w-full rounded-full bg-teal-600 py-6 text-xl font-semibold text-white transition-all  duration-300 hover:translate-y-[-1px] hover:bg-teal-700 active:translate-y-[1px] active:scale-90"
                >
                  🚙 Order Food
                </Button>
              </a>
              {/* <OrderDropdown client:load /> */}
            </div>
          </div>
        </div>
        {/* <div className="align-center align-center hidden w-full flex-col items-center justify-center p-4 md:flex">
          <Form client:load />
        </div> */}
      </div>
    </div>
  );
}

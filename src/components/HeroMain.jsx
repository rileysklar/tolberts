import { Button } from "../components/ui/button";
import Form from "../components/Form";
import OrderDropdown from "./OrderDropdown";

export default function HeroMain() {
  return (
    <div className="relative h-[90dvh] w-full bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute z-0 hidden h-full w-full object-cover sm:block"
      >
        <source
          src="http://tolbertscms.com/wp-content/uploads/2024/04/tolbs-compressed.mp4"
          type="video/mp4"
        />
      </video>
      <img
        src="/tolbs-outside-mobile.jpg"
        className="absolute z-0 block h-full w-full object-cover sm:hidden"
        alt="Tolbert's Restaurant"
      />
      <div className="grid h-full grid-cols-1  gap-4 sm:w-full sm:grid-cols-2">
        <div className=" urbanist relative z-10 flex flex-col justify-center bg-gradient-to-r  from-stone-700 to-transparent p-4 sm:col-span-1 sm:p-[64px]">
          <div className="">
            <h1 className="text-6xl	font-bold text-white sm:text-7xl">
              Tolbert's Restaurant
            </h1>
            <h3 className="urbanist text-4xl font-bold text-white sm:text-5xl">
              50 Years of Chili 🌶️
            </h3>
            <div className="cta inline-flex flex-col gap-3 sm:hidden">
              <a href="/calendar">
                <Button
                  variant=""
                  className="hover:black mt-2 w-full rounded-full bg-white py-6 text-xl text-black transition-all  duration-300 hover:translate-y-[-1px] hover:bg-stone-100 active:translate-y-[1px] active:scale-90"
                >
                  🗓️ Concert Calendar
                </Button>
              </a>
              <a href="https://order.spoton.com/rbbt-tolberts-restaurant-and-chili-parlor-15291/grapevine-tx/64e7d0d48137b6003f171eba">
                <Button
                  variant=""
                  className="hover:black mt-2 w-full rounded-full bg-[#1769ff] py-6 text-xl text-white transition-all  duration-300 hover:translate-y-[-1px] hover:bg-[#1768ffd2] active:translate-y-[1px] active:scale-90"
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

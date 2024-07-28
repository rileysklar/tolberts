import { Button } from "./ui/button";
import RestaurantSchema from "./RestaurantSchema";
import Form from "./Form";

export default function Footer() {
  return (
    <footer className=" urbanist chili bg-stone-900 pb-10 pt-8 ">
      <div className="morphism  mx-auto max-w-7xl rounded-lg border-white bg-transparent p-2 shadow-lg sm:p-6">
        <div className="grid grid-cols-1 gap-4 p-4  text-center text-white lg:grid-cols-3">
          <div className="morphism flex flex-col items-center justify-between gap-2	p-4">
            <h3 className="noto text-3xl">Our Location</h3>

            <div className="morphism overflow-hidden rounded-lg pt-2">
              <p>423 South Main Street</p>
              <p>Grapevine, TX 76051</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.44830472116!2d-97.07334468481859!3d32.93418988093237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c2bf77a1f8503%3A0x96f6083fb3909e6d!2s423%20S%20Main%20St%2C%20Grapevine%2C%20TX%2076051%2C%20USA!5e0!3m2!1sen!2s!4v1632432943826!5m2!1sen!2s"
                width="300"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className=" flex flex-col items-center gap-0 rounded-lg border-white bg-transparent shadow-lg">
              <h3 className="noto text-3xl">Restaurant Hours</h3>
              <RestaurantSchema client:load />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <Form client:load />
            </div>
            <div className="morphism flex w-full flex-col items-center gap-0 rounded-lg border-white bg-transparent p-8 shadow-lg">
              <a href="/">
                <img
                  className="h-auto w-[150px] pb-4"
                  src="/logo-white.png"
                  alt="Logo"
                />
              </a>
              <a href="tel:(817)421-4888<"> 📲 (817) 421-4888</a>
              <a href="mailto:info@tolbertsrestaurant.com">
                ✉️ info@tolbertsrestaurant.com
              </a>
            </div>
          </div>
          <div className="morphism flex flex-col items-center justify-between gap-2 p-4">
            <div className=" flex flex-col items-center gap-2">
              <h3 className="noto text-3xl">Site Map</h3>
              <div className="flex flex-col items-center gap-0 pt-2">
                <a href="/" className={`p-2 text-xl hover:underline`}>
                  Home
                </a>

                <a
                  href="https://tolbertscms.com/wp-content/uploads/2024/04/TolbertsNewMenu010324.pdf"
                  className={`p-2 text-xl hover:underline`}
                >
                  Menu
                </a>
                <a
                  href="http://tolbertscms.com/wp-content/uploads/2024/04/Brunch-Menu-Current-April-2023.pdf"
                  className={`p-2 text-xl hover:underline`}
                >
                  Brunch
                </a>
                <a href="/calendar" className={`p-2 text-xl hover:underline`}>
                  Calendar
                </a>
                <a href="/about" className={`p-2 text-xl hover:underline`}>
                  About
                </a>
              </div>
            </div>
            <div className="morphism flex w-full flex-col justify-between rounded-lg border-white bg-transparent p-8 shadow-lg">
              <h3 className="noto text-lg">Join the Chilihead Club</h3>
              <a href="https://visitor.r20.constantcontact.com/manage/optin?v=0014Ogu2wnBvl8_ZbMlMzQ9KVX9rpr_smoVitHZKZig-keypGiny6WIeEEgXcEOx1-AiOhKLXw2Q2L0sW0VsGJ6VT7G5BoeQ4qErEvgGW2CZEo%3D">
                <Button
                  variant="default"
                  className="mt-2 rounded-full bg-white px-5 py-2 text-xl text-stone-900 transition-all duration-300 hover:translate-y-[-1px] hover:bg-white active:translate-y-[1px] active:scale-90"
                >
                  🌶️ Join Now
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="noto flex items-center justify-center gap-1 text-lg text-white">
          &copy; {new Date().getFullYear()}{" "}
          <Button variant="link" className="p-0 text-base text-white">
            Tolbert's Restaurant
          </Button>
        </div>
      </div>
    </footer>
  );
}

import { Button } from "./ui/button";
import styles from "../styles/globals.css";

export default function Footer() {
  return (
    <footer className=" urbanist bg-black pb-10 pt-8 ">
      <div className="morphism chili mx-auto max-w-7xl rounded-lg border-white bg-transparent p-8 shadow-lg">
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
              <p>
                Open daily at 11:00am
                <p>
                  Closing times may vary so please call first to verify. Enjoy
                  Happy Hour Monday thru Friday!
                </p>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2">
            <h3 className="noto text-3xl">Contact Us</h3>
            <form className="flex w-full flex-col gap-2 rounded-lg p-4">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <Button
                className="rounded-full bg-lime-500 px-5 py-2 text-xl hover:bg-lime-600"
                type="submit"
              >
                Submit
              </Button>
            </form>
            <div className="morphism flex flex-col items-center gap-0 rounded-lg border-white bg-transparent p-8 shadow-lg">
              <a href="tel:(817)421-4888<"> 📲 (817) 421-4888</a>
              <a href="mailto:info@tolbertsrestaurant.com">
                ✉️ info@tolbertsrestaurant.com
              </a>
            </div>
          </div>
          <div className="morphism flex flex-col items-center gap-2 p-4">
            <div className=" flex flex-col items-center gap-2">
              <h3 className="noto text-3xl">Site Map</h3>
              <div className="flex flex-col items-center gap-0 pt-2">
                <a href="/" className={`p-2 text-xl hover:underline`}>
                  🏠 Home
                </a>

                <a
                  href="https://tolbertscms.com/wp-content/uploads/2024/04/TolbertsNewMenu010324.pdf"
                  className={`p-2 text-xl hover:underline`}
                >
                  🌶️ Menu
                </a>
                <a
                  href="http://tolbertscms.com/wp-content/uploads/2024/04/Brunch-Menu-Current-April-2023.pdf"
                  className={`p-2 text-xl hover:underline`}
                >
                  🍳 Brunch
                </a>
                <a href="/calendar" className={`p-2 text-xl hover:underline`}>
                  🗓️ Calendar
                </a>
                <a href="/about" className={`p-2 text-xl hover:underline`}>
                  👋 About
                </a>
              </div>
            </div>
            <div className="morphism flex flex-col justify-between rounded-lg border-white bg-transparent p-8 shadow-lg">
              <h3 className="noto text-lg">Join the Chilihead Club</h3>
              <Button
                variant="default"
                className="rounded-full bg-lime-500 px-5 py-2 text-xl text-black hover:bg-lime-600"
              >
                🌶️ Join Now
              </Button>
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

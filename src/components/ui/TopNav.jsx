import { useState, useEffect } from "react";
import style from "../../styles/topnav.module.css";

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial state based on scroll position on the client
      const initialScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrolled(initialScrollTop > 100);

      const checkScroll = () => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        setIsScrolled(scrollTop > 100);
      };

      window.addEventListener("scroll", checkScroll);
      return () => {
        window.removeEventListener("scroll", checkScroll);
      };
    }
  }, []);

  return (
    <nav
      className={`duration-800 urbanist fixed top-0 z-50 w-full justify-between rounded-b-lg p-4 text-xl font-semibold shadow-lg	transition-all ${isScrolled ? "bg-white text-black" : "bg-black text-white"}`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div
          className="logo duration-800 transition-all"
          style={{ width: isScrolled ? "75px" : "125px" }}
        >
          <a href="/">
            <img
              className="h-auto"
              src={
                isScrolled
                  ? "src/assets/logo-black.png"
                  : "src/assets/logo-white.png"
              }
              alt="Logo"
            />
          </a>
        </div>

        {/* Mobile menu button */}

        <button
          className="flex items-center pb-2 text-4xl sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop navigation links */}

        <div className="menu flex hidden w-full items-center justify-end space-x-4 underline-offset-4 sm:flex">
          <a
            href="/"
            className={`text-xl hover:underline ${isScrolled ? "text-black" : "text-white"}`}
          >
            Home
          </a>
          <a
            href="/calendar"
            className={`text-xl hover:underline ${isScrolled ? "text-black" : "text-white"}`}
          >
            Calendar
          </a>
          <a
            href="/"
            className={`text-xl hover:underline ${isScrolled ? "text-black" : "text-white"}`}
          >
            Menu
          </a>
          <a
            href="/about"
            className={`text-xl hover:underline ${isScrolled ? "text-black" : "text-white"}`}
          >
            About
          </a>
          <select
            className={` rounded-full bg-lime-500 px-5 py-2 text-xl hover:bg-lime-600  ${isScrolled ? "text-white" : "text-black"}`}
            onChange={(e) => (window.location.href = e.target.value)}
          >
            {" "}
            <option value="" selected disabled>
              Order Food
            </option>
            <option value="https://www.ubereats.com">Uber Eats</option>
            <option value="https://www.doordash.com">Door Dash</option>
          </select>
        </div>
      </div>

      {/* Mobile navigation links */}

      <div
        className={`menu flex w-full items-center justify-end gap-4 underline-offset-4 transition-opacity duration-500 sm:hidden md:flex md:hidden ${isMenuOpen ? "visible flex h-auto flex-col opacity-100 sm:block" : "invisible h-0 opacity-0 md:flex"}`}
      >
        <a
          href="/"
          className={`p-2 text-3xl hover:underline  ${isScrolled ? "text-black" : "text-white"}`}
        >
          Home
        </a>
        <a
          href="/calendar"
          className={`p-2 text-3xl hover:underline  ${isScrolled ? "text-black" : "text-white"}`}
        >
          Calendar
        </a>
        <a
          href="/"
          className={`p-2 text-3xl hover:underline  ${isScrolled ? "text-black" : "text-white"}`}
        >
          Menu
        </a>
        <a
          href="/about"
          className={`p-2 text-3xl hover:underline  ${isScrolled ? "text-black" : "text-white"}`}
        >
          About
        </a>
        <select
          className={`mb-4 rounded-full bg-lime-500 p-2 px-5 text-center text-3xl hover:bg-lime-600  ${isScrolled ? "text-white" : "text-black"}`}
          onChange={(e) => (window.location.href = e.target.value)}
        >
          <option value="" selected disabled>
            Order Food
          </option>
          <option value="https://www.ubereats.com">Uber Eats</option>
          <option value="https://www.doordash.com">Door Dash</option>
        </select>
      </div>
    </nav>
  );
}

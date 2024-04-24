import { useState, useEffect } from "react";

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
          <img
            className="h-auto"
            src={
              isScrolled
                ? "src/assets/logo-black.png"
                : "src/assets/logo-white.png"
            }
            alt="Logo"
          />
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
            href="/menu"
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
          <a
            href="/order"
            className={`text-xl hover:underline ${isScrolled ? "text-black" : "text-white"}`}
          >
            Order
          </a>
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
          href="/menu"
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
        <a
          href="/order"
          className={`p-2 text-3xl hover:underline  ${isScrolled ? "text-black" : "text-white"}`}
        >
          Order
        </a>
      </div>
    </nav>
  );
}

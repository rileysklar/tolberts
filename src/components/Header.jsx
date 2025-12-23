import { useState, useEffect } from "react";
import { Button } from "./ui/button"; // Ensure Button is a valid import
import MobileNav from "./MobileNav"; // Correct import for MobileNav

const staticLinks = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Calendar", url: "/calendar" },
  { label: "Menu", url: "/menu" }, // Updated to point to the new menu page
  // { label: "Brunch", url: "/brunch-menu" }, // Updated to point to the new brunch menu page
  {
    label: "Order Food",
    url: "https://order.spoton.com/rbbt-tolberts-restaurant-and-chili-parlor-15291/grapevine-tx/64e7d0d48137b6003f171eba",
    isButton: true,
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderDesktopLinks = () => {
    return staticLinks.map(({ label, url, isButton }) =>
      isButton ? (
        <a key={label} href={url}>
          <Button
            className={`rounded-full bg-teal-600 px-5 py-2 font-semibold hover:bg-teal-700 ${
              isScrolled ? "text-white" : "text-white"
            } text-xl`}
          >
            {label}
          </Button>
        </a>
      ) : (
        <a
          key={label}
          href={url}
          className={`hover:underline ${
            isScrolled ? "text-stone-900" : "text-white"
          } text-xl`}
        >
          {label}
        </a>
      ),
    );
  };

  return (
    <nav
      className={`duration-800 urbanist fixed top-0 z-50 w-full p-4 font-semibold shadow-lg transition-all ${
        isScrolled ? "bg-white text-stone-900" : "bg-stone-900 text-white"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Logo */}
        <div
          className="logo duration-800 transition-all"
          style={{ width: isScrolled ? "75px" : "125px" }}
        >
          <a href="/">
            <img
              className="h-auto"
              src={isScrolled ? "/logo-black.png" : "/logo-white.png"}
              alt="Tolbert's Restaurant Logo"
            />
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="hidden w-full items-center justify-end space-x-4 underline-offset-4 sm:flex">
          {renderDesktopLinks()}
        </div>

        {/* Mobile navigation */}
        <MobileNav isScrolled={isScrolled} staticLinks={staticLinks} />
      </div>
    </nav>
  );
}

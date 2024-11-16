import { useState, useEffect } from "react";
import { Button } from "./ui/button"; // Ensure Button is a valid import
import MobileNav from "./MobileNav"; // Correct import for MobileNav

const cmsLinks = [
  {
    label: "Menu",
    url: "https://tolbertscms.com/wp-content/uploads/2024/11/TolbertsNewMenu090424.pdf",
  },
  {
    label: "Brunch",
    url: "https://tolbertscms.com/wp-content/uploads/2024/04/Brunch-Menu-Current-April-2023.pdf",
  },
];

const staticLinks = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Calendar", url: "/calendar" },
  {
    label: "Order Food",
    url: "https://order.spoton.com/rbbt-tolberts-restaurant-and-chili-parlor-15291/grapevine-tx/64e7d0d48137b6003f171eba",
    isButton: true,
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [availableCmsLinks, setAvailableCmsLinks] = useState([]);

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

  useEffect(() => {
    const checkLinks = async () => {
      const validatedLinks = await Promise.all(
        cmsLinks.map(async (link) => {
          try {
            const proxyUrl = `/api/resource-check.json?url=${encodeURIComponent(
              link.url,
            )}`;

            const response = await fetch(proxyUrl);
            const data = await response.json();

            return data.ok ? link : null;
          } catch (err) {
            console.error(`Error validating link: ${link.url}`, err);
            return null;
          }
        }),
      );

      setAvailableCmsLinks(validatedLinks.filter(Boolean));
    };

    checkLinks();
  }, []);

  const renderDesktopLinks = () => {
    const orderFoodLink = staticLinks.find(
      (link) => link.label === "Order Food",
    );
    const otherStaticLinks = staticLinks.filter(
      (link) => link.label !== "Order Food",
    );

    const combinedLinks = [...otherStaticLinks, ...availableCmsLinks];

    return [
      ...combinedLinks.map(({ label, url, isButton }) =>
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
      ),
      <a key={orderFoodLink.label} href={orderFoodLink.url}>
        <Button
          className={`rounded-full bg-teal-600 px-5 py-2 font-semibold hover:bg-teal-700 ${
            isScrolled ? "text-white" : "text-white"
          } text-xl`}
        >
          {orderFoodLink.label}
        </Button>
      </a>,
    ];
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
              alt="Logo"
            />
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="hidden w-full items-center justify-end space-x-4 underline-offset-4 sm:flex">
          {renderDesktopLinks()}
        </div>

        {/* Mobile navigation */}
        <MobileNav
          isScrolled={isScrolled}
          availableCmsLinks={availableCmsLinks}
          staticLinks={staticLinks}
        />
      </div>
    </nav>
  );
}

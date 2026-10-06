import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Adjust the path as necessary
import { Button } from "./ui/button"; // Ensure this import is correct

export default function MobileNav({ isScrolled, staticLinks }) {
  const renderMobileLinks = () => {
    return staticLinks.map(({ label, url, isButton }) =>
      isButton ? (
        <a key={label} href={url}>
          <Button className="w-full text-lg font-semibold text-white">
            {label}
          </Button>
        </a>
      ) : (
        <a
          key={label}
          href={url}
          className="block w-full rounded-lg px-3 py-2 text-lg font-medium text-white hover:bg-white/10"
        >
          {label}
        </a>
      ),
    );
  };

  return (
    <Sheet>
      {/* Mobile menu button */}
      <SheetTrigger asChild>
        <button
          className={`ml-auto flex items-center text-3xl font-bold sm:hidden ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          ☰
        </button>
      </SheetTrigger>

      {/* Sheet content */}
      <SheetContent className={`bg-stone-900 text-white`}>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-white">
            <a href="/">
              <img
                className="h-auto w-3/4"
                src={"/logo-white.png"}
                alt="Logo"
              />
            </a>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-4">{renderMobileLinks()}</div>
      </SheetContent>
    </Sheet>
  );
}

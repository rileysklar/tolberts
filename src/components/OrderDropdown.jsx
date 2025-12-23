import React, { useState } from "react";
import { Button } from "./ui/button";

function OrderDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <Button
        onClick={handleButtonClick}
        className="rounded-full bg-teal-600 px-5 py-4 text-xl text-white hover:bg-teal-700"
      >
        🚙 Order Food
      </Button>
      {isOpen && (
        <div className="is-open align-center z-100 absolute left-[34px] mt-1 flex flex-col gap-2 rounded-lg bg-stone-900 p-4 text-xl text-white">
          <a
            className="hover:text-teal-400 active:text-teal-400"
            href="https://www.ubereats.com/dallas/food-delivery/tolberts-restaurant/E0auRfDRQ_e9RRP32vWMQw?fbclid=IwAR0qXPc6YEgE8uzjHTcMQ_kVj-eVv1NcGkO8PCDLkA-8tgO9NC6Z1XBT6yM"
          >
            Uber Eats
          </a>
          <a
            className="hover:text-teal-400 active:text-teal-400"
            href="https://www.doordash.com/store/tolbert's-restaurant-grapevine-27945/?fbclid=IwAR34uGVgDg3xEm0VoUWg4rKZafHMrEgQLDWPmzhNHhM2gvIx36rCwemQcEo"
          >
            Door Dash
          </a>
        </div>
      )}
    </div>
  );
}

export default OrderDropdown;

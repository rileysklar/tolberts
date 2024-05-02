import React, { useState } from "react";

function OrderDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        onClick={handleButtonClick}
        className="order-btn inline-block rounded-full bg-lime-500 px-5 py-2 text-xl text-black hover:bg-lime-600"
      >
        🚙 Order Food
      </button>
      {isOpen && (
        <div className="is-open align-center z-100 absolute left-[34px] mt-1 flex flex-col gap-2 rounded-lg bg-black p-4 text-xl text-white">
          <a href="https://www.ubereats.com/dallas/food-delivery/tolberts-restaurant/E0auRfDRQ_e9RRP32vWMQw?fbclid=IwAR0qXPc6YEgE8uzjHTcMQ_kVj-eVv1NcGkO8PCDLkA-8tgO9NC6Z1XBT6yM">
            Uber Eats
          </a>
          <a href="https://www.doordash.com/store/tolbert's-restaurant-grapevine-27945/?fbclid=IwAR34uGVgDg3xEm0VoUWg4rKZafHMrEgQLDWPmzhNHhM2gvIx36rCwemQcEo">
            Door Dash
          </a>
        </div>
      )}
    </div>
  );
}

export default OrderDropdown;

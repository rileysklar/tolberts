import { useState } from "react";
import styles from "../styles/globals.css";

function OrderDropdown() {
  const [selected, setSelected] = useState("");

  const options = {
    "Uber Eats":
      "https://www.ubereats.com/dallas/food-delivery/tolberts-restaurant/E0auRfDRQ_e9RRP32vWMQw?fbclid=IwAR0qXPc6YEgE8uzjHTcMQ_kVj-eVv1NcGkO8PCDLkA-8tgO9NC6Z1XBT6yM",
    "Door Dash":
      "https://www.doordash.com/store/tolbert's-restaurant-grapevine-27945/?fbclid=IwAR34uGVgDg3xEm0VoUWg4rKZafHMrEgQLDWPmzhNHhM2gvIx36rCwemQcEo",
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    window.location.href = options[event.target.value];
  };

  return (
    <div>
      <input
        list="order-options"
        value={selected}
        onChange={handleChange}
        placeholder="🚙 Order Food"
        className="w-auto rounded-full bg-lime-500 py-[10px] pl-[50] text-center text-xl text-black hover:bg-lime-600"
      />
      <datalist id="order-options">
        <option value="Uber Eats">Uber Eats</option>
        <option value="Door Dash">Door Dash</option>
      </datalist>
    </div>
  );
}

export default OrderDropdown;

import styles from "../styles/globals.css";

function OrderDropdown() {
  return (
    <select className="order-btn inline-block rounded-full bg-lime-500 px-5 py-2 text-xl text-black hover:bg-lime-600">
      <option value="" selected disabled>
        🚙 Order Food
      </option>
      <option value="https://www.ubereats.com/dallas/food-delivery/tolberts-restaurant/E0auRfDRQ_e9RRP32vWMQw?fbclid=IwAR0qXPc6YEgE8uzjHTcMQ_kVj-eVv1NcGkO8PCDLkA-8tgO9NC6Z1XBT6yM">
        Uber Eats
      </option>
      <option value="https://www.doordash.com/store/tolbert's-restaurant-grapevine-27945/?fbclid=IwAR34uGVgDg3xEm0VoUWg4rKZafHMrEgQLDWPmzhNHhM2gvIx36rCwemQcEo">
        Door Dash
      </option>
    </select>
  );
}

export default OrderDropdown;

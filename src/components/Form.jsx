import { Button } from "../components/ui/button";
import styles from "../styles/globals.css";

function Form() {
  <div className="morphism z-100">
    <h3 className="noto text-3xl">Contact Us</h3>
    <form className="flex w-full flex-col gap-2 rounded-lg p-4">
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <textarea placeholder="Your Message"></textarea>
      <Button
        className="rounded-full bg-lime-500 px-5 py-2 text-xl text-black hover:bg-lime-600 "
        type="submit"
      >
        Submit
      </Button>
    </form>
  </div>;
}

export default Form;

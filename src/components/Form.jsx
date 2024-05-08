import { Button } from "../components/ui/button";

function Form() {
  return (
    <div className="morphism-x w-3/4">
      <h3 className="noto text-3xl"></h3>
      <form className="flex w-full flex-col gap-2 rounded-lg p-4">
        <p className="text-pretty text-center text-lg text-white">
          Rent our space, book your band, or learn about our chili! 🌶️
        </p>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <Button
          className="rounded-full bg-white px-5 py-2 text-xl text-black transition-all duration-300 hover:translate-y-[-1px] hover:bg-white active:translate-y-[1px] active:scale-90"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Form;

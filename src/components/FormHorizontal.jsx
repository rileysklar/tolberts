import { Button } from "../components/ui/button";

function FormHorizontal() {
  return (
    <div className="chili bg-black  p-8">
      <div className="morphism w-full">
        <h3 className="noto text-pretty pt-4 text-center text-xl text-white sm:text-3xl">
          Rent our space, book your band, or get in touch about our chili! 🌶️
        </h3>
        <form className="sm:align-center flex w-full flex-col justify-center gap-2 rounded-lg p-4 sm:flex-row sm:items-center">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea
            placeholder="Your Message"
            className="sm:h-[43px] sm:w-[50%]"
          ></textarea>
          <Button
            className="rounded-full bg-white px-5 py-2 text-xl text-black transition-all duration-300 hover:translate-y-[-1px] hover:bg-white active:translate-y-[1px] active:scale-90"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormHorizontal;

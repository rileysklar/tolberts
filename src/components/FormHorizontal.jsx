import { Button } from "../components/ui/button";
import { useState } from "react";

function FormHorizontal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    console.log("handleSubmit called");
    event.preventDefault();

    const response = await fetch("/api/contact-form-api.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: name,
        content: message,
        fields: { email },
      }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Failed to create post");
    }
  };
  return (
    <div className="chili bg-black  p-8">
      <div className="morphism w-full">
        <h3 className="noto text-pretty pt-4 text-center text-xl text-white sm:text-3xl">
          Rent our space, book your band, or get in touch about our chili! 🌶️
        </h3>
        <form
          onSubmit={handleSubmit}
          className="sm:align-center flex w-full flex-col justify-center gap-2 rounded-lg p-4 sm:flex-row sm:items-center"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

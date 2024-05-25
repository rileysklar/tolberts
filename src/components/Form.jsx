import { useState } from "react";
import { Button } from "../components/ui/button";

function Form() {
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
    <div className="morphism-x w-full">
      <h3 className="noto text-3xl"></h3>
      <form
        className="flex w-full flex-col gap-2 rounded-lg p-4"
        onSubmit={handleSubmit}
      >
        <p className="text-pretty text-center text-lg text-white">
          Rent our space, book your band, or learn about our chili! 🌶️
        </p>
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
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
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

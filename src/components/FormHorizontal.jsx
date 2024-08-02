import { Button } from "./ui/button"; 
import { useState } from "react";

function FormHorizontal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/contact-form-api.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: name,
        content: message,
        acf: {
          name: name,
          email: email,
          message: message,
        },
      }),
    });
    
    if (response.ok) {
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setIsSubmitted(false), 5000); 
    } else {
      console.error("Submission failed");
    }
  };

  return (
    <div className="p-8 py-16 lg:py-24">
      <div className="morphism-x mx-auto w-full max-w-2xl lg:px-8 lg:py-6 py-4 lg:flex flex-col gap-4">
        <h3 className="noto mx-4 text-pretty pt-4 text-center text-2xl text-white md:text-3xl lg:text-4xl">
          Rent our space, book your band, or get in touch about our chili! 🌶️
        </h3>
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="grid w-full gap-2 rounded-lg p-4 sm:grid-cols-1 lg:grid-cols-2"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="lg:col-span-1 lg:row-span-1"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="lg:col-span-1 lg:row-span-1"
            />
            <input
              type="text"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="sm:h-[43px] lg:col-span-2"
            />
            <Button
              size="lg"
              type="submit"
              className="lg:col-span-2"
            >
              Submit
            </Button>
          </form>
        ) : (
          <p className="m-2 flex content-center justify-center rounded-lg bg-teal-500 p-4 py-6 text-center text-2xl text-stone-900">
            Thank you for getting in touch with us! We will get back to you as soon as possible.
          </p>
        )}
      </div>
    </div>
  );
}

export default FormHorizontal;

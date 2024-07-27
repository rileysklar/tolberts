import { Button } from "../components/ui/button";
import { useState } from "react";

function FormHorizontal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Step 1: New state variable for submission status

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
        acf: {
          name: name,
          email: email,
          message: message,
        },
      }),
    });
    console.log(response);
    if (response.ok) {
      setIsSubmitted(true); // Step 2: Update the submission status
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
    } else {
      // Handle submission error
      console.error("Submission failed");
    }
  };

  return (
    <div className="chili bg-black  p-8 py-16">
      <div className="max-w-7xl mx-auto w-full">
        <h3 className="noto mx-4 text-pretty pt-4 text-center text-2xl text-white md:text-3xl lg:text-4xl">
          Rent our space, book your band, or get in touch about our chili! 🌶️
        </h3>
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="sm:align-center flex w-full flex-col justify-center gap-2 rounded-lg p-4 sm:flex-row sm:items-center"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
            <input
              type="text"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="sm:h-[43px] sm:w-[50%]"
            ></input>
            <Button
              className="rounded-full bg-white px-5 py-2 text-xl text-black transition-all duration-300 hover:translate-y-[-1px] hover:bg-white active:translate-y-[1px] active:scale-90"
              type="submit"
            >
              Submit
            </Button>
          </form>
        ) : (
          <p className="m-2 flex content-center justify-center rounded-lg bg-green-400 p-4 py-6 text-center text-2xl text-black ">
            Thank you for your getting in touch with us! We will get back to you
            as soon as possible.
          </p> // Step 3: Conditionally render the thank you message
        )}
      </div>
    </div>
  );
}

export default FormHorizontal;

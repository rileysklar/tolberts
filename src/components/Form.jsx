import { Button } from "../components/ui/button";
import { useState } from "react";

function Form() {
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
    <div className="w-full bg-stone-900">
      <div className="morphism w-full rounded-lg p-4 sm:p-5">
        <h3 className="noto pb-4 text-2xl sm:text-3xl">Contact Us</h3>
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 rounded-lg sm:items-center"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm sm:text-base"
              required
            />
            <input
              type="text"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-sm sm:text-base"
              required
            />
            <Button
              className="mt-1 rounded-full bg-white px-5 py-2 text-base text-stone-900 transition-all duration-300 hover:translate-y-[-1px] hover:bg-white active:translate-y-[1px] active:scale-90 sm:text-lg"
              type="submit"
              required
            >
              Submit
            </Button>
          </form>
        ) : (
          <p className="m-2 flex content-center justify-center rounded-lg bg-green-400 p-4 py-5 text-center text-lg text-stone-900 sm:text-xl">
            Thank you for your submission!
          </p>
        )}
      </div>
    </div>
  );
}

export default Form;

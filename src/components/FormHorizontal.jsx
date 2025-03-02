import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";

function FormHorizontal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Honeypot field
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Error state for validation messages
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const MIN_MESSAGE_LENGTH = 15; // Minimum message length (about 3 words)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Check if honeypot is filled (bots will typically fill this)
    if (honeypot) {
      // Silently reject the submission but show success message to the bot
      console.log("Honeypot triggered, submission ignored");
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      return;
    }

    // Validate message length
    if (message.length < MIN_MESSAGE_LENGTH) {
      setError(
        `Please provide a more detailed message (at least ${MIN_MESSAGE_LENGTH} characters).`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
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
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setIsSubmitted(true);
          setName("");
          setEmail("");
          setMessage("");
          setTimeout(() => setIsSubmitted(false), 5000);
        }
      } else {
        const errorData = await response.json().catch(() => null);
        setError(
          errorData?.message || "Submission failed. Please try again later.",
        );
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 py-16">
      <div className="morphism-x mx-auto flex w-full max-w-7xl flex-col items-center py-4">
        <h3 className="noto mx-4 text-pretty pt-4 text-center text-2xl text-white md:text-3xl lg:text-4xl">
          Rent our space, book your band, or get in touch about our chili! 🌶️
        </h3>
        {/* <p className="md:text-md mx-4 mt-4 rounded-lg border-2 border-red-400 p-2 text-center text-sm text-red-400 lg:text-lg">
          Due to high traffic for the Holidays, we will not be accepting
          reservations through the end of the year. We apologize for any
          inconvenience.
        </p> */}

        {error && (
          <p className="m-2 flex content-center justify-center rounded-lg bg-red-400 p-4 text-center text-stone-900">
            {error}
          </p>
        )}

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
              aria-label="Your Name"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Your Email"
            />
            <input
              type="text"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="sm:h-[43px] sm:w-[50%]"
              aria-label="Your Message"
              minLength={MIN_MESSAGE_LENGTH}
            />
            {/* Honeypot field - hidden from users but visible to bots */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>
            <Button
              className="rounded-full bg-white px-5 py-2 text-xl text-stone-900 transition-all duration-300 hover:translate-y-[-1px] hover:bg-white active:translate-y-[1px] active:scale-90"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        ) : (
          <p className="m-2 flex content-center justify-center rounded-lg bg-green-400 p-4 py-6 text-center text-2xl text-stone-900">
            Thank you for getting in touch with us! We will get back to you as
            soon as possible.
          </p>
        )}
      </div>
    </div>
  );
}

export default FormHorizontal;

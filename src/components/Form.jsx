import { Button } from "../components/ui/button";
import { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MIN_MESSAGE_LENGTH = 15;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Honeypot check
    if (honeypot) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      return;
    }

    // Frontend validation
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!message.trim() || message.trim().length < MIN_MESSAGE_LENGTH) {
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

      const data = await response.json().catch(() => null);

      if (response.ok) {
        if (data?.error) {
          setError(data.error);
        } else {
          setIsSubmitted(true);
          setName("");
          setEmail("");
          setMessage("");
          setTimeout(() => setIsSubmitted(false), 5000);
        }
      } else {
        setError(
          data?.error ||
            data?.message ||
            "Submission failed. Please try again later.",
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
    <div className="w-full bg-stone-900">
      <div className="morphism w-full rounded-lg p-4 sm:p-5">
        <h3 className="noto pb-4 text-2xl sm:text-3xl">Contact Us</h3>

        {error && (
          <p className="m-2 flex content-center justify-center rounded-lg bg-red-400 p-4 text-center text-stone-900">
            {error}
          </p>
        )}

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
              required
              aria-label="Your Name"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm sm:text-base"
              required
              aria-label="Your Email"
            />
            <input
              type="text"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-sm sm:text-base"
              required
              aria-label="Your Message"
              minLength={MIN_MESSAGE_LENGTH}
            />
            {/* Honeypot field */}
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
              className="mt-1 rounded-full bg-white px-5 py-2 text-base text-stone-900 transition-all duration-300 hover:translate-y-[-1px] hover:bg-white active:translate-y-[1px] active:scale-90 sm:text-lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
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

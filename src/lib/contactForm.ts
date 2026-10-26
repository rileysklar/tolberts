export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResult {
  ok: boolean;
  message?: string;
}

/** Give up after this long so a hung backend does not leave the form spinning. */
const SUBMIT_TIMEOUT_MS = 15_000;

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ContactFormResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const response = await fetch("/api/contact-form-api.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: payload.name,
        content: payload.message,
        acf: {
          name: payload.name,
          email: payload.email,
          message: payload.message,
        },
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (response.ok && !data?.error) {
      return { ok: true };
    }

    const fallbackMessage =
      response.status === 503
        ? "Our contact form is temporarily unavailable. Please email or call us instead."
        : "We couldn't submit your message. Please try again in a moment.";

    return {
      ok: false,
      message: data?.error || data?.message || fallbackMessage,
    };
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error("Contact form submission failed:", error);

    return {
      ok: false,
      message: timedOut
        ? "The request took too long. Please try again, or email or call us directly."
        : "We couldn't reach our contact form. Please check your connection, or email or call us directly.",
    };
  } finally {
    clearTimeout(timer);
  }
}

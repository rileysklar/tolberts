import {
  WORDPRESS_PASSWORD,
  WORDPRESS_URL,
  WORDPRESS_USER,
} from "astro:env/server";

export const prerender = false;

const MIN_MESSAGE_LENGTH = 15;
const WORDPRESS_TIMEOUT_MS = 8_000;
const CONTACT_FALLBACK =
  "Please email us at tolbertsrestaurant@gmail.com or call (817) 421-4888.";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function runtimeEnv(name) {
  try {
    if (typeof process !== "undefined" && process.env) {
      return process.env[name];
    }
  } catch {
    // Ignore runtimes without `process`.
  }

  return undefined;
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function getWordPressConfig() {
  // Secrets are supplied by `astro:env` at runtime (with a process.env
  // fallback), so they are not inlined into the build output.
  const url = firstNonEmpty(WORDPRESS_URL, runtimeEnv("WORDPRESS_URL"));
  const user = firstNonEmpty(WORDPRESS_USER, runtimeEnv("WORDPRESS_USER"));
  const password = firstNonEmpty(
    WORDPRESS_PASSWORD,
    runtimeEnv("WORDPRESS_PASSWORD"),
  );

  if (!url || !user || !password) {
    return null;
  }

  return {
    url: url.replace(/\/+$/, ""),
    user,
    password,
  };
}

export const POST = async ({ request }) => {
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  // Validate required fields
  if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
    return jsonResponse({ error: "Please enter your name." }, 400);
  }

  const email =
    typeof body.acf?.email === "string" ? body.acf.email.trim() : "";

  if (!email) {
    return jsonResponse({ error: "Please enter your email address." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }

  if (
    !body.content ||
    typeof body.content !== "string" ||
    body.content.trim().length < MIN_MESSAGE_LENGTH
  ) {
    return jsonResponse(
      {
        error: `Please provide a more detailed message (at least ${MIN_MESSAGE_LENGTH} characters).`,
      },
      400,
    );
  }

  const config = getWordPressConfig();

  if (!config) {
    console.error(
      "[contact] WORDPRESS_URL / WORDPRESS_USER / WORDPRESS_PASSWORD is not configured.",
    );
    return jsonResponse(
      {
        error: `Our contact form is temporarily unavailable. ${CONTACT_FALLBACK}`,
      },
      503,
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WORDPRESS_TIMEOUT_MS);

  try {
    const wpResponse = await fetch(
      `${config.url}/wp-json/custom/v1/submit_contact_form`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${config.user}:${config.password}`).toString("base64"),
        },
        body: JSON.stringify({
          title: body.title,
          content: body.content,
          name: body.acf?.name ?? body.title,
          email,
          message: body.acf?.message ?? body.content,
        }),
        signal: controller.signal,
      },
    );

    // WordPress can return an HTML error page during outages; parse defensively.
    const raw = await wpResponse.text().catch(() => "");
    let wpData = null;
    if (raw) {
      try {
        wpData = JSON.parse(raw);
      } catch {
        wpData = null;
      }
    }

    if (!wpResponse.ok) {
      console.error(
        `[contact] WordPress responded with HTTP ${wpResponse.status}`,
        raw.slice(0, 500),
      );

      if (wpResponse.status >= 500 || wpResponse.status === 429) {
        return jsonResponse(
          {
            error: `Our contact form is temporarily unavailable. ${CONTACT_FALLBACK}`,
          },
          503,
        );
      }

      const message =
        typeof wpData?.message === "string"
          ? wpData.message
          : typeof wpData?.error === "string"
            ? wpData.error
            : "We couldn't submit your message. Please check your details and try again.";

      return jsonResponse({ error: message }, 400);
    }

    // Some WordPress setups report failures inside a 200 response.
    if (
      wpData &&
      typeof wpData === "object" &&
      (wpData.success === false || typeof wpData.error === "string")
    ) {
      const message =
        typeof wpData.message === "string"
          ? wpData.message
          : typeof wpData.error === "string"
            ? wpData.error
            : "We couldn't submit your message. Please try again.";

      return jsonResponse({ error: message }, 400);
    }

    return jsonResponse(wpData ?? { success: true }, 200);
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error("[contact] Unable to reach WordPress:", error);

    return jsonResponse(
      {
        error: timedOut
          ? `Our contact form took too long to respond. ${CONTACT_FALLBACK}`
          : `We couldn't reach our contact form. ${CONTACT_FALLBACK}`,
      },
      503,
    );
  } finally {
    clearTimeout(timer);
  }
};

export const GET = async () =>
  jsonResponse({ error: "Method not allowed." }, 405);

export const DELETE = async () =>
  jsonResponse({ error: "Method not allowed." }, 405);

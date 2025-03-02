export const prerender = false;

// Simple in-memory store for IP tracking
// In a production environment, you would use a database or Redis
const ipSubmissionTracker = new Map();
const RATE_LIMIT_HOURS = 24;

export const POST = async ({ request, clientAddress }) => {
  const body = await request.json();
  const ip =
    clientAddress || request.headers.get("x-forwarded-for") || "unknown";

  // Check if this IP has submitted recently
  const lastSubmission = ipSubmissionTracker.get(ip);
  const now = Date.now();

  if (
    lastSubmission &&
    now - lastSubmission < RATE_LIMIT_HOURS * 60 * 60 * 1000
  ) {
    // Calculate time remaining in hours
    const hoursRemaining = Math.ceil(
      RATE_LIMIT_HOURS - (now - lastSubmission) / (60 * 60 * 1000),
    );

    return new Response(
      JSON.stringify({
        error: `You've already submitted a message. Please wait ${hoursRemaining} hour${hoursRemaining > 1 ? "s" : ""} before sending another.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  // Validate message length
  const MIN_MESSAGE_LENGTH = 15;
  if (!body.content || body.content.length < MIN_MESSAGE_LENGTH) {
    return new Response(
      JSON.stringify({
        error: `Please provide a more detailed message (at least ${MIN_MESSAGE_LENGTH} characters).`,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const url = `${import.meta.env.WORDPRESS_URL}/wp-json/custom/v1/submit_contact_form`;

  try {
    const wpResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${import.meta.env.WORDPRESS_USER}:${import.meta.env.WORDPRESS_PASSWORD}`,
          ).toString("base64"),
      },
      body: JSON.stringify({
        title: body.title,
        content: body.content,
        name: body.acf.name,
        email: body.acf.email,
        message: body.acf.message,
      }),
    });

    if (!wpResponse.ok) {
      return new Response(JSON.stringify({ error: "Failed to create post" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Store the IP and timestamp for rate limiting
    ipSubmissionTracker.set(ip, now);

    // Clean up old entries (optional, to prevent memory leaks)
    const CLEANUP_THRESHOLD = 1000; // Number of IPs to store before cleanup
    if (ipSubmissionTracker.size > CLEANUP_THRESHOLD) {
      const cutoffTime = now - RATE_LIMIT_HOURS * 60 * 60 * 1000;
      for (const [storedIp, timestamp] of ipSubmissionTracker.entries()) {
        if (timestamp < cutoffTime) {
          ipSubmissionTracker.delete(storedIp);
        }
      }
    }

    const data = await wpResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    return new Response(
      JSON.stringify({ error: "Server error processing your request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const GET = async ({ params }) => {
  // Here you can handle GET requests
};

export const DELETE = async ({ params }) => {
  // Here you can handle DELETE requests
};

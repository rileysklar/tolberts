export const prerender = false;

export const POST = async ({ request }) => {
  const body = await request.json();

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

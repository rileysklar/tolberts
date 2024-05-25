export const prerender = false;

export const POST = async ({ request }) => {
  const body = await request.json();
  console.log(body);
  const url = "http://localhost:8889/wp-json/wp/v2/contact_form";
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
      fields: body.fields,
    }),
  });

  if (!wpResponse.ok) {
    return new Response("Failed to create post", { status: 400 });
  }

  const data = await wpResponse.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET = async ({ params }) => {
  // Here you can handle GET requests
};

export const DELETE = async ({ params }) => {
  // Here you can handle DELETE requests
};

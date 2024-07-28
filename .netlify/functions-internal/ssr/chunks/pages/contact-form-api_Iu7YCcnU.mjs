const prerender = false;
const POST = async ({ request }) => {
  const body = await request.json();
  const url = `${"https://tolbertscms.com"}/wp-json/wp/v2/contact_form`;
  const wpResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(
        `${"user"}:${"7TLY VyG4 uEhX 34sQ fgb9 opQF"}`
      ).toString("base64")
    },
    body: JSON.stringify({
      title: body.title,
      content: body.content,
      name: body.acf.name,
      email: body.acf.email,
      message: body.acf.message
    })
  });
  if (!wpResponse.ok) {
    return new Response("Failed to create post", { status: 400 });
  }
  const data = await wpResponse.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
const GET = async ({ params }) => {
};
const DELETE = async ({ params }) => {
};

export { DELETE, GET, POST, prerender };

export const prerender = false;

export const GET = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing 'url' query parameter", { status: 400 });
  }

  try {
    const headResponse = await fetch(targetUrl, { method: "HEAD" });

    if (!headResponse.ok) {
      return new Response(
        JSON.stringify({ status: headResponse.status, ok: false }),
        {
          status: headResponse.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Pass along headers or any additional information if needed
    return new Response(
      JSON.stringify({ status: headResponse.status, ok: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching target URL:", error);
    return new Response("Internal server error", { status: 500 });
  }
};

export const GET = async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url);
    const encodedUrl = searchParams.get("url");

    if (!encodedUrl) {
      return new Response("Missing 'url' query parameter", { status: 400 });
    }

    // Decode and validate the URL
    let targetUrl;
    try {
      targetUrl = decodeURIComponent(encodedUrl);
      new URL(targetUrl); // Throws if invalid
    } catch (error) {
      return new Response("Invalid URL provided", { status: 400 });
    }

    // Fetch the resource with HEAD request
    const headResponse = await fetch(targetUrl, { method: "HEAD" });

    if (!headResponse.ok) {
      return new Response(
        JSON.stringify({ status: headResponse.status, ok: false }),
        {
          status: 200, // Return 200 to indicate a response was provided, even if the resource isn't available.
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({ status: headResponse.status, ok: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching target URL:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

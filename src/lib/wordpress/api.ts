const API_URL = import.meta.env.WORDPRESS_API_URL;

export default async function fetchAPI(query, variables = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] =
      `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(
      `Failed to fetch API: ${json.errors.map((e) => e.message).join(", ")}`,
    );
  }

  if (!json.data) {
    console.error("No data returned from API:", json);
    throw new Error("No data returned from API");
  }

  return json.data;
}

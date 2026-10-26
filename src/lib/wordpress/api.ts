/**
 * Minimal, defensive WordPress (WPGraphQL) client.
 *
 * The CMS is hosted separately from this site, so every request is treated as
 * best-effort: requests are time-boxed, retried once on transient failures, and
 * surfaced as `WordPressUnavailableError` so callers can fall back to cached or
 * empty data instead of crashing a page render.
 */

const API_URL = resolveApiUrl();

function resolveApiUrl(): string | undefined {
  try {
    // Prefer runtime env on the server (Netlify) so the CMS URL can move
    // without rebuilding; fall back to the build-time value for local dev.
    const runtime =
      typeof process !== "undefined" ? process.env?.WORDPRESS_API_URL : "";
    const value = runtime || import.meta.env.WORDPRESS_API_URL;
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
  } catch {
    return undefined;
  }
}

const REQUEST_TIMEOUT_MS = 3_500;
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 250;

interface GraphQLError {
  message?: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export class WordPressUnavailableError extends Error {
  status?: number;
  retryable: boolean;

  constructor(
    message: string,
    options: { status?: number; retryable?: boolean } = {},
  ) {
    super(message);
    this.name = "WordPressUnavailableError";
    this.status = options.status;
    this.retryable = options.retryable ?? true;
  }
}

function getAuthToken(): string | undefined {
  try {
    if (typeof process !== "undefined" && process.env) {
      const runtime = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;
      if (runtime) {
        return runtime;
      }
    }

    const buildTime = import.meta.env.WORDPRESS_AUTH_REFRESH_TOKEN;
    return typeof buildTime === "string" && buildTime ? buildTime : undefined;
  } catch {
    // `process` is not available in every runtime; auth is optional anyway.
    return undefined;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestOnce<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  if (!API_URL) {
    throw new WordPressUnavailableError("WORDPRESS_API_URL is not configured", {
      retryable: false,
    });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    throw new WordPressUnavailableError(
      timedOut
        ? `WordPress API timed out after ${REQUEST_TIMEOUT_MS}ms`
        : "Could not reach the WordPress API",
    );
  } finally {
    clearTimeout(timer);
  }

  // Read as text first: outages often return an HTML error page, and
  // `response.json()` would blow up with a confusing parse error.
  const raw = await response.text().catch(() => "");
  let json: GraphQLResponse<T> | null = null;

  if (raw) {
    try {
      json = JSON.parse(raw) as GraphQLResponse<T>;
    } catch {
      throw new WordPressUnavailableError(
        `WordPress API returned a non-JSON response (HTTP ${response.status})`,
        { status: response.status },
      );
    }
  }

  if (!response.ok) {
    throw new WordPressUnavailableError(
      `WordPress API responded with HTTP ${response.status}`,
      {
        status: response.status,
        retryable: response.status >= 500 || response.status === 429,
      },
    );
  }

  if (json?.errors?.length) {
    // GraphQL validation errors are not transient; retrying cannot help.
    throw new WordPressUnavailableError(
      `GraphQL errors: ${json.errors
        .map((error) => error.message ?? "Unknown GraphQL error")
        .join(", ")}`,
      { status: response.status, retryable: false },
    );
  }

  if (!json?.data) {
    throw new WordPressUnavailableError("WordPress API returned no data", {
      status: response.status,
      retryable: false,
    });
  }

  return json.data;
}

export default async function fetchAPI<T = Record<string, any>>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return await requestOnce<T>(query, variables);
    } catch (error) {
      lastError = error;

      const retryable =
        !(error instanceof WordPressUnavailableError) || error.retryable;

      if (!retryable || attempt === MAX_ATTEMPTS) {
        break;
      }

      console.warn(
        `[wordpress] request failed (attempt ${attempt}/${MAX_ATTEMPTS}); retrying in ${RETRY_DELAY_MS}ms`,
        error,
      );
      await sleep(RETRY_DELAY_MS);
    }
  }

  console.error("[wordpress] request failed:", lastError);

  throw lastError instanceof Error
    ? lastError
    : new WordPressUnavailableError("Unknown WordPress API error");
}

/**
 * Minimal, defensive WordPress (WPGraphQL) client.
 *
 * The CMS is hosted separately from this site, so every request is treated as
 * best-effort: requests are time-boxed, retried once on transient failures, and
 * surfaced as `WordPressUnavailableError` so callers can fall back to cached or
 * empty data instead of crashing a page render.
 *
 * Secrets come from `astro:env/server` (runtime) so they are never inlined into
 * the build output by `import.meta.env`.
 */

import {
  WORDPRESS_API_URL,
  WORDPRESS_AUTH_REFRESH_TOKEN,
} from "astro:env/server";

const REQUEST_TIMEOUT_MS = 3_500;
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 250;

function runtimeEnv(name: string): string | undefined {
  try {
    if (typeof process !== "undefined" && process.env) {
      return process.env[name];
    }
  } catch {
    // `process` is not available in every runtime.
  }

  return undefined;
}

function firstNonEmpty(
  ...values: Array<string | undefined>
): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

const API_URL = firstNonEmpty(
  WORDPRESS_API_URL,
  runtimeEnv("WORDPRESS_API_URL"),
);

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
  return firstNonEmpty(
    WORDPRESS_AUTH_REFRESH_TOKEN,
    runtimeEnv("WORDPRESS_AUTH_REFRESH_TOKEN"),
  );
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

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });

    // Read as text first: outages often return an HTML error page, and
    // `response.json()` would blow up with a confusing parse error. The abort
    // timer intentionally stays active until the body is read, so a response
    // that sends headers and then stalls cannot hang the page render.
    const raw = await response.text();
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
  } catch (error) {
    if (error instanceof WordPressUnavailableError) {
      throw error;
    }

    const timedOut = error instanceof Error && error.name === "AbortError";

    throw new WordPressUnavailableError(
      timedOut
        ? `WordPress API timed out after ${REQUEST_TIMEOUT_MS}ms`
        : "Could not reach the WordPress API",
    );
  } finally {
    clearTimeout(timer);
  }
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

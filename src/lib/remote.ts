/**
 * Small helper for checking whether a remote asset (for example a menu PDF
 * hosted on WordPress) is reachable before redirecting a visitor to it.
 *
 * Never throws: any error or timeout is treated as "unavailable" so callers can
 * redirect to a locally bundled fallback instead.
 */

const DEFAULT_TIMEOUT_MS = 2_500;

interface ProbeResult {
  ok: boolean;
  status: number;
}

async function probe(
  url: string,
  method: "HEAD" | "GET",
  timeoutMs: number,
): Promise<ProbeResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      redirect: "follow",
      // A ranged GET is a fallback for hosts that reject HEAD. Cancelling the
      // body below avoids downloading the whole file.
      headers: method === "GET" ? { Range: "bytes=0-0" } : undefined,
    });

    if (method === "GET") {
      await response.body?.cancel().catch(() => {});
    }

    return { ok: response.ok, status: response.status };
  } finally {
    clearTimeout(timer);
  }
}

export async function isResourceAvailable(
  url: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<boolean> {
  if (!url) {
    return false;
  }

  try {
    const head = await probe(url, "HEAD", timeoutMs);

    if (head.ok) {
      return true;
    }

    // Only retry with GET when the host actively rejects the HEAD method. A
    // timeout or 404 means the asset is not usable, so fail fast. Some
    // hardened WordPress/WAF setups return 403 for HEAD but serve GET.
    if ([403, 405, 501].includes(head.status)) {
      const get = await probe(url, "GET", timeoutMs);
      return get.ok;
    }

    console.warn(
      `[remote] ${url} returned HTTP ${head.status}; using the local fallback.`,
    );
    return false;
  } catch (error) {
    console.warn(
      `[remote] Resource unavailable, using the local fallback: ${url}`,
      error,
    );
    return false;
  }
}

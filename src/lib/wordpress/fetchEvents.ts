import fetchAPI from "./api";

/**
 * Cache the last successful response for a short window. This both reduces
 * calls to the CMS and lets a warm serverless instance keep serving the
 * calendar if the CMS briefly goes away.
 */
const CACHE_TTL_MS = 60_000;

/**
 * After a failed request, skip the CMS for a short cooldown. Without this,
 * every visitor during an outage would wait for the full timeout + retry.
 */
const FAILURE_COOLDOWN_MS = 30_000;

interface EventsCache {
  edges: any[];
  fetchedAt: number;
}

let cache: EventsCache | null = null;
let lastFailureAt = 0;

function inFailureCooldown(): boolean {
  return lastFailureAt > 0 && Date.now() - lastFailureAt < FAILURE_COOLDOWN_MS;
}

export async function getEvents(): Promise<any[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.edges;
  }

  if (inFailureCooldown()) {
    return cache?.edges ?? [];
  }

  try {
    const data = await fetchAPI<{
      events?: { edges?: unknown[] | null } | null;
    }>(
      `query AllEvents {
          events(first: 100) {
              edges {
                node {
                  id
                  postTypeEvent {
                    date
                    endDate
                    primaryHeader
                    secondaryHeader
                    image {
                      sourceUrl
                    }
                    description
                    endTime
                    startTime
                  }
                }
              }
          }
      }
  `,
      {
        variables: {},
      },
    );

    const edges = Array.isArray(data?.events?.edges) ? data.events.edges : [];

    cache = { edges, fetchedAt: Date.now() };
    lastFailureAt = 0;
    return edges;
  } catch (error) {
    lastFailureAt = Date.now();

    console.error(
      "[wordpress] Unable to load events. Falling back to",
      cache ? "the last cached events." : "an empty calendar.",
      error,
    );

    // Serve stale events rather than blanking the calendar during an outage.
    return cache?.edges ?? [];
  }
}

export async function getSingleEvent(id: string): Promise<any | null> {
  try {
    const data = await fetchAPI<{ event?: unknown }>(
      `
        query getSingleEvent($id:ID!){
            event(id:$id){
              id,
              postTypeEvent {
                cta
                date
                location
                name
                primaryHeader
                secondaryHeader
                image {
                    sourceUrl
                }
                description
                endTime
                startTime
              }
            }
          }
        `,
      { id },
    );

    return data?.event ?? null;
  } catch (error) {
    console.error("[wordpress] Unable to load event", id, error);
    return null;
  }
}

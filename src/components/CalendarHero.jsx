import { useState } from "react";
import { eventBackgroundImage, formatEventTime } from "../lib/eventDisplay";

function FeaturedEvent({ event }) {
  const [showDescription] = useState(false);

  const postTypeEvent = event?.node?.postTypeEvent ?? {};
  const {
    image,
    primaryHeader,
    secondaryHeader,
    description,
    date,
    startTime,
    endTime,
  } = postTypeEvent;

  const timeLabel = formatEventTime(startTime, endTime);

  return (
    <div
      className="flex min-h-[400px] items-end justify-end bg-stone-900 bg-cover bg-center lg:col-span-2 lg:min-h-0"
      style={{ backgroundImage: eventBackgroundImage(image?.sourceUrl) }}
    >
      <div className="event-card-panel w-3/4 max-w-lg">
        {primaryHeader && (
          <h2 className="event-card-title event-card-title-featured">
            {primaryHeader}
          </h2>
        )}
        {secondaryHeader && (
          <h3 className="event-card-description">{secondaryHeader}</h3>
        )}
        {date && <p className="event-card-meta mt-2">🗓️ {date}</p>}
        {timeLabel && <p className="event-card-meta mt-1">⏰ {timeLabel}</p>}
        {showDescription && description && (
          <p className="mt-2 text-sm text-white/80">{description}</p>
        )}
      </div>
    </div>
  );
}

function SecondaryEventCard({ event }) {
  const [showDescription] = useState(false);

  const postTypeEvent = event?.node?.postTypeEvent ?? {};
  const {
    image,
    primaryHeader,
    secondaryHeader,
    description,
    date,
    startTime,
    endTime,
  } = postTypeEvent;

  const timeLabel = formatEventTime(startTime, endTime);

  return (
    <div
      className="flex min-h-[250px] flex-1 items-end justify-end overflow-hidden bg-stone-900 bg-cover bg-center bg-no-repeat shadow-lg sm:min-h-[280px]"
      style={{ backgroundImage: eventBackgroundImage(image?.sourceUrl) }}
    >
      <div className="event-card-panel w-3/4 max-w-sm">
        {primaryHeader && <h2 className="event-card-title">{primaryHeader}</h2>}
        {secondaryHeader && (
          <h3 className="event-card-description">{secondaryHeader}</h3>
        )}
        {date && <p className="event-card-meta mt-2">🗓️ {date}</p>}
        {timeLabel && <p className="event-card-meta mt-1">⏰ {timeLabel}</p>}
        {showDescription && description && (
          <p className="mt-2 text-xs text-white/80">{description}</p>
        )}
      </div>
    </div>
  );
}

const CalendarHero = ({ events }) => {
  // Render nothing (rather than crashing) when the CMS is unavailable or the
  // calendar is empty. Callers already provide their own empty-state copy.
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }

  // The first event is the most upcoming; the next two fill the side column.
  const [mainEvent, ...remainingEvents] = events;
  const secondaryEvents = remainingEvents.slice(0, 2).filter(Boolean);

  return (
    <div className="grid min-h-[600px] grid-cols-1 sm:min-h-[70dvh] lg:grid-cols-3">
      {mainEvent && <FeaturedEvent event={mainEvent} />}
      <div className="flex flex-col lg:col-span-1">
        {secondaryEvents.map((event, index) => (
          <SecondaryEventCard
            key={event?.node?.id ?? `secondary-event-${index}`}
            event={event}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarHero;

import { useState } from "react";
import { eventBackgroundImage, formatEventTime } from "../lib/eventDisplay";

function CalendarCard({ event }) {
  const [showDescription] = useState(false);

  const node = event?.node ?? {};
  const postTypeEvent = node.postTypeEvent ?? {};
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
      className="flex min-h-[340px] flex-1 items-end overflow-hidden rounded-xl bg-stone-900 bg-cover bg-center shadow-lg transition-shadow hover:shadow-xl sm:min-h-[380px]"
      style={{ backgroundImage: eventBackgroundImage(image?.sourceUrl) }}
    >
      <div className="event-card-panel w-full">
        <div>
          {primaryHeader && (
            <h2 className="event-card-title">{primaryHeader}</h2>
          )}
          {secondaryHeader && (
            <h3 className="event-card-description">{secondaryHeader}</h3>
          )}
          {date && <p className="event-card-meta mt-2">🗓️ {date}</p>}
          {timeLabel && <p className="event-card-meta mt-1">⏰ {timeLabel}</p>}
          {showDescription && description && (
            <p className="mt-2 pr-5 text-xs text-white/80">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

const Calendar = ({ events }) => {
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }

  return (
    <div className="site-container grid grid-cols-1 gap-4 py-6 sm:gap-5 sm:py-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {events.map((event, index) => (
        <CalendarCard key={event?.node?.id ?? `event-${index}`} event={event} />
      ))}
    </div>
  );
};

export default Calendar;

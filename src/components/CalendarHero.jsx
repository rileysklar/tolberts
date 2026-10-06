import { useState } from "react";

const CalendarHero = ({ events }) => {
  // Check if the events array is empty
  if (!events || events.length === 0) {
    return null; // Render nothing if the events array is empty
  }

  // The main event will be the first one (most upcoming)
  const mainEvent = events[0];
  // The next two events, if they exist
  const secondaryEvents = [events[1], events[2]].filter(Boolean); // filter(Boolean) removes undefined if events[1] or events[2] don't exist

  const [showDescription, setShowDescription] = useState(false); // This state seems to be for the mainEvent

  // Destructure mainEvent safely
  const {
    node: {
      postTypeEvent: {
        image: { sourceUrl: mainSourceUrl } = {},
        primaryHeader: mainPrimaryHeader,
        secondaryHeader: mainSecondaryHeader,
        description: mainDescription,
        date: mainDate,
        startTime: mainStartTime,
        endTime: mainEndTime,
      } = {},
    } = {},
  } = mainEvent || {}; // Provide default empty object if mainEvent is undefined

  return (
    <div className="grid min-h-[600px] grid-cols-1 sm:min-h-[70dvh] lg:grid-cols-3">
      {mainEvent && (
        <div
          className="flex min-h-[400px] items-end justify-end bg-cover bg-center lg:col-span-2 lg:min-h-0"
          style={{
            backgroundImage: `url(${mainSourceUrl})`,
          }}
        >
          <div className="event-card-panel w-3/4 max-w-lg">
            <h2 className="event-card-title event-card-title-featured">
              {mainPrimaryHeader}
            </h2>
            <h3 className="event-card-description">{mainSecondaryHeader}</h3>
            <p className="event-card-meta mt-2">🗓️ {mainDate}</p>
            <p className="event-card-meta mt-1">
              ⏰ {mainStartTime} - {mainEndTime}
            </p>
            {showDescription && (
              <p className="mt-2 text-sm text-white/80">{mainDescription}</p>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col lg:col-span-1">
        {secondaryEvents.map((event, _) => {
          if (!event) return null;
          const {
            node: {
              id,
              postTypeEvent: {
                image: { sourceUrl } = {},
                primaryHeader,
                secondaryHeader,
                description,
                date,
                startTime,
                endTime,
              } = {},
            } = {},
          } = event;
          const [showDescription, setShowDescription] = useState(false);

          return (
            <div
              key={id}
              className="flex min-h-[250px] flex-1 items-end justify-end overflow-hidden bg-cover bg-center bg-no-repeat shadow-lg sm:min-h-[280px]"
              style={{ backgroundImage: `url(${sourceUrl})` }}
            >
              <div className="event-card-panel w-3/4 max-w-sm">
                <h2 className="event-card-title">{primaryHeader}</h2>
                <h3 className="event-card-description">{secondaryHeader}</h3>
                <p className="event-card-meta mt-2">🗓️ {date}</p>
                <p className="event-card-meta mt-1">
                  ⏰ {startTime} - {endTime}
                </p>
                {showDescription && (
                  <p className="mt-2 text-xs text-white/80">{description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHero;

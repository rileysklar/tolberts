import { useState } from "react";

const Calendar = ({ events }) => {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="site-container grid grid-cols-1 gap-4 py-6 sm:gap-5 sm:py-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {events.map((event, index) => {
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
            className="flex min-h-[340px] flex-1 items-end overflow-hidden rounded-xl bg-cover bg-center shadow-lg transition-shadow hover:shadow-xl sm:min-h-[380px]"
            style={{ backgroundImage: `url(${sourceUrl})` }}
          >
            <div className="event-card-panel w-full">
              <div>
                <h2 className="event-card-title">{primaryHeader}</h2>
                <h3 className="event-card-description">{secondaryHeader}</h3>
                <p className="event-card-meta mt-2">🗓️ {date}</p>
                <p className="event-card-meta mt-1">
                  ⏰ {startTime} - {endTime}
                </p>
                {showDescription && (
                  <p className="mt-2 pr-5 text-xs text-white/80">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;

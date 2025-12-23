import { useState } from "react";

const Calendar = ({ events }) => {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-6 sm:gap-5 sm:px-6 sm:py-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
            <div className="flex w-full flex-row items-center justify-between rounded-t-xl border-l border-t border-white/20 bg-slate-800/60 p-4 backdrop-blur-md sm:p-5">
              <div>
                <h2 className="noto line-clamp-1 text-lg text-white sm:text-xl lg:text-2xl">
                  {primaryHeader}
                </h2>
                <h3 className="mt-1 line-clamp-2 text-xs text-white/90 sm:text-sm">
                  {secondaryHeader}
                </h3>
                <p className="mt-2 text-xs text-white sm:text-sm">🗓️ {date}</p>
                <p className="mt-0.5 text-xs text-white sm:text-sm">
                  ⏰ {startTime} - {endTime}
                </p>
                {showDescription && (
                  <p className="mt-2 pr-5 text-xs text-white/80">{description}</p>
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

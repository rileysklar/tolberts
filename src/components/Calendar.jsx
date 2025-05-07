import { useState } from "react";

const Calendar = ({ events }) => {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
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
            className="flex h-96 flex-1 items-end overflow-hidden rounded-lg bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url(${sourceUrl})` }}
          >
            <div className="flex w-full flex-row items-center justify-between rounded-t-lg border-l border-t bg-slate-800/50 p-4 backdrop-blur-md">
              <div>
                <h2 className="noto text-xl text-white sm:text-3xl">
                  {primaryHeader}
                </h2>
                <h3 className="sm:text-md mt-1 text-sm text-white">
                  {secondaryHeader}
                </h3>
                <p className="sm:text-md mt-1 text-sm text-white">🗓️ {date}</p>
                <p className="sm:text-md mt-1 text-sm text-white">
                  ⏰ {startTime} - {endTime}
                </p>
                {showDescription && (
                  <p className="mt-1 pr-5 text-sm text-white">{description}</p>
                )}
              </div>
              {/* <Button
                variant="secondary"
                className="mt-2"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? "Hide details" : "Show details"}
              </Button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;

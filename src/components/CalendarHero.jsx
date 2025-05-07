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
    <div className="grid h-[1200px] grid-cols-1 sm:h-[90dvh] lg:grid-cols-3">
      {mainEvent && (
        <div
          className="flex items-end justify-end bg-cover bg-center md:col-span-2"
          style={{
            backgroundImage: `url(${mainSourceUrl})`,
          }}
        >
          <div className="w-3/4 overflow-hidden rounded-tl-lg border-l border-t bg-slate-800/50 p-4 shadow-lg backdrop-blur-md">
            <h2 className="noto line-clamp-1 text-xl text-white sm:text-3xl">
              {mainPrimaryHeader}
            </h2>
            <h3 className="sm:text-md mt-1 text-sm text-white">
              {mainSecondaryHeader}
            </h3>
            <p className="sm:text-md mt-1 text-sm text-white">🗓️ {mainDate}</p>
            <p className="sm:text-md mt-1 text-sm text-white">
              ⏰ {mainStartTime} - {mainEndTime}
            </p>
            {showDescription && (
              <p className="mt-1 text-sm text-white"> {mainDescription}</p>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col lg:col-span-1">
        {secondaryEvents.map((event, _) => {
          if (!event) return null; // Should be filtered by .filter(Boolean) already, but good for safety
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
              className="flex min-h-[300px] flex-1 items-end justify-end overflow-hidden bg-cover bg-center bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url(${sourceUrl})` }}
            >
              <div className="w-3/4 rounded-tl-lg border-l border-t bg-slate-800/50 p-4 backdrop-blur-md">
                <h2 className="noto text-xl text-white sm:text-3xl">
                  {primaryHeader}
                </h2>
                <h3 className="sm:text-md mt-1 text-sm text-white">
                  {secondaryHeader}
                </h3>
                <p className="sm:text-md mt-1 text-sm text-white">🗓️ {date}</p>{" "}
                <p className="sm:text-md mt-1 text-sm text-white">
                  ⏰ {startTime} - {endTime}
                </p>
                {showDescription && (
                  <p className="mt-1 text-sm text-white">{description}</p>
                )}
                {/* <Button
                  variant="outline"
                  className="color-white mt-2 bg-transparent"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? "Hide Details" : "Show Details"}{" "}
                  <ChevronRight className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHero;

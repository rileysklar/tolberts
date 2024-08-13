import { useState } from "react";

const Hero = ({ events }) => {
  const [showDescription, setShowDescription] = useState(false);

  const {
    node: {
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
  } = events[events.length - 1];

  return (
    <div className="grid h-[1200px] grid-cols-1 sm:h-[90dvh] lg:grid-cols-3">
      <div
        className="flex items-end justify-end bg-cover bg-center md:col-span-2"
        style={{
          backgroundImage: `url(${sourceUrl})`,
        }}
      >
        <div
          className=" w-3/4 overflow-hidden rounded-tl-lg border-l border-t bg-slate-800/50 p-4 shadow-lg backdrop-blur-md

"
        >
          <h2 className="noto line-clamp-1 text-xl text-white sm:text-3xl">
            {primaryHeader}
          </h2>
          <h3 className="sm:text-md mt-1text-sm text-white">
            {secondaryHeader}
          </h3>
          <p className="sm:text-md mt-1text-sm text-white">🗓️ {date}</p>
          <p className="sm:text-md mt-1 text-sm text-white">
            ⏰ {startTime} - {endTime}
          </p>
          {showDescription && (
            <p className="mt-1 text-sm text-white"> {description}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:col-span-1">
        {[events[events.length - 2], events[events.length - 3]]
          .filter(Boolean)
          .map((event, _) => {
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
                className="flex min-h-[300px] flex-1 items-end justify-end overflow-hidden bg-cover bg-center bg-no-repeat shadow-lg

              "
                style={{ backgroundImage: `url(${sourceUrl})` }}
              >
                <div className=" w-3/4 rounded-tl-lg border-l border-t bg-slate-800/50 p-4 backdrop-blur-md">
                  <h2 className="noto text-xl text-white sm:text-3xl">
                    {primaryHeader}
                  </h2>
                  <h3 className="sm:text-md mt-1 text-sm text-white">
                    {secondaryHeader}
                  </h3>
                  <p className="sm:text-md mt-1 text-sm text-white">
                    🗓️ {date}
                  </p>{" "}
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

export default Hero;

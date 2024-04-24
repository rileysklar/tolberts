import { useState } from "react";
import React from "react";
import { Button } from "./button";

const Calendar = ({ events }) => {
  console.log(events);
  const [showDescription, setShowDescription] = useState(false); // add this line

  return (
    <div className="mt-[72px] grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {events &&
        events.map((event, index) => {
          const {
            node: {
              id,
              postTypeEvent: {
                image: { sourceUrl } = {},
                primaryHeader,
                secondaryHeader,
                description,
                date,
              } = {},
            } = {},
          } = event;
          const [showDescription, setShowDescription] = useState(false); // add this line

          return (
            <div
              key={id}
              className=" flex h-96 flex-1 items-end justify-end overflow-hidden rounded-lg bg-cover bg-center shadow-lg

              "
              style={{ backgroundImage: `url(${sourceUrl})` }}
            >
              <div className=" rounded-tl-lg border-l border-t bg-slate-800/30 p-4 backdrop-blur-md">
                <h2 className="noto text-xl text-white sm:text-3xl">
                  {primaryHeader}
                </h2>
                <h3 className="sm:text-md mt-1 text-sm text-white">
                  {secondaryHeader}
                </h3>
                <p className="sm:text-md mt-1 text-sm text-white">🗓️ {date}</p>
                {showDescription && (
                  <p className="mt-1 text-sm text-white">{description}</p>
                )}
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? "Hide details" : "Show details"}
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Calendar;

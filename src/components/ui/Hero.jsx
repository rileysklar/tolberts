import { useState } from "react";
import React from "react";
import styles from "../../styles/hero.module.css";
import { Button } from "./button";

const Hero = ({ events }) => {
  console.log(events);
  const [showDescription, setShowDescription] = useState(false); // add this line

  return (
    <div className="grid h-[90dvh] grid-cols-1 md:grid-cols-3">
      <div
        className="group mt-[80px] flex items-end justify-end bg-cover bg-center sm:mt-[20px] md:col-span-2"
        style={{
          backgroundImage: `url(${events[0].node.postTypeEvent.image.sourceUrl})`,
        }}
      >
        <div
          className=" overflow-hidden rounded-tl-lg border-l border-t border-t bg-slate-800/30 p-4 shadow-lg backdrop-blur-md 

"
        >
          <h2 className="noto text-xl text-white sm:text-3xl">
            {events[0].node.postTypeEvent.primaryHeader}
          </h2>
          <h3 className="sm:text-md mt-1text-sm text-white">
            {events[0].node.postTypeEvent.secondaryHeader}
          </h3>
          <p className="sm:text-md mt-1text-sm text-white">
            🗓️ {events[0].node.postTypeEvent.date}
          </p>
          {showDescription && (
            <p className="mt-1 text-sm text-white">
              {" "}
              {events[0].node.postTypeEvent.description}
            </p>
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
      <div className="flex flex-col md:col-span-1">
        {events.slice(1, 3).map((event, index) => {
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
              className=" flex flex-1 items-end justify-end overflow-hidden bg-cover bg-center shadow-lg

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
    </div>
  );
};

export default Hero;

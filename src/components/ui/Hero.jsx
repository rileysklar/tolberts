import { useState } from "react";
import React from "react";
import styles from "../../styles/hero.module.css";

const Hero = ({ events }) => {
  const [showDescription, setShowDescription] = useState(false); // add this line

  console.log(events);
  return (
    <div className="grid h-[100dvh] grid-cols-1 md:grid-cols-3">
      <div
        className="mt-[80px] flex items-end justify-end bg-cover bg-center sm:mt-[20px] md:col-span-2"
        style={{
          backgroundImage: `url(${events[0].node.postTypeEvent.image.sourceUrl})`,
        }}
      >
        <div
          className="overflow-hidden rounded-t-lg bg-slate-800/30 p-4 shadow-lg backdrop-blur-md

"
        >
          <h2 className="noto text-xl text-white sm:text-3xl">
            {events[0].node.postTypeEvent.primaryHeader}
          </h2>
          <h3 className="sm:text-md text-sm text-white">
            {events[0].node.postTypeEvent.secondaryHeader}
          </h3>
          <p className="sm:text-md text-sm text-white">
            {events[0].node.postTypeEvent.date}
          </p>
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
                showDescription,
                date,
              } = {},
            } = {},
          } = event;

          return (
            <div
              key={id}
              className="group flex flex-1 items-end justify-end overflow-hidden bg-cover bg-center shadow-lg

              "
              style={{ backgroundImage: `url(${sourceUrl})` }}
            >
              <div className="rounded-t-lg bg-slate-800/30 p-4 backdrop-blur-md">
                <h2 className="noto text-xl text-white sm:text-3xl">
                  {primaryHeader}
                </h2>
                <h3 className="sm:text-md text-sm text-white">
                  {secondaryHeader}
                </h3>
                <p className="sm:text-md text-sm text-white">{date}</p>
                <div className="hidden group-hover:block">
                  <p className="sm:text-md text-sm text-white">
                    {showDescription}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;

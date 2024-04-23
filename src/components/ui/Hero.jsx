import { useState } from "react";
import React from "react";
import styles from "../../styles/hero.module.css";

const Hero = ({ events }) => {
  const [showDescription, setShowDescription] = useState(false); // add this line

  console.log(events);
  return (
    <div className="grid h-[60dvh] grid-cols-1 md:grid-cols-3">
      <div
        className="flex items-end justify-end bg-cover bg-center md:col-span-2"
        style={{
          backgroundImage: `url(${events[0].node.postTypeEvent.image.sourceUrl})`,
        }}
      >
        <div
          className="overflow-hidden rounded-t-lg bg-slate-800/30 p-4 shadow-indigo-500/50 backdrop-blur-md

"
        >
          <h2 className="text-4xl text-white">
            {events[0].node.postTypeEvent.primaryHeader}
          </h2>
          <h3 className="text-2xl text-white">
            {events[0].node.postTypeEvent.secondaryHeader}
          </h3>
          <p className="text-xl text-white">
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
                date,
              } = {},
            } = {},
          } = event;

          return (
            <div
              key={id}
              className="flex flex-1 items-end justify-end overflow-hidden bg-cover bg-center shadow-indigo-500/50

              "
              style={{ backgroundImage: `url(${sourceUrl})` }}
            >
              <div className="rounded-t-lg bg-slate-800/30 p-4 backdrop-blur-md">
                <h2 className="text-3xl text-white">{primaryHeader}</h2>
                <h3 className="text-2xl text-white">{secondaryHeader}</h3>
                <p className="text-lg text-white">{date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;

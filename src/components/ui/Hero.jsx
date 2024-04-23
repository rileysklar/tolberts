import React from "react";
import styles from "../../styles/hero.module.css";

const Hero = ({ events }) => {
  console.log(events);
  return (
    <div className={styles.hero}>
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

        return (
          <div
            key={id}
            className={
              index === 0 ? `${styles.card} ${styles.large}` : styles.card
            }
          >
            <img className={styles.img} src={sourceUrl} alt={primaryHeader} />
            <h2 className={styles.heading}>{primaryHeader}</h2>
            <h3 className={styles.subheading}>{secondaryHeader}</h3>
            <p className={styles.text}>{description}</p>
            <p className={styles.text}>{date}</p>
            <p className={styles.text}>
              {startTime} - {endTime}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Hero;

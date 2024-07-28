const OPENING_HOURS = {
  Friday: "11:00-24:00",
  Saturday: "11:00-24:00",
  Sunday: "11:00-21:00",
  Monday: "11:00-21:00",
  Tuesday: "11:00-22:00",
  Wednesday: "11:00-23:00",
  Thursday: "11:00-23:00",
};

const convertToReadableTime = (hours) => {
  const [opening, closing] = hours.split("-");
  const convertTime = (time) => {
    const [hour, minute] = time.split(":");
    let intHour = parseInt(hour, 10);
    const ampm = intHour >= 12 ? "PM" : "AM";
    intHour = intHour % 12 || 12; // Convert to 12-hour format
    return `${intHour}:${minute} ${ampm}`;
  };

  const adjustedClosing = closing === "24:00" ? "00:00" : closing; // Adjust midnight to 00:00
  return `${convertTime(opening)} - ${convertTime(adjustedClosing)}`;
};

export default function RestaurantSchema() {
  return (
    <div>
      {Object.entries(OPENING_HOURS).map(([day, hours]) => (
        <p itemProp="openingHours" key={day} content={hours}>
          {`${day}: ${convertToReadableTime(hours)}`}
        </p>
      ))}
      <p>
        Closing times may vary so please call first to verify. Enjoy Happy Hour
        Monday thru Friday!
      </p>
    </div>
  );
}

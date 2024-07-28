const OPENING_HOURS = {
  Friday: "11:00-23:30",
  Saturday: "11:00-23:30",
  Sunday: "11:00-21:00",
  Monday: "11:00-21:00",
  Tuesday: "11:00-22:00",
  Wednesday: "11:00-23:00",
  Thursday: "11:00-23:00",
};

export default function RestaurantSchema() {
  return (
    <div>
      {Object.entries(OPENING_HOURS).map(([day, hours]) => (
        <p
          itemProp="openingHours"
          key={day}
          content={hours}
        >{`${day}: ${hours}`}</p>
      ))}
      <p>
        Closing times may vary so please call first to verify. Enjoy Happy Hour
        Monday thru Friday!
      </p>
    </div>
  );
}

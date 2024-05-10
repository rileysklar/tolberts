const RESTAURANT_NAME = "Your Restaurant Name";
const RESTAURANT_PHONE = "Your Restaurant Phone Number";
const STREET_ADDRESS = "Your Street Address";
const CITY = "Your City";
const STATE = "Your State";
const POSTAL_CODE = "Your Postal Code";
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
    <div itemScope itemType="http://schema.org/Restaurant">
      {/* <p itemProp="name">{RESTAURANT_NAME}</p>
      <p itemProp="telephone">{RESTAURANT_PHONE}</p>
      <div
        itemProp="address"
        itemscope
        itemType="http://schema.org/PostalAddress"
      >
        <p itemProp="streetAddress">{STREET_ADDRESS}</p>
        <p itemProp="addressLocality">{CITY}</p>
        <p itemProp="addressRegion">{STATE}</p>
        <p itemProp="postalCode">{POSTAL_CODE}</p>
      </div> */}
      {Object.entries(OPENING_HOURS).map(([day, hours]) => (
        <p itemProp="openingHours" content={hours}>{`${day}: ${hours}`}</p>
      ))}
      <p>
        Closing times may vary so please call first to verify. Enjoy Happy Hour
        Monday thru Friday!
      </p>
    </div>
  );
}

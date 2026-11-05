import { hostels } from "./hostels";

// Reviews exist only for stays that were completed (platform rule: reviews only after stay).
const POOL = [
  { author: "Aarav K.", rating: 5, text: "Clean rooms, steady Wi-Fi and the warden actually listens. Felt safe from the first week.", stay: "Stayed 8 months" },
  { author: "Sabina T.", rating: 5, text: "Food is simple but tastes like home. Hot water never ran out, even in January.", stay: "Stayed 1 year" },
  { author: "Prabin R.", rating: 4, text: "Good value for the area. Study room gets crowded during exams but is quiet otherwise.", stay: "Stayed 6 months" },
  { author: "Nisha M.", rating: 4, text: "Owner is responsive and fixed our plumbing problem the same day.", stay: "Stayed 10 months" },
  { author: "Sujan B.", rating: 3, text: "Rooms are fine, but the Wi-Fi slows down in the evening. Food could use more variety.", stay: "Stayed 5 months" },
  { author: "Rina S.", rating: 5, text: "Close to campus and very well lit at night. My parents were comfortable with the security.", stay: "Stayed 1 year" },
  { author: "Kiran P.", rating: 4, text: "Power backup saved me during load-shedding. Laundry service is reliable.", stay: "Stayed 7 months" },
  { author: "Manisha D.", rating: 5, text: "Everything matched the photos. Availability shown on the app was accurate when I booked.", stay: "Stayed 9 months" },
  { author: "Anish G.", rating: 3, text: "Location is great but the bathrooms need more frequent cleaning.", stay: "Stayed 4 months" },
  { author: "Pooja L.", rating: 4, text: "Friendly roommates and a helpful owner. Would recommend for first-year students.", stay: "Stayed 8 months" },
  { author: "Bibek N.", rating: 5, text: "Quiet at night, which is rare in this part of the city. Great for studying.", stay: "Stayed 1 year" },
  { author: "Sarita H.", rating: 4, text: "Clean dining hall and fair prices. Parking space is limited for bikes.", stay: "Stayed 6 months" },
];
const DATES = ["2026-09-14", "2026-08-02", "2026-06-21", "2026-05-09", "2026-03-30", "2026-02-11"];

/** { [hostelId]: Review[6] } */
export const reviewsByHostel = Object.fromEntries(
  hostels.map((h, hi) => [
    h.id,
    DATES.map((date, k) => ({
      id: `${h.id}-r${k + 1}`,
      hostelId: h.id,
      date,
      ...POOL[(hi * 3 + k * 2) % POOL.length],
      ownerReply: k === 0 ? "Thank you for staying with us — we wish you the best in your studies." : null,
    })),
  ])
);

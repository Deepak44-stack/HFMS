import { hostels } from "@/data/hostels";

export const DEMO_ACCOUNTS = {
  "student@demo.com": { name: "Demo Student", role: "customer", identifier: "student@demo.com" },
  "owner@demo.com": { name: "Demo Owner", role: "owner", identifier: "owner@demo.com" },
  "admin@demo.com": { name: "Demo Admin", role: "admin", identifier: "admin@demo.com" },
};

export const pendingDemoHostel = {
  id: "pending-demo",
  name: "Demo Valley Girls Residence",
  gender: "Girls",
  address: "Mahalaxmi, Lalitpur",
  area: "Mahalaxmi",
  lat: 27.6665,
  lng: 85.336,
  verified: false,
  rating: 0,
  reviewCount: 0,
  rooms: [
    { type: 1, label: "1 seater", pricePerMonth: 13500, totalBeds: 8, occupiedBeds: 2 },
    { type: 2, label: "2 seater", pricePerMonth: 9500, totalBeds: 20, occupiedBeds: 8 },
    { type: 3, label: "3 seater", pricePerMonth: 7800, totalBeds: 18, occupiedBeds: 6 },
    { type: 4, label: "4 seater", pricePerMonth: 6800, totalBeds: 16, occupiedBeds: 4 },
  ],
  amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV"],
  foodMenu: { breakfast: "Tea and eggs", lunch: "Dal bhat", snacks: "Tea and biscuits", dinner: "Rice, dal and vegetables" },
  owner: { name: "Demo Owner", phone: "+977 9800000000" },
  about: "Demo listing awaiting admin verification.",
  photos: hostels[1].photos,
};

export const demoComplaints = [
  { id: "c1", hostel: "Himalayan Nest Boys Hostel", category: "Incorrect availability", status: "Open", reporter: "Demo Student", description: "The listed 2-seater availability needs checking." },
  { id: "c2", hostel: "Sunrise Girls Residence", category: "Listing information", status: "Under Review", reporter: "Sita K.", description: "Please confirm the meal timetable." },
];

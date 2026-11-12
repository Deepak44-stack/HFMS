import { hostels } from "@/data/hostels";

const date = (offset) => `2026-11-${String(Math.max(1, 12 - offset)).padStart(2, "0")}`;

const seededHostels = hostels.slice(0, 12).map((hostel, index) => ({
  ...hostel,
  status: index < 9 ? "Approved" : index < 11 ? "Pending" : "Rejected",
  submittedAt: date(index + 1),
  ownerName: hostel.owner.name,
  documents: ["Business registration", "PAN / citizenship", "Ownership or lease proof"],
}));

seededHostels.push(
  { ...hostels[0], id: "h13", name: "Mahalaxmi Student House", area: "Pulchowk", status: "Pending", submittedAt: "2026-11-10", ownerName: "Asha Rai", documents: ["Business registration", "PAN / citizenship", "Lease proof"] },
  { ...hostels[1], id: "h14", name: "Valley View Women Hostel", area: "Bhaktapur", status: "Rejected", submittedAt: "2026-10-28", ownerName: "Mina Shrestha", documents: ["Business registration", "PAN / citizenship", "Lease proof"] },
  { ...hostels[2], id: "h15", name: "Ring Road Residence", area: "Kalanki", status: "Suspended", submittedAt: "2026-10-18", ownerName: "Kiran Lama", documents: ["Business registration", "PAN / citizenship", "Lease proof"] },
);

export const ADMIN_HOSTELS = seededHostels;

export const ADMIN_COMPLAINTS = [
  ["c1", "Incorrect availability", "Himalayan Nest Boys Hostel", "Received"],
  ["c2", "Listing information", "Sunrise Girls Residence", "Under Review"],
  ["c3", "Safety concern", "Kalanki Comfort Stay", "Forwarded"],
  ["c4", "Unresolved maintenance", "Pulchowk Pearl Girls Hostel", "Escalated"],
  ["c5", "Misleading photos", "Putalisadak Scholars' Lodge", "Resolved"],
  ["c6", "Owner conduct", "Bhaktapur Heritage Hostel", "Dismissed"],
  ["c7", "Price mismatch", "Baneshwor Blue Door Hostel", "Received"],
  ["c8", "Cleanliness", "Koteshwor Green Valley Hostel", "Under Review"],
].map(([id, category, hostel, status], index) => ({
  id,
  category,
  hostel,
  status,
  reporter: `Demo Reporter ${index + 1}`,
  description: "Please review this report and contact the relevant party.",
  timeline: [{ text: "Complaint received", date: date(index) }],
}));

export const ADMIN_USERS = Array.from({ length: 26 }, (_, index) => ({
  id: `u${index}`,
  name: index < 6 ? `Demo Owner ${index + 1}` : `Demo User ${index - 5}`,
  role: index < 6 ? "Owner" : "User",
  contact: `98${String(10000000 + index * 17321).slice(0, 8)}`,
  joined: date(index % 10),
  status: "Active",
}));

export const ADMIN_REVIEWS = Array.from({ length: 15 }, (_, index) => ({
  id: `r${index}`,
  author: `Reviewer ${index + 1}`,
  hostel: seededHostels[index % seededHostels.length].name,
  rating: 3 + (index % 3),
  reason: index % 2 ? "Owner report" : "User report",
  status: "Reported",
}));

export const ADMIN_INQUIRIES = Array.from({ length: 90 }, (_, index) => ({
  id: `demo-inquiry-${index + 1}`,
  date: new Date(Date.UTC(2026, 7, 15 + index)).toISOString().slice(0, 10),
  roomType: [1, 2, 3, 4][index % 4],
  area: ["Baneshwor", "Pulchowk", "Koteshwor", "Kalanki"][index % 4],
  converted: index % 3 === 0,
}));

export const ADMIN_SEARCHES = ADMIN_INQUIRIES.map((item, index) => ({
  ...item,
  query: item.area,
  id: `demo-search-${index + 1}`,
}));

export const ADMIN_AUDIT_SEED = [
  { who: "Demo Admin", what: "Signed in", record: "Admin portal", when: "2026-11-12 13:15" },
  { who: "Demo Admin", what: "Seeded demo data", record: "15 hostels · 26 accounts · 8 complaints", when: "2026-11-12 13:14" },
];

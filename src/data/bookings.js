// Mock owner bookings, for the Owner views built later.
export const ownerBookings = [
  {
    id: "b1", hostelId: "h1", student: "Sandesh Poudel", phone: "+977 9812-300111",
    roomType: 2, moveIn: "2026-12-01", message: "I'm joining Bachelor of Engineering next month. Is a bed in a 2 seater free from December 1?",
    status: "Pending", createdAt: "2026-11-03",
  },
  {
    id: "b2", hostelId: "h1", student: "Roshan Khadka", phone: "+977 9803-300222",
    roomType: 4, moveIn: "2026-11-20", message: "Can I visit this weekend before confirming?",
    status: "Accepted", createdAt: "2026-11-01",
  },
  {
    id: "b3", hostelId: "h1", student: "Dipesh Oli", phone: "+977 9841-300333",
    roomType: 1, moveIn: "2026-11-15", message: "Looking for a single room. Does the price include food?",
    status: "Clarification requested", createdAt: "2026-10-29",
  },
];

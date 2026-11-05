// Mock data only — no backend. Photos are Unsplash URLs (cards fall back gracefully if one fails to load).
const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;

const PHOTO_POOL = [
  "1555854877-bab0e564b8d5",
  "1522771739844-6a9f6d5f14af",
  "1631049307264-da0ec9d70304",
  "1505693416388-ac5ce068fe85",
  "1540518614846-7eded433c457",
  "1586023492125-27b2c045efd7",
  "1560448204-e02f11c3d0e2",
  "1493809842364-78817add7ffb",
  "1502672260266-1c1ef2d93688",
  "1484154218962-a197022b5858",
  "1522708323590-d24dbb6b0267",
  "1512918728675-ed5a9ecdebfd",
];
const photosFor = (i) => [0, 1, 2].map((k) => u(PHOTO_POOL[(i * 2 + k * 5) % PHOTO_POOL.length]));

const room = (seater, pricePerMonth, totalBeds, occupiedBeds) => ({
  type: seater,
  label: `${seater} seater`,
  pricePerMonth,
  totalBeds,
  occupiedBeds,
});

export const AMENITIES = [
  "Wi-Fi",
  "Hot water",
  "Drinking water",
  "Laundry",
  "Parking",
  "CCTV",
  "Study room",
  "Power backup",
  "Attached bathroom",
];

const menuStandard = {
  breakfast: "Tea, bread & egg / Chiura & aloo tarkari",
  lunch: "Dal bhat, seasonal tarkari, achar, saag",
  snacks: "Tea with biscuits or samosa",
  dinner: "Dal bhat, vegetable curry, pickle (chicken on Saturdays)",
};
const menuVeg = {
  breakfast: "Poha, tea & fruit",
  lunch: "Dal bhat, paneer or mushroom curry, saag",
  snacks: "Tea with roasted peanuts",
  dinner: "Roti, sabji, dal, rice",
};
const menuModern = {
  breakfast: "Sandwich, boiled eggs, milk tea",
  lunch: "Dal bhat or khichdi, curd, salad",
  snacks: "Momo (twice a week), tea",
  dinner: "Dal bhat or thukpa, seasonal vegetables",
};

export const hostels = [
  {
    id: "h1", name: "Himalayan Nest Boys Hostel", gender: "Boys",
    address: "Shantinagar, New Baneshwor, Kathmandu", area: "Baneshwor",
    lat: 27.6902, lng: 85.3391, verified: true, rating: 4.6, reviewCount: 128,
    rooms: [room(1, 11000, 10, 7), room(2, 8500, 24, 16), room(4, 6500, 32, 21)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV", "Study room", "Power backup"],
    foodMenu: menuStandard, owner: { name: "Ramesh Shrestha", phone: "+977 9841-234567" },
    about: "A calm, study-focused hostel ten minutes from Baneshwor's colleges, with a quiet reading hall open till 11pm.",
  },
  {
    id: "h2", name: "Sunrise Girls Residence", gender: "Girls",
    address: "Tinkune Road, Koteshwor, Kathmandu", area: "Koteshwor",
    lat: 27.6842, lng: 85.3475, verified: true, rating: 4.8, reviewCount: 203,
    rooms: [room(1, 12500, 8, 6), room(2, 9000, 20, 18), room(3, 7200, 24, 22)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV", "Study room", "Power backup", "Attached bathroom"],
    foodMenu: menuModern, owner: { name: "Sunita Gurung", phone: "+977 9851-345678" },
    about: "Warden on site 24/7, biometric entry and a rooftop garden. Popular with nursing and IT students.",
  },
  {
    id: "h3", name: "Kalanki Comfort Stay", gender: "Co-ed",
    address: "Kalanki Chowk, Kathmandu", area: "Kalanki",
    lat: 27.6937, lng: 85.2815, verified: true, rating: 4.1, reviewCount: 64,
    rooms: [room(2, 6500, 20, 9), room(3, 5200, 27, 12), room(4, 4500, 40, 19)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Parking", "CCTV"],
    foodMenu: menuStandard, owner: { name: "Bikash Tamang", phone: "+977 9803-456789" },
    about: "Budget-friendly with separate floors for boys and girls and easy bus access to the ring road.",
  },
  {
    id: "h4", name: "Putalisadak Scholars' Lodge", gender: "Boys",
    address: "Putalisadak, Kathmandu", area: "Putalisadak",
    lat: 27.7052, lng: 85.3228, verified: true, rating: 4.4, reviewCount: 97,
    rooms: [room(1, 13000, 6, 5), room(2, 9500, 18, 15), room(3, 7500, 21, 17)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV", "Study room", "Attached bathroom"],
    foodMenu: menuModern, owner: { name: "Prakash Adhikari", phone: "+977 9818-567890" },
    about: "Walking distance to Ratna Rajyalaxmi Campus and Putalisadak's coaching centres.",
  },
  {
    id: "h5", name: "Pulchowk Pearl Girls Hostel", gender: "Girls",
    address: "Pulchowk, Lalitpur", area: "Pulchowk",
    lat: 27.6788, lng: 85.3174, verified: true, rating: 4.9, reviewCount: 241,
    rooms: [room(1, 14000, 8, 8), room(2, 10500, 24, 21), room(3, 8200, 24, 19)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV", "Study room", "Power backup", "Attached bathroom"],
    foodMenu: menuVeg, owner: { name: "Anita Maharjan", phone: "+977 9841-678901" },
    about: "Five minutes from IOE Pulchowk Campus. Female warden, curfew at 9pm, and a shared kitchen on every floor.",
  },
  {
    id: "h6", name: "Bhaktapur Heritage Hostel", gender: "Co-ed",
    address: "Suryabinayak, Bhaktapur", area: "Bhaktapur",
    lat: 27.6641, lng: 85.4202, verified: true, rating: 4.2, reviewCount: 52,
    rooms: [room(2, 5500, 16, 5), room(3, 4800, 24, 8), room(4, 4000, 40, 14)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Parking", "Power backup"],
    foodMenu: menuStandard, owner: { name: "Suman Prajapati", phone: "+977 9803-789012" },
    about: "Spacious rooms near Kathmandu University's Bhaktapur side, with open terrace and parking.",
  },
  {
    id: "h7", name: "Baneshwor Blue Door Hostel", gender: "Boys",
    address: "Mid-Baneshwor, Kathmandu", area: "Baneshwor",
    lat: 27.6936, lng: 85.3447, verified: true, rating: 3.9, reviewCount: 41,
    rooms: [room(2, 7000, 14, 11), room(3, 5800, 18, 17), room(4, 4800, 28, 24)],
    amenities: ["Wi-Fi", "Drinking water", "CCTV", "Laundry"],
    foodMenu: menuStandard, owner: { name: "Dipak Karki", phone: "+977 9861-890123" },
    about: "Simple, clean and affordable. Meals served in a shared dining hall.",
  },
  {
    id: "h8", name: "Koteshwor Green Valley Hostel", gender: "Co-ed",
    address: "Jadibuti, Koteshwor, Kathmandu", area: "Koteshwor",
    lat: 27.6766, lng: 85.3589, verified: true, rating: 4.3, reviewCount: 76,
    rooms: [room(1, 10500, 6, 2), room(2, 8000, 20, 8), room(4, 5800, 32, 12)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Parking", "CCTV", "Study room", "Power backup"],
    foodMenu: menuModern, owner: { name: "Rajan Thapa", phone: "+977 9842-901234" },
    about: "Separate wings with their own entrances. Plenty of green space and a small gym corner.",
  },
  {
    id: "h9", name: "Lalitpur Lotus Girls Hostel", gender: "Girls",
    address: "Jawalakhel, Lalitpur", area: "Pulchowk",
    lat: 27.6726, lng: 85.3135, verified: true, rating: 4.5, reviewCount: 110,
    rooms: [room(1, 12000, 6, 3), room(2, 9200, 22, 14), room(3, 7000, 27, 18)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV", "Study room", "Attached bathroom"],
    foodMenu: menuVeg, owner: { name: "Kabita Shakya", phone: "+977 9851-012345" },
    about: "A friendly, family-run hostel near Jawalakhel chowk with home-style cooking.",
  },
  {
    id: "h10", name: "Kalanki Campus Corner", gender: "Boys",
    address: "Sitapaila Road, Kalanki, Kathmandu", area: "Kalanki",
    lat: 27.6972, lng: 85.2793, verified: true, rating: 4.0, reviewCount: 58,
    rooms: [room(2, 6200, 18, 18), room(3, 5000, 24, 24), room(4, 4300, 36, 36)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "CCTV", "Power backup"],
    foodMenu: menuStandard, owner: { name: "Nabin Lama", phone: "+977 9818-123456" },
    about: "Close to Sitapaila's engineering colleges. Currently full — join the waiting list by calling the owner.",
  },
  {
    id: "h11", name: "Putalisadak Metro Hostel", gender: "Co-ed",
    address: "Kamalpokhari, Kathmandu", area: "Putalisadak",
    lat: 27.7108, lng: 85.3262, verified: true, rating: 4.2, reviewCount: 89,
    rooms: [room(1, 12000, 8, 4), room(2, 8800, 20, 10), room(3, 6900, 24, 13)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV", "Study room", "Attached bathroom"],
    foodMenu: menuModern, owner: { name: "Sagar Basnet", phone: "+977 9803-234560" },
    about: "Right in the middle of the city, with separate floors and entrances for boys and girls.",
  },
  {
    id: "h12", name: "Pulchowk Pioneer Boys Hostel", gender: "Boys",
    address: "Kumaripati, Lalitpur", area: "Pulchowk",
    lat: 27.6735, lng: 85.3232, verified: true, rating: 4.7, reviewCount: 156,
    rooms: [room(1, 11500, 8, 5), room(2, 8800, 24, 17), room(4, 6800, 40, 28)],
    amenities: ["Wi-Fi", "Hot water", "Drinking water", "Laundry", "CCTV", "Study room", "Power backup", "Parking"],
    foodMenu: menuStandard, owner: { name: "Hari Bhandari", phone: "+977 9841-345601" },
    about: "A favourite with IOE and Patan Campus students. 24-hour power backup and a seminar room.",
  },
].map((h, i) => ({ ...h, photos: photosFor(i) }));

export const getHostel = (id) => hostels.find((h) => h.id === id);

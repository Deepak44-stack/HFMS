import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Prices are always shown as "NPR 6,500 / month". */
export function formatPrice(amount, { suffix = true } = {}) {
  const n = new Intl.NumberFormat("en-IN").format(amount);
  return suffix ? `NPR ${n} / month` : `NPR ${n}`;
}

/** Haversine distance in km between two lat/lng points. */
export function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

export function bedStats(hostel) {
  const total = hostel.rooms.reduce((s, r) => s + r.totalBeds, 0);
  const occupied = hostel.rooms.reduce((s, r) => s + r.occupiedBeds, 0);
  return { total, occupied, available: Math.max(total - occupied, 0) };
}

export function startingPrice(hostel) {
  return Math.min(...hostel.rooms.map((r) => r.pricePerMonth));
}

/** green: plenty, amber: few left, red: full */
export function availabilityLevel(available, total) {
  if (available === 0) return "full";
  if (available <= Math.max(3, Math.ceil(total * 0.15))) return "low";
  return "ok";
}

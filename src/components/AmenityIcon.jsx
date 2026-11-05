import { Wifi, Flame, Droplets, Shirt, ParkingCircle, Cctv, BookOpen, Zap, Bath } from "lucide-react";

export const AMENITY_ICONS = {
  "Wi-Fi": Wifi,
  "Hot water": Flame,
  "Drinking water": Droplets,
  Laundry: Shirt,
  Parking: ParkingCircle,
  CCTV: Cctv,
  "Study room": BookOpen,
  "Power backup": Zap,
  "Attached bathroom": Bath,
};

export function AmenityIcon({ name, className }) {
  const Icon = AMENITY_ICONS[name];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
}

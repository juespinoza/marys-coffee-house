export type Product = {
  id: string;
  name: string;
  price: number;
  short: string;
  long: string;
  images: string[]; // 1..5
};

export type ReviewItem = {
  author: string;
  rating: number; // 1..5
  date?: string;
  text: string;
};

export type ReviewsData = {
  title?: string;
  sourceLabel?: string;
  rating?: number; // 0..5
  count?: number;
  items?: ReviewItem[];
  mapEmbedUrl?: string;
  mapReviewsLink?: string;
};

export type Feature = {
  icon?: string; // "coffee" | "croissant" | "heart" (lo usamos como string simple)
  title: string;
  text: string;
};

export type MenuItem = {
  name: string;
  desc: string;
  price: number; // en Gs
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export type NavItem = { label: string; href: string };

// Mock data store for admin panel (will be replaced by real API calls later)

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  uploadedAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

let enquiries: Enquiry[] = [
  { id: "1", name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 00001", subject: "Admission Query", message: "I'd like to know about the admission process for my 3-year-old.", date: "2026-03-24", status: "new" },
  { id: "2", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 98765 00002", subject: "Fee Structure", message: "Could you share the fee details for the Nursery program?", date: "2026-03-23", status: "read" },
  { id: "3", name: "Ananya Patel", email: "ananya@example.com", phone: "+91 98765 00003", subject: "Campus Visit", message: "We'd love to schedule a campus visit this weekend.", date: "2026-03-22", status: "replied" },
  { id: "4", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 98765 00004", subject: "Transport Facility", message: "Do you provide school bus service in Sector 21?", date: "2026-03-21", status: "new" },
  { id: "5", name: "Meera Gupta", email: "meera@example.com", phone: "+91 98765 00005", subject: "Playgroup Info", message: "What is the daily schedule for the Playgroup program?", date: "2026-03-20", status: "new" },
];

let galleryImages: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop", alt: "Colorful preschool classroom", category: "Classrooms", uploadedAt: "2026-03-20" },
  { id: "2", src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop", alt: "Children doing activities", category: "Activities", uploadedAt: "2026-03-19" },
  { id: "3", src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=400&fit=crop", alt: "Children playing outdoors", category: "Outdoor", uploadedAt: "2026-03-18" },
  { id: "4", src: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop", alt: "Children painting", category: "Art & Craft", uploadedAt: "2026-03-17" },
  { id: "5", src: "https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3?w=600&h=400&fit=crop", alt: "School annual day", category: "Events", uploadedAt: "2026-03-16" },
];

let activities: Activity[] = [
  { id: "1", title: "Why Play-Based Learning Matters for Early Development", description: "Research shows that play is the most powerful tool for cognitive, social, and emotional development in young children.", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=360&fit=crop", category: "Education", date: "2026-03-15" },
  { id: "2", title: "5 Fun Indoor Activities to Boost Creativity", description: "Looking for ways to keep little ones engaged? Try these simple, creative activities using everyday materials.", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=360&fit=crop", category: "Activities", date: "2026-03-08" },
  { id: "3", title: "Preparing Your Child for Their First Day at Preschool", description: "Practical tips to make the transition smooth, stress-free, and even exciting for both parents and children.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=360&fit=crop", category: "Parenting", date: "2026-02-28" },
];

let nextId = 100;
const genId = () => String(++nextId);

// Enquiry API
export const getEnquiries = () => [...enquiries];
export const addEnquiry = (e: Omit<Enquiry, "id" | "date" | "status">) => {
  const item: Enquiry = { ...e, id: genId(), date: new Date().toISOString().slice(0, 10), status: "new" };
  enquiries = [item, ...enquiries];
  return item;
};
export const updateEnquiryStatus = (id: string, status: Enquiry["status"]) => {
  enquiries = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
};
export const deleteEnquiry = (id: string) => {
  enquiries = enquiries.filter((e) => e.id !== id);
};

// Gallery API
export const getGalleryImages = () => [...galleryImages];
export const addGalleryImage = (img: Omit<GalleryImage, "id" | "uploadedAt">) => {
  const item: GalleryImage = { ...img, id: genId(), uploadedAt: new Date().toISOString().slice(0, 10) };
  galleryImages = [item, ...galleryImages];
  return item;
};
export const deleteGalleryImage = (id: string) => {
  galleryImages = galleryImages.filter((i) => i.id !== id);
};

// Activities API
export const getActivities = () => [...activities];
export const addActivity = (a: Omit<Activity, "id" | "date">) => {
  const item: Activity = { ...a, id: genId(), date: new Date().toISOString().slice(0, 10) };
  activities = [item, ...activities];
  return item;
};
export const updateActivity = (id: string, data: Partial<Omit<Activity, "id">>) => {
  activities = activities.map((a) => (a.id === id ? { ...a, ...data } : a));
};
export const deleteActivity = (id: string) => {
  activities = activities.filter((a) => a.id !== id);
};

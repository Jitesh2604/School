import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";

const categories = ["All", "Classrooms", "Outdoor", "Events", "Art & Craft", "Activities"];

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop", category: "Classrooms", alt: "Colorful preschool classroom" },
  { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop", category: "Activities", alt: "Children doing activities" },
  { src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=400&fit=crop", category: "Outdoor", alt: "Children playing outdoors" },
  { src: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop", category: "Art & Craft", alt: "Children painting" },
  { src: "https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3?w=600&h=400&fit=crop", category: "Events", alt: "School annual day" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop", category: "Classrooms", alt: "Learning environment" },
  { src: "https://images.unsplash.com/photo-1571210862729-78a33e9911a7?w=600&h=400&fit=crop", category: "Outdoor", alt: "Playground fun" },
  { src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop", category: "Art & Craft", alt: "Creative workshop" },
  { src: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&h=400&fit=crop", category: "Events", alt: "Festival celebration" },
  { src: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?w=600&h=400&fit=crop", category: "Activities", alt: "Story time" },
  { src: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600&h=400&fit=crop", category: "Classrooms", alt: "Interactive learning" },
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop", category: "Activities", alt: "Music class" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <section className="section-padding pt-28 sm:pt-32">
      <div className="container-wide mx-auto">
        <SectionHeading badge="Gallery" title="Moments That Make Us Smile" description="A glimpse into the vibrant, joyful world at LittleStars." />

        {/* Filter Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                  filter === cat ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <ScrollReveal key={item.src + filter} delay={i * 50}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end p-4">
                  <span className="text-sm font-semibold text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {item.alt}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

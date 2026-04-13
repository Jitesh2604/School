import { useState, useEffect } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";
import PageHero from "@/components/shared/PageHero.tsx";
import GalleryBanner from "@/assets/play_school/img3.jpg";

const categories = [
  "All",
  "Classrooms",
  "Outdoor",
  "Events",
  "Art & Craft",
  "Activities",
];

const API = "http://localhost:5000/api/gallery";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from API
  const fetchGallery = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setGalleryItems(data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ✅ Filter logic (same as before)
  const filtered =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <>
      <PageHero
        title="Gallery"
        backgroundImage={GalleryBanner}
        breadcrumb=""
      />

      <section className="section-padding pt-28 sm:pt-32">
        <div className="container-wide mx-auto">
          <SectionHeading
            badge="Gallery"
            title="Moments That Make Us Smile"
            description="A glimpse into the vibrant, joyful world at Eduveda Early Years."
          />

          {/* Filter Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                    filter === cat
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* 🔄 Loading */}
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading gallery...
            </p>
          ) : (
            /* Grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <ScrollReveal key={item._id} delay={i * 50}>
                  <div className="group relative overflow-hidden rounded-2xl aspect-4/3 cursor-pointer">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-foreground/80 p-4">
                      <p className="text-sm font-semibold text-background line-clamp-2">
                        {item.alt}
                      </p>
                      <p className="text-xs text-background/80 mt-1">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* ❌ No Images */}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">
              No images found.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  backgroundImage: string;
  breadcrumb: string;
}

export default function PageHero({
  title,
  backgroundImage,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full screen image */}
      <img
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center text-center text-white px-4">
        <div className="mt-auto mb-[10vh] flex flex-col items-center">
          {/* Breadcrumb */}
          <nav className="mb-2">
            <Link to="/" className="text-white/80 hover:text-white">
              {breadcrumb}
            </Link>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        </div>
      </div>
    </section>
  );
}

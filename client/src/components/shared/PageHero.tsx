import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  backgroundImage: string;
  breadcrumb: string;
}

export default function PageHero({ title, backgroundImage, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full screen image */}
      <img
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center text-white">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link to="/" className="text-white/80 hover:text-white">
            {breadcrumb}
          </Link>
        </nav>
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
      </div>
    </section>
  );
}
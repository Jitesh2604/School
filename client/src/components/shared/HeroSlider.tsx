import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg1 from "../../assets/play_school/img5.jpg";
import heroImg2 from "../../assets/play_school/img1.jpg";

const slides = [
  {
    image: heroImg1,
    title: "India’s Best Pre School & Daycare",
    subtitle: "Play, Learn And Grow With Best Care.",
    buttonText: "Enroll Now",
    buttonLink: "/admissions",
  },
  {
    image: heroImg2,
    title: "Start Your Own Preschool Franchise",
    subtitle: "With Partner-First Revenue Model",
    buttonText: "Be a Partner",
    buttonLink: "/franchise",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Slides */}
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.image}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[10000ms] ease-linear
            ${i === current ? "opacity-100 scale-110" : "opacity-0 scale-100"}
          `}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">

        <h1
          key={current}
          className="text-4xl md:text-6xl font-bold mb-4 animate-fadeUp"
        >
          {slides[current].title}
        </h1>

        <p
          key={current + "sub"}
          className="text-lg md:text-2xl text-white/80 animate-fadeUp delay-200"
        >
          {slides[current].subtitle}
        </p>

        <Link
          to={slides[current].buttonLink}
          className="mt-6 px-6 py-3 bg-violet-600 rounded-full font-semibold hover:bg-violet-700 animate-fadeUp delay-300"
        >
          {slides[current].buttonText}
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === i ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
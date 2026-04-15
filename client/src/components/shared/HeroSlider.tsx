import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg1 from "../../assets/play_school/img5.jpg";
import heroImg2 from "../../assets/play_school/img1.jpg";

const slides = [
  {
    image: heroImg1, // 👈 replace with your image
    title: "India’s Best Pre School & Daycare",
    subtitle: "Play, Learn And Grow With Best Care.",
    buttonText: "Be a Partner",
    buttonLink: "/franchise",
  },
  {
    image: heroImg2, // 👈 replace with your image
    title: "Start Your Own Preschool Franchise",
    subtitle: "With Partner-First Revenue Model",
    buttonText: "Enroll Now",
    buttonLink: "/admissions",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Auto slide every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimate(true);
      }, 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Trigger animation on mount + slide change
  useEffect(() => {
    setAnimate(true);
  }, [current]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Background Image */}
      <img
        src={slides[current].image}
        alt="hero"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
          animate ? "scale-110" : "scale-100"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        
        {/* Title */}
        <h1
          className={`text-4xl md:text-6xl font-bold leading-tight mb-4 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {slides[current].title}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-2xl text-white/80 transition-all duration-700 delay-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {slides[current].subtitle}
        </p>

        {/* Optional Button */}
        <Link
          to={slides[current].buttonLink}
          className={`mt-6 px-6 py-3 bg-violet-600 rounded-full font-semibold hover:bg-violet-700 transition-all duration-500 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {slides[current].buttonText}
        </Link>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrent(i);
              setAnimate(false);
              setTimeout(() => setAnimate(true), 100);
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === i ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
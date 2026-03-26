import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const ScrollReveal = ({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }  // lowered from 0.15 so elements near viewport edge still trigger
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animClass = {
    up: "animate-fade-up",
    left: "animate-slide-in-left",
    right: "animate-slide-in-right",
    none: "animate-fade-in",
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        !visible && "opacity-0",   // only apply opacity-0 when NOT yet visible
        visible && animClass,       // apply animation class when visible (animation sets opacity to 1)
        className
      )}
      style={visible ? { animationDelay: `${delay}ms`, animationFillMode: "forwards" } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

const SectionHeading = ({ badge, title, description, className, align = "center" }: SectionHeadingProps) => (
  <ScrollReveal className={cn("mb-12 sm:mb-16", align === "center" && "text-center", className)}>
    {badge && (
      <span className="pastel-badge bg-pastel-pink text-primary mb-3 inline-block">{badge}</span>
    )}
    <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance leading-[1.1] tracking-tight">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl text-pretty leading-relaxed mx-auto">
        {description}
      </p>
    )}
  </ScrollReveal>
);

export default SectionHeading;

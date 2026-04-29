import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero.tsx";
import ProgramsBanner from "@/assets/play_school/img4.jpg";
import { programs } from "@/data/programs";

const Programs = () => (
  <>
    <PageHero
      title="Our Programs"
      backgroundImage={ProgramsBanner}
      breadcrumb=""
    />
    <section className="section-padding pt-28 sm:pt-32">
      <div className="container-wide mx-auto">
        <SectionHeading
          badge="Our Programs"
          title="Thoughtfully Designed for Every Stage"
          description="From Play School to Creche and After-School Enrichment — each program is crafted by early childhood experts to match developmental milestones and nurture your child's natural curiosity."
        />
        <div className="space-y-12">
          {programs.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 60}>
              <Link to={`/programs/${p.id}`} className="block group">
              <div
                id={p.id}
                className={`pastel-card border-2 ${p.borderColor} scroll-mt-24`}
              >
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 ${p.color} rounded-xl flex items-center justify-center`}
                      >
                        <span className="font-display font-bold text-foreground/60">
                          {i + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-2xl text-foreground">
                          {p.title}
                        </h3>
                        <p className="text-sm font-semibold text-primary">
                          {p.age}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {p.desc}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2.5">
                      {p.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="text-center mt-12">
            <Button asChild size="xl">
              <Link to="/admissions">Start Enrollment</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </> 
);

export default Programs;

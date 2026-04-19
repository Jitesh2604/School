import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero.tsx";
import ProgramsBanner from "@/assets/play_school/img4.jpg";

const programs = [
  {
    id: "playgroup",
    title: "Playgroup",
    age: "1.5 – 2 years",
    color: "bg-pastel-pink",
    borderColor: "border-primary/20",
    desc: "A gentle and loving transition from home to school. Playgroup focuses on building trust, developing motor skills, and encouraging social interaction through sensory play.",
    benefits: [
      "Sensory exploration activities",
      "Basic motor skill development",
      "Social interaction and sharing",
      "Music & movement sessions",
      "Parent-teacher bonding",
    ],
  },
  {
    id: "Pre Nursery",
    title: "Pre Nursery",
    age: "2 - 3 years",
    color: "bg-pastel-pink",
    borderColor: "border-primary/20",
    desc: "A structured yet playful learning environment where children begin developing early communication, independence, and cognitive skills through guided activities, storytelling, and interactive play.",
    benefits: [
      "Early language and communication development",
      "Introduction to numbers, colors, and shapes",
      "Improved fine and gross motor skills",
      "Encourages independence and confidence",
      "Interactive storytelling and creative play",
    ],
  },
  {
    id: "nursery",
    title: "Nursery",
    age: "3 – 4 years",
    color: "bg-pastel-blue",
    borderColor: "border-secondary/20",
    desc: "Building foundational skills through a balance of structured and free play. Children develop language, creativity, and early literacy in a vibrant setting.",
    benefits: [
      "Language and vocabulary building",
      "Creative arts and storytelling",
      "Introduction to numbers & shapes",
      "Outdoor play and fitness",
      "Emotional regulation skills",
    ],
  },
  {
    id: "junior-kg",
    title: "Junior Kindergarten",
    age: "4 – 5 years",
    color: "bg-pastel-green",
    borderColor: "border-green-300/40",
    desc: "Structured learning begins here. Junior KG develops literacy, numeracy, critical thinking, and collaborative skills through project-based activities.",
    benefits: [
      "Phonics and early reading",
      "Mathematical reasoning",
      "Science exploration projects",
      "Team activities and leadership",
      "Cultural awareness programs",
    ],
  },
  {
    id: "senior-kg",
    title: "Senior Kindergarten",
    age: "5 – 6 years",
    color: "bg-pastel-yellow",
    borderColor: "border-accent/30",
    desc: "Preparing confident, school-ready learners. Senior KG consolidates all foundational skills and builds independence, responsibility, and a love for lifelong learning.",
    benefits: [
      "Fluent reading and writing",
      "Advanced math concepts",
      "Public speaking and presentations",
      "Environmental awareness",
      "School readiness assessment",
    ],
  },
  {
    id: "creche-daycare",
    title: "Creche & Daycare",
    age: "All Ages",
    color: "bg-pastel-blue",
    borderColor: "border-secondary/20",
    desc: "A Home Beyond Home. Our creche provides a safe, hygienic, and loving environment for children of working parents. With a focus on routine, nutrition, and rest, we ensure every child's day is as productive as it is peaceful.",
    benefits: [
      "Safe, hygienic environment",
      "Nutritious meals & healthy snacks",
      "Structured rest & nap times",
      "Supervised indoor & outdoor play",
      "Daily progress updates for parents",
    ],
  },
  {
    id: "after-school",
    title: "After-School Enrichment",
    age: "5+ years",
    color: "bg-pastel-orange",
    borderColor: "border-orange-300/40",
    desc: "For older children, we offer a range of creative workshops including art, storytelling, and movement to keep their minds engaged and inspired after regular school hours.",
    benefits: [
      "Art & creative workshops",
      "Storytelling & drama sessions",
      "Movement & physical activities",
      "Homework support environment",
      "Supervised safe space",
    ],
  },
];

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

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Trees, Star, Users, Heart } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";
import heroImg from "@/assets/hero-children.jpg";
import { useState, useEffect } from "react";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background blobs */}
    <div className="absolute -top-32 -right-32 w-96 h-96 bg-pastel-pink rounded-full opacity-40 animate-blob blur-3xl" />
    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pastel-blue rounded-full opacity-40 animate-blob blur-3xl" style={{ animationDelay: "2s" }} />
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pastel-yellow rounded-full opacity-30 animate-blob blur-3xl" style={{ animationDelay: "4s" }} />

    <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <ScrollReveal>
            <span className="pastel-badge bg-pastel-yellow text-accent-foreground mb-4 inline-block">
              ✨ Admissions Open 2026-27
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-tight text-balance">
              Where Little Minds Grow Into{" "}
              <span className="gradient-text">Big Dreams</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-6 text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-lg text-pretty">
              A warm, nurturing space where your child discovers the joy of learning through play, creativity, and caring guidance.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild size="xl">
                <Link to="/admissions">Enroll Now</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/contact">Book a Visit</Link>
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> 4.9 Rating</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-secondary" /> 500+ Students</span>
              <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /> 15+ Years</span>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={200} direction="right">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] rotate-3 scale-105" />
            <img
              src={heroImg}
              alt="Children playing and learning in a colorful preschool classroom"
              className="relative rounded-[2rem] shadow-playful w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-medium p-4 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-pastel-green flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground/70" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">100% Safe</p>
                <p className="text-xs text-muted-foreground">CCTV Monitored</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const features = [
  { icon: Shield, title: "Safe & Secure", desc: "24/7 CCTV surveillance, trained staff, and child-proofed facilities.", color: "bg-pastel-blue" },
  { icon: BookOpen, title: "Play-Based Learning", desc: "Curriculum designed around experiential learning and creative exploration.", color: "bg-pastel-pink" },
  { icon: Trees, title: "Green Campus", desc: "Spacious outdoor play areas, gardens, and nature exploration zones.", color: "bg-pastel-green" },
  { icon: Star, title: "Expert Educators", desc: "Certified teachers with years of early childhood education experience.", color: "bg-pastel-yellow" },
];

const FeaturesSection = () => (
  <section className="section-padding bg-muted/50">
    <div className="container-wide mx-auto">
      <SectionHeading badge="Why Choose Us ?" title="Built Around Your Child's Happiness" description="We combine safety, creativity, and expert care to give your child the best start in life." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 80}>
            <div className="pastel-card text-center group">
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <f.icon className="w-7 h-7 text-foreground/70" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const programs = [
  { title: "Playgroup", age: "1.5 – 2.5 years", desc: "Gentle introduction to structured play, sensory activities, and social skills.", color: "bg-pastel-pink", borderColor: "border-primary/20" },
  { title: "Nursery", age: "2.5 – 3.5 years", desc: "Building foundational skills through storytelling, art, music, and movement.", color: "bg-pastel-blue", borderColor: "border-secondary/20" },
  { title: "Junior KG", age: "3.5 – 4.5 years", desc: "Developing literacy, numeracy, and critical thinking through guided activities.", color: "bg-pastel-green", borderColor: "border-green-300/40" },
  { title: "Senior KG", age: "4.5 – 5.5 years", desc: "School readiness with reading, writing, basic math, and confident communication.", color: "bg-pastel-yellow", borderColor: "border-accent/30" },
];

const ProgramsSection = () => (
  <section className="section-padding">
    <div className="container-wide mx-auto">
      <SectionHeading badge="Our Programs" title="Age-Appropriate Learning Journeys" description="Every program is thoughtfully crafted to match your child's developmental stage." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 80}>
            <div className={`pastel-card border-2 ${p.borderColor} group`}>
              <div className={`w-12 h-12 ${p.color} rounded-xl flex items-center justify-center mb-4`}>
                <span className="font-display font-bold text-lg text-foreground/60">{i + 1}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">{p.title}</h3>
              <p className="text-xs font-semibold text-primary mb-3">{p.age}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <Link to="/programs" className="inline-block mt-4 text-sm font-bold text-primary hover:underline">
                Learn More →
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const testimonials = [
  { name: "Priya Sharma", role: "Parent of Aarav, Nursery", text: "The warmth and care at LittleStars is incredible. My son looks forward to school every single day. The teachers truly understand each child." },
  { name: "Rahul Mehta", role: "Parent of Anaya, Jr. KG", text: "We've seen a remarkable transformation in our daughter's confidence and social skills. The play-based curriculum really works wonders." },
  { name: "Sunita Patel", role: "Parent of Vivaan, Playgroup", text: "As first-time parents, we were anxious. LittleStars made the transition so smooth. The daily updates and communication are fantastic." },
  { name: "Deepak Gupta", role: "Parent of Meera, Sr. KG", text: "Meera has blossomed here. Her reading skills, creativity, and emotional intelligence have grown beyond our expectations." },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-pastel-blue/30">
      <div className="container-narrow mx-auto">
        <SectionHeading badge="Testimonials" title="What Parents Say About Us" />
        <div className="relative max-w-2xl mx-auto">
          <div className="pastel-card text-center min-h-[220px] flex flex-col justify-center">
            <p className="text-foreground text-lg sm:text-xl leading-relaxed italic mb-6">"{testimonials[current].text}"</p>
            <div>
              <p className="font-display font-bold text-foreground">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-primary/30"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => (
  <section className="section-padding">
    <div className="container-wide mx-auto">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 sm:p-16 text-center">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-foreground/10 rounded-full blur-3xl" />
          <h2 className="relative font-display font-bold text-3xl sm:text-4xl text-primary-foreground text-balance leading-tight mb-4">
            Ready to Give Your Child the Best Start?
          </h2>
          <p className="relative text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
            Join hundreds of happy families. Schedule a campus visit or start the enrollment process today.
          </p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" variant="secondary">
              <Link to="/admissions">Start Enrollment</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/contact">Schedule Visit</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Index = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <ProgramsSection />
    <TestimonialsSection />
    <CTABanner />
  </>
);

export default Index;

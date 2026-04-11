import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { Eye, Target, Building2, Lightbulb, GraduationCap, Palette } from "lucide-react";
import PageHero from "@/components/shared/PageHero.tsx";
import AboutBanner from "@/assets/play_school/img8.jpg";

const stats = [
  { label: "Years of Excellence", value: "15+" },
  { label: "Happy Students", value: "2,400+" },
  { label: "Certified Teachers", value: "45+" },
  { label: "Campus Area (sq ft)", value: "12,000" },
];

const infrastructure = [
  { icon: Building2, title: "Smart Classrooms", desc: "Air-conditioned rooms with interactive learning tools and child-sized furniture." },
  { icon: Palette, title: "Art & Craft Studio", desc: "Dedicated creative space with all materials for painting, sculpting, and crafts." },
  { icon: Lightbulb, title: "STEM Discovery Lab", desc: "Age-appropriate science experiments and logical thinking activities." },
  { icon: GraduationCap, title: "Library Corner", desc: "Curated collection of picture books, early readers, and storytelling space." },
];

const About = () => (
  <>
    <PageHero
      title="About Us"
      backgroundImage={AboutBanner}
      breadcrumb=""
    />
    {/* Hero */}
    <section className="section-padding pt-28 sm:pt-32">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <span className="pastel-badge bg-pastel-green text-foreground/70 mb-3">About Us</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight text-balance">
              Nurturing Curiosity Since 2010
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed text-pretty">
              LittleStars Preschool was founded with a simple belief: every child deserves a joyful, safe, and stimulating environment to discover their unique potential. Our play-based approach blends global best practices with local cultural values.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              Over the years we've grown from a single classroom to a vibrant campus loved by over 2,400 families. But our core has never changed — small class sizes, heartfelt care, and a curriculum that respects each child's pace.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={s.label} className="pastel-card text-center" style={{ animationDelay: `${i * 100}ms` }}>
                  <p className="font-display font-bold text-3xl text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding bg-muted/50">
      <div className="container-narrow mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="pastel-card border-2 border-primary/10">
              <div className="w-12 h-12 bg-pastel-pink rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted early learning institution — where children develop into confident, compassionate, and creative individuals ready to embrace the world.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="pastel-card border-2 border-secondary/10">
              <div className="w-12 h-12 bg-pastel-blue rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide a holistic, child-centered learning experience that nurtures cognitive, social, emotional, and physical development through play, exploration, and meaningful relationships.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Infrastructure */}
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <SectionHeading badge="Our Campus" title="World-Class Infrastructure" description="Purpose-built facilities designed to inspire curiosity at every turn." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infrastructure.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 80}>
              <div className="pastel-card group text-center">
                <div className="w-14 h-14 bg-pastel-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="w-7 h-7 text-foreground/70" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;

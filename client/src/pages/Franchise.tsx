import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  IndianRupee,
  MapPin,
  BookOpen,
  Users,
  Lightbulb,
  Megaphone,
  ClipboardList,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Building2,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";

/* ── Hero ── */
const HeroSection = () => (
  <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-background">
    {/* blobs */}
    <div className="absolute -top-24 -left-24 w-80 h-80 bg-pastel-yellow rounded-full opacity-50 blur-3xl animate-blob" />
    <div
      className="absolute top-10 right-0 w-96 h-96 bg-pastel-pink rounded-full opacity-40 blur-3xl animate-blob"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-0 left-1/3 w-72 h-72 bg-pastel-blue rounded-full opacity-35 blur-3xl animate-blob"
      style={{ animationDelay: "4s" }}
    />

    {/* decorative shapes */}
    <div className="absolute top-20 right-24 w-16 h-16 rounded-2xl bg-pastel-yellow opacity-60 rotate-12 hidden lg:block" />
    <div className="absolute bottom-32 right-16 w-10 h-10 rounded-full bg-pastel-pink opacity-70 hidden lg:block" />
    <div className="absolute top-1/2 left-8 w-12 h-12 rounded-xl bg-pastel-green opacity-50 -rotate-6 hidden lg:block" />

    <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
      <div className="max-w-3xl">
        <ScrollReveal>
          <span className="pastel-badge bg-pastel-yellow text-accent-foreground mb-5 inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Franchise Opportunity
          </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight text-balance">
            Partner with <span className="gradient-text">Eduveda Early Years</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="mt-6 text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl text-pretty">
            Are you passionate about early childhood development? Join the Eduveda Early Years family and bring a world-class, play-based learning environment to your community across Delhi, Noida, Gurgaon, and the wider NCR region.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-wrap gap-4 mt-10">
            <Button asChild size="xl">
              <a href="#enquiry-form">Apply for Franchise</a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent fill-accent" /> Trusted local
              brand
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" /> Child-first approach
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" /> End-to-end
              support
            </span>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ── Why Partner ── */
const benefits = [
  {
    icon: Heart,
    color: "bg-pastel-pink",
    title: "Proven Business Model",
    desc: "A resilient and profitable blend of Preschool and Daycare services with a track record families in Delhi NCR trust.",
  },
  {
    icon: IndianRupee,
    color: "bg-pastel-green",
    title: "Affordable Investment",
    desc: "Low entry cost with a clear, transparent fee structure. No hidden charges or surprise expenses.",
  },
  {
    icon: Users,
    color: "bg-pastel-blue",
    title: "Personal Guidance",
    desc: "You're never alone. Our team is available to support you through setup, staff recruitment, safety protocols, and daily management.",
  },
  {
    icon: BookOpen,
    color: "bg-pastel-yellow",
    title: "Proprietary Curriculum",
    desc: "Access to our child-centric, play-based learning frameworks designed by early childhood educators.",
  },
  {
    icon: Lightbulb,
    color: "bg-pastel-purple",
    title: "Marketing Edge",
    desc: "Benefit from the established Eduveda brand presence in the Delhi NCR market with full marketing support.",
  },
  {
    icon: GraduationCap,
    color: "bg-pastel-orange",
    title: "Operational Training",
    desc: "Comprehensive guidance on staff training, safety protocols, and daily operations from day one.",
  },
];

const WhyPartnerSection = () => (
  <section className="section-padding bg-muted/50">
    <div className="container-wide mx-auto">
      <SectionHeading
        badge="Why Partner With Us"
        title="A Partnership Built on Trust"
        description="We're a hands-on team that genuinely cares about helping partners succeed in the Delhi NCR education sector."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <ScrollReveal key={b.title} delay={i * 70}>
            <div className="pastel-card group h-full">
              <div
                className={`w-12 h-12 ${b.color} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <b.icon className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {b.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ── What We Provide ── */
const provisions = [
  {
    icon: BookOpen,
    title: "Curriculum & Materials",
    desc: "Age-appropriate lesson plans, activity sheets, and learning resources ready to use.",
  },
  {
    icon: GraduationCap,
    title: "Teacher Training",
    desc: "Hands-on training for staff on classroom management and child development.",
  },
  {
    icon: Building2,
    title: "Setup & Classroom Guidance",
    desc: "Advice on furniture, décor, safety, and creating a welcoming learning space.",
  },
  {
    icon: Megaphone,
    title: "Basic Marketing Support",
    desc: "Templates for local flyers, social media posts, and admission banners.",
  },
  {
    icon: ClipboardList,
    title: "Admission Guidance",
    desc: "Step-by-step process for enrolling students and managing admission paperwork.",
  },
  {
    icon: Users,
    title: "Ongoing Support",
    desc: "Regular check-ins and a direct line to our team whenever you need help.",
  },
];

const WhatWeProvideSection = () => (
  <section className="section-padding">
    <div className="container-wide mx-auto">
      <SectionHeading
        badge="What We Provide"
        title="Everything You Need to Get Started"
        description="We've packaged all the essentials so you don't have to figure things out from scratch."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {provisions.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 70}>
            <div className="flex gap-4 p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/30 hover:shadow-soft transition-all duration-300 group h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-foreground mb-1">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ── Investment & Requirements ── */
const InvestmentSection = () => (
  <section className="section-padding bg-muted/50">
    <div className="container-narrow mx-auto">
      <SectionHeading
        badge="Investment & Requirements"
        title="Simple, Transparent Requirements"
        description="We keep things clear and affordable for aspiring educators."
      />
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          {
            icon: IndianRupee,
            color: "bg-pastel-green",
            label: "Estimated Investment",
            value: "₹3 – 8 Lakhs",
            note: "Varies by location & setup size",
          },
          {
            icon: Building2,
            color: "bg-pastel-blue",
            label: "Space Required",
            value: "1,500 – 2,500 sq ft",
            note: "Ground floor preferred",
          },
          {
            icon: MapPin,
            color: "bg-pastel-pink",
            label: "Ideal Location",
            value: "Delhi NCR",
            note: "Delhi, Noida, Gurgaon & surrounding areas",
          },
        ].map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 100}>
            <div className="pastel-card text-center group">
              <div
                className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon className="w-7 h-7 text-foreground/70" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                {item.label}
              </p>
              <p className="font-display font-bold text-2xl text-foreground mb-1">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ── How It Works ── */
const steps = [
  {
    number: "01",
    title: "Submit Enquiry",
    desc: "Fill in the form below and tell us a bit about yourself and your city.",
    color: "bg-pastel-yellow",
  },
  {
    number: "02",
    title: "Discussion & Planning",
    desc: "We'll schedule a call to understand your goals and share the full details.",
    color: "bg-pastel-blue",
  },
  {
    number: "03",
    title: "Setup Support",
    desc: "Our team helps you with classroom setup, staff hiring, and material sourcing.",
    color: "bg-pastel-pink",
  },
  {
    number: "04",
    title: "Launch Your School",
    desc: "Open your doors with our support on day one — and beyond.",
    color: "bg-pastel-green",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="section-padding">
    <div className="container-wide mx-auto">
      <SectionHeading
        badge="How It Works"
        title="From Enquiry to Opening Day"
        description="A straightforward 4-step journey to starting your own play school."
      />
      <div className="relative">
        {/* connector line desktop */}
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((s, i) => (
            <ScrollReveal key={s.number} delay={i * 100}>
              <div className="flex flex-col items-center text-center group">
                <div
                  className={`w-24 h-24 ${s.color} rounded-3xl flex flex-col items-center justify-center mb-5 shadow-soft transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-medium`}
                >
                  <span className="font-display font-bold text-2xl text-foreground/60">
                    {s.number}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground/40 mt-4 lg:hidden" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── Enquiry Form ── */
type FormData = {
  name: string;
  phone: string;
  city: string;
  email: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormData, string>>;

const EnquiryFormSection = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    city: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!/^\d{10}$/.test(form.phone.trim()))
      e.phone = "Enter a valid 10-digit phone number.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("https://eduveda-backend.onrender.com/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: { message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      // ✅ Success
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        city: "",
        email: "",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message); // you can replace with toast later
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-2xl border-2 ${errors[field] ? "border-destructive" : "border-border"} bg-background text-foreground placeholder:text-muted-foreground/50 text-sm font-body focus:outline-none focus:border-primary transition-colors duration-200`;

  return (
    <section id="enquiry-form" className="section-padding bg-muted/50">
      <div className="container-narrow mx-auto">
        <SectionHeading
          badge="Get In Touch"
          title="Request a Call Back"
          description="Fill in your details and we'll reach out within 1–2 business days."
        />

        {/* NDA Notice */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto mb-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
            <h4 className="font-display font-bold text-base text-foreground mb-2 flex items-center gap-2">
              🔒 Confidentiality & Non-Disclosure (NDA)
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              At Eduveda Early Years, we value our intellectual property and the integrity of our business model. By submitting a franchise enquiry, you agree to the following:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span> All shared materials — including financial projections, training manuals, and marketing strategies — will be kept strictly confidential.</li>
              <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span> Information will be used solely to evaluate a potential franchise relationship with Eduveda Early Years.</li>
              <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span> No proprietary data will be disclosed or shared with third parties without prior written consent.</li>
            </ul>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <ScrollReveal>
              <div className="pastel-card text-center py-16">
                <div className="w-20 h-20 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-foreground/60" />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                  Thank You!
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                  We've received your enquiry. Our team will call you within 1–2
                  business days to discuss the next steps.
                </p>
                <Button
                  className="mt-8"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      phone: "",
                      city: "",
                      email: "",
                      message: "",
                    });
                  }}
                >
                  Submit Another Enquiry
                </Button>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="pastel-card">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass("name")}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1.5 ml-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={inputClass("phone")}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1.5 ml-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        City *
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Your city"
                        className={inputClass("city")}
                      />
                      {errors.city && (
                        <p className="text-xs text-destructive mt-1.5 ml-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1.5 ml-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Message{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us a bit about yourself or any questions you have..."
                      className={`${inputClass("message")} resize-none`}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="xl"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Request a Call Back
                      </span>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Your information will never be
                    shared.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── CTA Banner ── */
const CTASection = () => (
  <section className="section-padding">
    <div className="container-wide mx-auto">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 sm:p-16 text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute top-6 right-12 w-10 h-10 bg-primary-foreground/10 rounded-xl rotate-12 hidden sm:block" />
          <div className="absolute bottom-8 left-10 w-8 h-8 bg-primary-foreground/10 rounded-full hidden sm:block" />
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-bold tracking-widest uppercase mb-6">
              Your Journey Starts Here
            </span>
          </ScrollReveal>
          <h2 className="relative font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground text-balance leading-tight mb-4">
            Start Your Journey in Early Childhood Education
          </h2>
          <p className="relative text-primary-foreground/80 text-lg mb-10 max-w-lg mx-auto">
            Join us in shaping the futures of young children — one classroom at
            a time.
          </p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" variant="secondary">
              <a href="#enquiry-form">Apply Now</a>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ── Page ── */
const Franchise = () => (
  <>
    <HeroSection />
    <WhyPartnerSection />
    <WhatWeProvideSection />
    <InvestmentSection />
    <HowItWorksSection />
    <EnquiryFormSection />
    <CTASection />
  </>
);

export default Franchise;
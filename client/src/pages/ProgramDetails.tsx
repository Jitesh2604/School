import { useParams, Link } from "react-router-dom";
import { Check, ArrowLeft, Sparkles, Clock, Star } from "lucide-react";
import { programs } from "@/data/programs";
import PageHero from "@/components/shared/PageHero.tsx";
import ProgramsBanner from "@/assets/play_school/img4.jpg";

// ─── ScrollReveal (lightweight CSS-animation wrapper) ─────────────────────────
// Replace with your existing ScrollReveal component if you have one.

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = "",
}) => (
  <div
    className={`animate-fadeUp ${className}`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
  >
    {children}
  </div>
);

// ─── "Why Choose" section data ────────────────────────────────────────────────

const whyChoosePoints = [
  {
    icon: <Star className="w-5 h-5" />,
    heading: "Expert Educators",
    body: "Every class is led by trained early-childhood specialists who understand how young minds grow.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    heading: "Play-Based Learning",
    body: "Research-backed curriculum that weaves academics into meaningful, joyful experiences.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    heading: "Flexible Schedules",
    body: "Morning, afternoon, and full-day slots designed to fit every family's routine.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const ProgramDetails: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  console.log("URL param:", programId);
  console.log("Available IDs:", programs.map(p => p.id));
  const program = programs.find((p) => p.id === programId);

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!program) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-3xl">
          🔍
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Program Not Found</h2>
        <p className="text-gray-500 max-w-sm">
          We couldn't find a programme matching <strong>"{programId}"</strong>.
          Please check the link or browse all our programmes.
        </p>
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Programmes
        </Link>
      </div>
    );
  }

  // ── Derive accent colors from Tailwind classes ──────────────────────────────
  // border-pink-200 → accent key = "pink"
  const accentKey = program.borderColor.replace("border-", "").replace(/-\d+$/, "");

  const accentMap: Record<string, { text: string; bg: string; ring: string; badge: string }> = {
    pink:   { text: "text-pink-700",   bg: "bg-pink-100",   ring: "ring-pink-300",   badge: "bg-pink-100 text-pink-700" },
    yellow: { text: "text-yellow-700", bg: "bg-yellow-100", ring: "ring-yellow-300", badge: "bg-yellow-100 text-yellow-700" },
    green:  { text: "text-green-700",  bg: "bg-green-100",  ring: "ring-green-300",  badge: "bg-green-100 text-green-700" },
    blue:   { text: "text-blue-700",   bg: "bg-blue-100",   ring: "ring-blue-300",   badge: "bg-blue-100 text-blue-700" },
    purple: { text: "text-purple-700", bg: "bg-purple-100", ring: "ring-purple-300", badge: "bg-purple-100 text-purple-700" },
  };

  const accent = accentMap[accentKey] ?? accentMap["blue"];

  return (
    <>
     <PageHero
      title={program.title}
      backgroundImage={ProgramsBanner}
      breadcrumb=""
    />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* ── Back link ──────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All Programmes
        </Link>
      </ScrollReveal>

      {/* ── Hero / Top section ─────────────────────────────────────────────── */}
      <ScrollReveal delay={80}>
        <div
          className={`pastel-card rounded-3xl border-2 ${program.borderColor} ${program.color} p-8 md:p-12`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <span
                className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${accent.badge}`}
              >
                Programme Details
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                {program.title}
              </h1>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${program.borderColor} bg-white/60 backdrop-blur-sm`}
            >
              <Clock className={`w-4 h-4 ${accent.text}`} />
              <span className={`text-sm font-semibold ${accent.text}`}>
                {program.age}
              </span>
            </div>
          </div>

          <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-2xl">
            {program.desc}
          </p>
        </div>
      </ScrollReveal>

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* LEFT — expanded content (col-span-3) */}
        <ScrollReveal delay={160} className="md:col-span-3 space-y-6">

          {/* Programme overview card */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-7 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              About the Programme
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {program.desc}
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Our structured yet flexible approach ensures every child progresses
              at their own pace while meeting important developmental milestones.
              All activities are designed with age-appropriateness and joy at
              the forefront.
            </p>
          </div>

          {/* Why choose section */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-7 space-y-5">
            <h2 className="text-xl font-bold text-gray-800">
              Why Choose This Programme?
            </h2>
            <div className="space-y-4">
              {whyChoosePoints.map((point, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl ${accent.bg} ${accent.text} flex items-center justify-center ring-2 ${accent.ring}`}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{point.heading}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {point.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* RIGHT — key benefits (col-span-2) */}
        <ScrollReveal delay={240} className="md:col-span-2">
          <div
            className={`rounded-2xl border-2 ${program.borderColor} ${program.color} p-7 h-full space-y-5`}
          >
            <h2 className={`text-xl font-bold ${accent.text}`}>
              Key Benefits
            </h2>
            <ul className="space-y-3">
              {program.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 mt-0.5 w-5 h-5 rounded-full ${accent.bg} ${accent.text} flex items-center justify-center`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="text-gray-700 text-sm leading-snug">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Age badge */}
            <div className="pt-4 border-t border-white/60">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                Suitable Age
              </p>
              <p className={`text-base font-bold ${accent.text}`}>
                {program.age}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <ScrollReveal delay={320}>
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-10 text-center text-white space-y-5 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to begin the journey?
          </h3>
          <p className="text-indigo-200 max-w-md mx-auto text-sm leading-relaxed">
            Secure your child's place in our {program.title} programme today.
            Seats are limited — don't miss out.
          </p>
          <Link
            to="/admissions"
            className="inline-block px-8 py-3.5 rounded-full bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-colors shadow-md hover:shadow-lg"
          >
            Enroll Now
          </Link>
        </div>
      </ScrollReveal>

    </div>
    </>
  );
};

export default ProgramDetails;
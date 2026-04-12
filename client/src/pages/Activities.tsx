import PageHero from "../components/shared/PageHero.tsx";
import img from ".././assets/play_school/img1.jpg";

const activities = [
  {
    icon: "🎨",
    title: "Art & Craft",
    desc: "Children explore colours, shapes, and textures through painting, clay, and collage — building creativity one masterpiece at a time.",
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
  },
  {
    icon: "🎵",
    title: "Music & Dance",
    desc: "Rhythm, movement, and melody help little ones express themselves and develop coordination in a joyful, energetic setting.",
    bg: "bg-violet-50",
    border: "border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    icon: "📖",
    title: "Storytelling",
    desc: "Imaginative tales and picture books spark curiosity, build vocabulary, and nurture a lifelong love of reading.",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
  },
  {
    icon: "🌿",
    title: "Outdoor Play",
    desc: "Fresh air, open space, and guided outdoor games strengthen gross motor skills and a connection with nature.",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "🧩",
    title: "Learning Games",
    desc: "Puzzles, sorting activities, and number games make early maths and logic concepts fun and accessible.",
    bg: "bg-sky-50",
    border: "border-sky-200",
    iconBg: "bg-sky-100",
  },
  {
    icon: "🪔",
    title: "Festival Celebrations",
    desc: "Diwali, Holi, Christmas, and more — children learn about culture and community through joyful celebrations.",
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    icon: "🎤",
    title: "Rhymes & Singing",
    desc: "Nursery rhymes and group singing build phonetic awareness, memory, and confidence in a warm, fun environment.",
    bg: "bg-pink-50",
    border: "border-pink-200",
    iconBg: "bg-pink-100",
  },
  {
    icon: "🌈",
    title: "Creative Play",
    desc: "Role play, dress-up, and imaginative scenarios develop social skills, empathy, and problem-solving abilities.",
    bg: "bg-teal-50",
    border: "border-teal-200",
    iconBg: "bg-teal-100",
  },
];

const schedule = [
  {
    time: "8:00 – 8:30 AM",
    label: "Welcome Time",
    icon: "👋",
    desc: "Greetings, attendance & morning circle",
  },
  {
    time: "8:30 – 9:00 AM",
    label: "Circle Time",
    icon: "🔵",
    desc: "Group discussion, show & tell, calendar activity",
  },
  {
    time: "9:00 – 10:30 AM",
    label: "Activity Time",
    icon: "✏️",
    desc: "Art, craft, music, or learning games",
  },
  {
    time: "10:30 – 11:00 AM",
    label: "Lunch Break",
    icon: "🍱",
    desc: "Healthy lunch & good eating habits",
  },
  {
    time: "11:00 – 11:30 AM",
    label: "Nap Time",
    icon: "😴",
    desc: "Rest & quiet relaxation",
  },
  {
    time: "11:30 AM – 12:30 PM",
    label: "Play Time",
    icon: "⚽",
    desc: "Outdoor games & free play",
  },
];

const benefits = [
  {
    icon: "🎭",
    title: "Creativity",
    desc: "Open-ended activities nurture imagination and innovative thinking from an early age.",
  },
  {
    icon: "🤝",
    title: "Social Skills",
    desc: "Group play teaches children to share, cooperate, and form meaningful friendships.",
  },
  {
    icon: "💬",
    title: "Communication",
    desc: "Stories, songs, and discussions build vocabulary and confidence in self-expression.",
  },
  {
    icon: "🏃",
    title: "Physical Development",
    desc: "Active play builds strength, coordination, and healthy habits that last a lifetime.",
  },
];

const galleryImages = [
  { emoji: "🎨", label: "Art Session", color: "bg-rose-100" },
  { emoji: "🌿", label: "Garden Play", color: "bg-emerald-100" },
  { emoji: "🎵", label: "Music Class", color: "bg-violet-100" },
  { emoji: "📚", label: "Story Corner", color: "bg-amber-100" },
  { emoji: "🧩", label: "Puzzle Time", color: "bg-sky-100" },
  { emoji: "🎉", label: "Festival Fun", color: "bg-orange-100" },
];

export default function Activities() {
  return (
    <>
      {/* ✅ Page Hero Banner */}
      <PageHero
        title="Activities"
        backgroundImage={img}
        breadcrumb=""
      />
      <div className="min-h-screen bg-[#FFFBF5] font-sans">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#FFF3E0] via-[#FFF8F0] to-[#FCE4EC] py-20 px-4 text-center">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-yellow-200 opacity-40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-pink-200 opacity-40 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-[#FF7043] px-5 py-1.5 text-sm font-semibold tracking-wide text-white shadow-sm">
              ✨ Every Day is an Adventure
            </span>
            <h1
              className="mt-4 text-5xl font-extrabold leading-tight text-[#2D2D2D]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Our Activities
            </h1>
            <p className="mt-4 text-lg text-[#5D4037]">
              At Eduveda Early Years, play is the highest form of research — fun-filled learning experiences where curiosity meets joy.
            </p>
          </div>
        </section>

        {/* ── Activities Grid ── */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 text-center">
            <h2
              className="text-3xl font-bold text-[#2D2D2D]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              What We Do Every Day 🌟
            </h2>
            <p className="mt-2 text-[#6D6D6D]">
              Eight engaging activities crafted to bring out the best in every
              child.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((act) => (
              <div
                key={act.title}
                className={`group rounded-2xl border-2 ${act.border} ${act.bg} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${act.iconBg} text-3xl shadow-sm`}
                >
                  {act.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#2D2D2D]">
                  {act.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6D6D6D]">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Daily Routine ── */}
        <section className="bg-linear-to-br from-[#E8F5E9] to-[#F1F8E9] py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2
                className="text-3xl font-bold text-[#2D2D2D]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                A Day in Our Playschool 🕐
              </h2>
              <p className="mt-2 text-[#4A6741]">
                A balanced, nurturing routine that children love and parents
                trust.
              </p>
            </div>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-green-200 sm:block" />
              <div className="space-y-4">
                {schedule.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="relative z-10 flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-md">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700">
                          {item.time}
                        </span>
                        <h3 className="font-bold text-[#2D2D2D]">
                          {item.label}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-[#6D6D6D]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Learning Through Play ── */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 text-center">
            <h2
              className="text-3xl font-bold text-[#2D2D2D]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Learning Through Play 🧠
            </h2>
            <p className="mt-2 text-[#6D6D6D]">
              Every game, song, and story is purposefully designed to build
              foundational skills.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-gray-100 transition hover:shadow-lg"
              >
                <div className="mb-3 text-4xl">{b.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-[#2D2D2D]">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6D6D6D]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Gallery Preview ── */}
        <section className="bg-[#FFF8F0] py-16 px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2
                className="text-3xl font-bold text-[#2D2D2D]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Glimpses of Joy 📸
              </h2>
              <p className="mt-2 text-[#6D6D6D]">
                Moments that tell the story of happy, thriving children.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {galleryImages.map((img) => (
                <div
                  key={img.label}
                  className={`flex aspect-square flex-col items-center justify-center rounded-2xl ${img.color} cursor-pointer transition hover:scale-105 hover:shadow-md`}
                >
                  <span className="text-5xl">{img.emoji}</span>
                  <span className="mt-3 text-sm font-semibold text-[#4A4A4A]">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="rounded-full border-2 border-[#FF7043] px-8 py-3 font-semibold text-[#FF7043] transition hover:bg-[#FF7043] hover:text-white">
                View Full Gallery →
              </button>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-linear-to-r from-[#FF7043] to-[#FF8A65] py-16 px-4 text-center text-white">
          <h2
            className="text-3xl font-extrabold"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Give your child a joyful learning experience at Eduveda Early Years 🌈
          </h2>
          <p className="mt-3 text-lg text-orange-100">
            Join our happy family of curious, creative, and confident little learners.
          </p>
          <a
            href="/admissions"
            className="mt-8 inline-block rounded-full bg-white px-10 py-3.5 font-bold text-[#FF7043] shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            Enroll Now →
          </a>
        </section>
      </div>
    </>
  );
}
import { useState } from "react";

const steps = [
  { step: "01", icon: "📋", title: "Fill Enquiry Form", desc: "Complete our simple online form with your child's basic details and preferred batch." },
  { step: "02", icon: "🏫", title: "School Visit", desc: "Schedule a visit to tour our campus, meet the teachers, and see our facilities firsthand." },
  { step: "03", icon: "👧", title: "Child Interaction", desc: "A friendly, informal session where our educators get to know your child." },
  { step: "04", icon: "✅", title: "Confirmation", desc: "Receive your admission confirmation letter and complete the joining formalities." },
];

const documents = [
  "Child's Birth Certificate",
  "Recent Passport-size Photographs (4)",
  "Parent/Guardian ID Proof",
  "Address Proof",
  "Medical / Immunisation Records",
];

const facilities = [
  { icon: "🛡️", title: "Safe Environment", desc: "CCTV-monitored campus, child-proof furniture, and secure entry & exit protocols." },
  { icon: "👩‍🏫", title: "Trained Teachers", desc: "Certified early childhood educators with years of experience and genuine love for kids." },
  { icon: "🎓", title: "Activity-Based Learning", desc: "Curriculum designed around play, exploration, and hands-on discovery." },
  { icon: "🌳", title: "Dedicated Play Area", desc: "Safe outdoor space with age-appropriate equipment for physical development." },
];

const initialForm = {
  childName: "",
  parentName: "",
  phone: "",
  email: "",
  age: "",
  message: "",
};

export default function Admission() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.childName.trim()) e.childName = "Child's name is required";
    if (!form.parentName.trim()) e.parentName = "Parent's name is required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit phone number";
    if (!/\S+@\S+\.\S+/.test(form.email.trim())) e.email = "Enter a valid email address";
    if (!form.age) e.age = "Please select child's age";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] font-sans">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#F9FBE7] to-[#E0F2F1] py-20 px-4 text-center">
        <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full bg-green-200 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-teal-200 opacity-40 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-[#43A047] px-5 py-1.5 text-sm font-semibold tracking-wide text-white shadow-sm">
            🎒 Admissions Open 2025–26
          </span>
          <h1
            className="mt-4 text-5xl font-extrabold leading-tight text-[#2D2D2D]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Admissions Open
          </h1>
          <p className="mt-4 text-lg text-[#2E7D32]">
            Enrol your child for a bright future — seats are limited, secure yours today.
          </p>
        </div>
      </section>

      {/* ── Admission Process ── */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#2D2D2D]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Simple 4-Step Process 🗂️
          </h2>
          <p className="mt-2 text-[#6D6D6D]">Getting your child started is quick, easy, and hassle-free.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.step} className="group relative rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#43A047] px-3 py-0.5 text-xs font-bold text-white">
                Step {s.step}
              </span>
              <div className="mt-4 mb-3 text-4xl">{s.icon}</div>
              <h3 className="mb-2 font-bold text-[#2D2D2D]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[#6D6D6D]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Eligibility ── */}
      <section className="bg-gradient-to-br from-[#FFF3E0] to-[#FFF8F0] py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#2D2D2D]" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Eligibility & Documents 📄
            </h2>
            <p className="mt-2 text-[#6D6D6D]">We welcome children aged 2–6 years for all programmes.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#2D2D2D]">
                <span className="text-2xl">🎂</span> Age Group
              </h3>
              <div className="space-y-3">
                {[
                  ["Nursery", "2 – 3 years"],
                  ["Lower KG", "3 – 4 years"],
                  ["Upper KG", "4 – 5 years"],
                  ["Prep", "5 – 6 years"],
                ].map(([cls, age]) => (
                  <div key={cls} className="flex items-center justify-between rounded-xl bg-orange-50 px-4 py-2.5">
                    <span className="font-semibold text-[#2D2D2D]">{cls}</span>
                    <span className="rounded-full bg-orange-100 px-3 py-0.5 text-sm font-medium text-orange-700">{age}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#2D2D2D]">
                <span className="text-2xl">📁</span> Required Documents
              </h3>
              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-[#4A4A4A]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xs">✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#2D2D2D]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            What We Offer 🌟
          </h2>
          <p className="mt-2 text-[#6D6D6D]">A nurturing space built for learning, growth, and happiness.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-gray-100 transition hover:shadow-lg">
              <div className="mb-3 text-4xl">{f.icon}</div>
              <h3 className="mb-2 font-bold text-[#2D2D2D]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#6D6D6D]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Admission Form ── */}
      <section className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9] py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#2D2D2D]" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Apply for Admission 📝
            </h2>
            <p className="mt-2 text-[#4A6741]">Fill in the details below and we'll get in touch with you shortly.</p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
              <div className="mb-4 text-6xl">🎉</div>
              <h3 className="text-2xl font-bold text-[#2D2D2D]">Request Submitted!</h3>
              <p className="mt-2 text-[#6D6D6D]">
                Thank you! Our team will contact you within 24 hours to schedule a school visit.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm(initialForm); }}
                className="mt-6 rounded-full bg-[#43A047] px-8 py-3 font-semibold text-white transition hover:bg-[#388E3C]"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Child Name */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#2D2D2D]">Child's Full Name *</label>
                  <input
                    name="childName"
                    value={form.childName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-[#43A047] ${errors.childName ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.childName && <p className="mt-1 text-xs text-red-500">{errors.childName}</p>}
                </div>

                {/* Parent Name */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#2D2D2D]">Parent / Guardian Name *</label>
                  <input
                    name="parentName"
                    value={form.parentName}
                    onChange={handleChange}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-[#43A047] ${errors.parentName ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.parentName && <p className="mt-1 text-xs text-red-500">{errors.parentName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#2D2D2D]">Phone Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-[#43A047] ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-[#2D2D2D]">Email Address *</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                    className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-[#43A047] ${errors.email ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Age */}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-[#2D2D2D]">Age of Child *</label>
                  <select
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-[#43A047] ${errors.age ? "border-red-400" : "border-gray-200"}`}
                  >
                    <option value="">Select age group</option>
                    <option value="2-3">2 – 3 years (Nursery)</option>
                    <option value="3-4">3 – 4 years (Lower KG)</option>
                    <option value="4-5">4 – 5 years (Upper KG)</option>
                    <option value="5-6">5 – 6 years (Prep)</option>
                  </select>
                  {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-[#2D2D2D]">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any specific questions or requirements..."
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#43A047]"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 w-full rounded-full bg-[#43A047] py-3.5 font-bold text-white shadow-md transition hover:bg-[#388E3C] hover:shadow-lg active:scale-95"
              >
                Submit Admission Request →
              </button>
              <p className="mt-3 text-center text-xs text-[#9E9E9E]">
                We respect your privacy. Your details will only be used for admission purposes.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-[#43A047] to-[#66BB6A] py-16 px-4 text-center text-white">
        <div className="mx-auto max-w-xl">
          <div className="mb-3 text-4xl">🎒</div>
          <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Limited Seats Available!
          </h2>
          <p className="mt-3 text-lg text-green-100">
            Don't miss the chance to give your child the best early start. Secure your seat today.
          </p>
          <a
            href="#admission-form"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("section:nth-of-type(5)")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 inline-block rounded-full bg-white px-10 py-3.5 font-bold text-[#43A047] shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            Apply Now →
          </a>
        </div>
      </section>
    </div>
  );
}
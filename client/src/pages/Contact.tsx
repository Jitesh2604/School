import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import PageHero from "@/components/shared/PageHero.tsx";
import ContactBanner from "@/assets/play_school/img5.jpg";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: { message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      // ✅ Success
      setSubmitted(true);

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground font-body text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors[field] ? "border-destructive" : "border-border focus:border-primary"}`;

  const info = [
    {
      icon: MapPin,
      label: "Address",
      value: "B-63, Lic Colony, Near St. Marks Public School, Paschim Vihar",
    },
    { icon: Phone, label: "Phone", value: "+91 9953187649, +91 9711786460" },
    { icon: Mail, label: "Email", value: "ruchika101@gmail.com" },
    { icon: Clock, label: "Hours", value: "Mon – Fri: 8:00 AM – 4:00 PM" },
  ];

  return (
    <>
      {/* ✅ Page Hero Banner */}
      <PageHero
        title="Contact Us"
        backgroundImage={ContactBanner}
        breadcrumb=""
      />
      <section className="section-padding pt-28 sm:pt-32">
        <div className="container-wide mx-auto">
          <SectionHeading
            badge="Contact Us"
            title="We'd Love to Hear From You"
            description="Have questions? Want to schedule a visit? Reach out and we'll respond within 24 hours."
          />

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="pastel-card">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-foreground/70" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        We'll get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">
                            Name *
                          </label>
                          <input
                            className={inputClass("name")}
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email"
                            className={inputClass("email")}
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">
                            Phone
                          </label>
                          <input
                            type="tel"
                            className={inputClass("phone")}
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-1.5">
                            Subject
                          </label>
                          <input
                            className={inputClass("subject")}
                            value={form.subject}
                            onChange={(e) =>
                              setForm({ ...form, subject: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">
                          Message *
                        </label>
                        <textarea
                          rows={4}
                          className={inputClass("message")}
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                        />
                        {errors.message && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {info.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 80} direction="right">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-pastel-pink rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground">
                        {item.label}
                      </p>
                      {item.label === "Phone" ? (
                        <div className="text-sm text-muted-foreground space-y-2">
                          {item.value.split(",").map((num, index) => {
                            const cleanNumber = num.replace(/\s/g, "");

                            return (
                              <div key={index} className="relative group w-fit">
                                <a
                                  href={`tel:${cleanNumber}`}
                                  className="hover:text-primary transition"
                                >
                                  {num}
                                </a>

                                {/* Hover Popup */}
                                <div className="absolute left-0 mt-1 hidden group-hover:block bg-white border rounded-lg shadow-md px-3 py-1 text-xs text-gray-600 z-10">
                                  Click to Call
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              {/* Map Placeholder */}
              <ScrollReveal delay={320} direction="right">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=B-63%2C%20LIC%20Colony%2C%20Near%20St.%20Marks%20Public%20School%2C%20Paschim%20Vihar%2C%20Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative rounded-2xl overflow-hidden border-2 border-border cursor-pointer group">
                    <iframe
                      title="Location map"
                      src="https://www.google.com/maps?q=B-63%2C%20LIC%20Colony%2C%20Near%20St.%20Marks%20Public%20School%2C%20Paschim%20Vihar%2C%20Delhi&output=embed"
                      width="100%"
                      height="220"
                      style={{ border: 0, pointerEvents: "none" }}
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-semibold transition">
                      Click for Directions
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
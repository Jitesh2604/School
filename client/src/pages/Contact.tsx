import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground font-body text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors[field] ? "border-destructive" : "border-border focus:border-primary"}`;

  const info = [
    { icon: MapPin, label: "Address", value: "123 Sunshine Lane, Green Park, New Delhi 110016" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
    { icon: Mail, label: "Email", value: "hello@littlestars.edu" },
    { icon: Clock, label: "Hours", value: "Mon – Fri: 8:00 AM – 4:00 PM" },
  ];

  return (
    <section className="section-padding pt-28 sm:pt-32">
      <div className="container-wide mx-auto">
        <SectionHeading badge="Contact Us" title="We'd Love to Hear From You" description="Have questions? Want to schedule a visit? Reach out and we'll respond within 24 hours." />

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
                    <h3 className="font-display font-bold text-2xl text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Name *</label>
                        <input className={inputClass("name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Email *</label>
                        <input type="email" className={inputClass("email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Phone</label>
                        <input type="tel" className={inputClass("phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Subject</label>
                        <input className={inputClass("subject")} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Message *</label>
                      <textarea rows={4} className={inputClass("message")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" size="lg" className="w-full">Send Message</Button>
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
                    <p className="font-display font-bold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Map Placeholder */}
            <ScrollReveal delay={320} direction="right">
              <div className="rounded-2xl overflow-hidden border-2 border-border">
                <iframe
                  title="Location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7!2d77.2!3d28.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzM2LjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

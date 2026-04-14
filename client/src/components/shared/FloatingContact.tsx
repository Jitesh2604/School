import { useEffect, useRef, useState } from "react";

const contacts = [
  {
    emoji: "📱",
    label: "WhatsApp",
    sub: "Chat with us",
    href: "https://wa.me/918448603555",
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    strong: "text-green-900",
    sub_c: "text-green-400",
  },
  {
    emoji: "📞",
    label: "Call Us",
    sub: "+91 8448603555",
    href: "tel:+918448603555",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    strong: "text-blue-900",
    sub_c: "text-blue-400",
  },
  {
    emoji: "📸",
    label: "Instagram",
    sub: "Follow us",
    href: "https://instagram.com/youraccount",
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    strong: "text-purple-900",
    sub_c: "text-purple-400",
  },
  {
    emoji: "✉️",
    label: "Email",
    sub: "Info@eduvedaearlyyears.com",
    href: "mailto:Info@eduvedaearlyyears.com",
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    strong: "text-red-900",
    sub_c: "text-red-400",
  },
  {
    emoji: "🔵",
    label: "Facebook",
    sub: "Like our page",
    href: "https://facebook.com/yourpage",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    strong: "text-blue-800",
    sub_c: "text-blue-400",
  },
  {
    emoji: "💬",
    label: "SMS",
    sub: "Send a message",
    href: "sms:+918448603555",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
    strong: "text-yellow-900",
    sub_c: "text-yellow-500",
  },
  {
    emoji: "🎥",
    label: "YouTube",
    sub: "Watch videos",
    href: "https://youtube.com/@yourchannel",
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
    strong: "text-rose-900",
    sub_c: "text-rose-400",
  },
  {
    emoji: "📍",
    label: "Location",
    sub: "Find us on map",
    href: "https://goo.gl/maps/gQunL7fsSpn",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    iconBg: "bg-cyan-100",
    strong: "text-cyan-900",
    sub_c: "text-cyan-400",
  },
];

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Popup card */}
      <div
        className={`w-[265px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-violet-600 to-purple-500 px-4 py-3.5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl flex-shrink-0">
            🎧
          </div>
          <div>
            <p className="text-white font-bold text-sm">Contact Us</p>
            <p className="text-white/70 text-[11px] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              We're here to help!
            </p>
          </div>
        </div>

        {/* Contact rows */}
        <div className="p-3 flex flex-col gap-2">
          {contacts.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-[1.5px] ${item.bg} ${item.border} hover:-translate-x-1 hover:scale-[1.02] active:scale-95 transition-all duration-150 no-underline ${
                open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
              }`}
              style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
            >
              <div
                className={`w-9 h-9 rounded-[10px] ${item.iconBg} flex items-center justify-center text-[18px] flex-shrink-0`}
              >
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[12px] font-bold ${item.strong} leading-tight`}
                >
                  {item.label}
                </p>
                <p className={`text-[10px] ${item.sub_c} truncate`}>
                  {item.sub}
                </p>
              </div>
              <span className="text-gray-300 text-base">›</span>
            </a>
          ))}
        </div>
      </div>

      {/* FAB button with pulse rings */}
      <div className="relative w-[58px] h-[58px]">
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-ping" />
            <span className="absolute -inset-2 rounded-full border-2 border-purple-300/20 animate-ping [animation-delay:0.5s]" />
          </>
        )}
        <button
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle contact menu"
          className="w-[58px] h-[58px] rounded-full bg-gradient-to-br from-violet-600 to-purple-500 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(124,58,237,0.5)] hover:scale-110 active:scale-95 transition-transform duration-200 border-0 cursor-pointer"
        >
          <span
            className={`text-2xl leading-none transition-transform duration-300 ${
              open ? "rotate-45" : "rotate-0"
            }`}
          >
            {open ? "+" : "🎧"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FloatingContact;

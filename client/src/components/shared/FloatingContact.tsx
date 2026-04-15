import { useState } from "react";

// ── Configure your links here ──────────────────────────────────────────────
const TOP_ITEMS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    bg: "#25D366",
    onClick: () => window.open("https://wa.me/918448603555", "_blank"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M20.5 3.5A11.9 11.9 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.2-1.6A11.9 11.9 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 012.2 12C2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8z" />
      </svg>
    ),
  },
  {
    id: "call",
    label: "Call",
    bg: "#7C3AED",
    onClick: () => (window.location.href = "tel:+918448603555"),
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.1 9.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    id: "enquiry",
    label: "Enquiry",
    bg: "#F59E0B",
    onClick: () => alert("Open enquiry form"),
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: "gmail",
    label: "Email",
    bg: "#EA4335",
    onClick: () => (window.location.href = "mailto:Info@eduvedaearlyyears.com"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 13L2 6.76V18h20V6.76L12 13zm10-9H2l10 6 10-6z" />
      </svg>
    ),
  },
];

const LEFT_ITEMS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    bg: "#0a66c2",
    onClick: () => window.open("https://linkedin.com/in/yourprofile", "_blank"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M20.447 20.452h-3.554V14.87c0-1.331-.027-3.045-1.855-3.045-1.857 0-2.142 1.45-2.142 2.949v5.678H9.341V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.602 0 4.268 2.371 4.268 5.455v6.285zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM6.999 20.452H3.675V9h3.324v11.452z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    bg: "#FF0000",
    onClick: () => window.open("https://youtube.com/@yourchannel", "_blank"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z" />
      </svg>
    ),
  },
  {
    id: "x",
    label: "X",
    bg: "#000000",
    onClick: () => window.open("https://x.com/yourprofile", "_blank"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2H21.5l-7.5 8.57L22 22h-6.828l-5.34-6.99L3.5 22H.244l8.01-9.154L2 2h6.828l4.83 6.33L18.244 2zM16.5 20h1.5L7.5 4h-1.5L16.5 20z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    bg: "#1877F2",
    onClick: () => window.open("https://facebook.com/yourpage", "_blank"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    bg: "#E4405F",
    onClick: () => window.open("https://instagram.com/youraccount", "_blank"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm10 2c1.657 0 3 1.343 3 3v10c0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3V7c0-1.657 1.343-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z" />
      </svg>
    ),
  },
];
const GAP = 62; // px gap between buttons

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-7 right-7 z-50"
      style={{ width: 56, height: 56 }}
    >
      {/* Pulse ring when closed */}
      {!open && (
        <span className="absolute inset-0 rounded-full bg-violet-500 opacity-40 animate-ping" />
      )}

      {/* TOP column — 5 buttons going upward */}
      {TOP_ITEMS.map((item, i) => (
        <button
          key={item.id}
          onClick={item.onClick}
          title={item.label}
          className="group absolute rounded-full flex items-center justify-center shadow-lg"
          style={{
            width: 48,
            height: 48,
            bottom: 4,
            right: 4,
            background: item.bg,
            transition: `transform 0.38s cubic-bezier(0.34,1.56,0.64,1) ${i * 55}ms, opacity 0.25s ease ${i * 55}ms`,
            transform: open
              ? `translate(0px, ${-(GAP * (i + 1))}px) scale(1)`
              : "scale(0.3)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {item.icon}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {item.label}
          </span>
        </button>
      ))}

      {/* LEFT row — 4 buttons going left */}
      {LEFT_ITEMS.map((item, i) => (
        <button
          key={item.id}
          onClick={item.onClick}
          title={item.label}
          className="group absolute rounded-full flex items-center justify-center shadow-lg"
          style={{
            width: 48,
            height: 48,
            bottom: 4,
            right: 4,
            background: item.bg,
            transition: `transform 0.38s cubic-bezier(0.34,1.56,0.64,1) ${i * 55}ms, opacity 0.25s ease ${i * 55}ms`,
            transform: open
              ? `translate(${-(GAP * (i + 1))}px, 0px) scale(1)`
              : "scale(0.3)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {item.icon}
          <span className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {item.label}
          </span>
        </button>
      ))}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl z-10 hover:scale-110 transition-transform duration-200"
        style={{ background: "#7c3aed" }}
        aria-label={open ? "Close menu" : "Open contact menu"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

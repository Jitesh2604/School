import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/SAVE TREE.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Programs",
    to: "/programs",
    children: [
      { label: "Playgroup", to: "/programs#playgroup" },
      { label: "Pre Nursery", to: "/programs#pre-nursery" },
      { label: "Nursery", to: "/programs#nursery" },
      { label: "Junior Kindergarten", to: "/programs#junior-kg" },
      { label: "Senior Kindergarten", to: "/programs#senior-kg" },
      { label: "Creche & Daycare", to: "/programs#creche-daycare" },
      { label: "After-School Enrichment", to: "/programs#after-school" },
    ],
  },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  { label: "Activities", to: "/activities" },
  { label: "Contact", to: "/contact" },
  { label: "Admin", to: "/admin" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const token = localStorage.getItem("adminToken");
  const adminLink = token ? "/admin" : "/admin/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdown(null);
    setMobileDropdown(null);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-card/95 backdrop-blur-md shadow-soft" : "bg-transparent",
      )}
    >
      <div className="container-wide mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className=" rounded-2xl flex items-center justify-center">
            <img
              src={logo}
              alt="Eduveda Logo"
              className="h-11 w-auto object-contain transition-transform duration-300 hover:scale-110 rounded-2xl"
            />
          </div>

          <span className="font-display font-bold text-xl text-[#E91E63]">
            Eduveda<span className="text-primary"> Early Years</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setDropdown(link.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link
                to={link.label === "Admin" ? adminLink : link.to}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200",
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </span>
              </Link>
              {link.children && dropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 bg-card rounded-2xl shadow-playful p-2 min-w-[180px] animate-fade-up">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.to}
                      className="block px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/franchise">Partner With Us</Link>
          </Button>
          <Button asChild>
            <Link to="/admissions">Enroll Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X
              className={cn(
                "w-6 h-6",
                scrolled ? "text-foreground" : "text-white",
              )}
            />
          ) : (
            <Menu
              className={cn(
                "w-6 h-6",
                scrolled ? "text-foreground" : "text-white",
              )}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-card/98 backdrop-blur-lg border-t border-border animate-fade-up">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <button
                    type="button"
                    onClick={() =>
                      setMobileDropdown((prev) =>
                        prev === link.label ? null : link.label,
                      )
                    }
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                      mobileDropdown === link.label
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-muted",
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        mobileDropdown === link.label && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    to={link.label === "Admin" ? adminLink : link.to}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                )}
                {link.children && mobileDropdown === link.label && (
                  <div className="pl-6 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="block px-4 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/franchise">Partner With Us</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/admissions">Enroll Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

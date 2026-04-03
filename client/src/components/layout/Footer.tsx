import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container-wide mx-auto section-padding">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">L</span>
            </div>
            <span className="font-display font-bold text-xl text-background">
              Little<span className="text-primary">Stars</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-background/60 text-pretty">
            Nurturing young minds with love, creativity, and a joyful learning environment since 2010.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-background mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {["About", "Programs", "Admissions", "Gallery", "Contact", "Admin", "Franchise"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-sm text-background/60 hover:text-primary transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4 className="font-display font-bold text-background mb-4">Programs</h4>
          <ul className="space-y-2.5">
            {["Playgroup (1.5–2.5 yrs)", "Nursery (2.5–3.5 yrs)", "Junior KG (3.5–4.5 yrs)", "Senior KG (4.5–5.5 yrs)"].map(
              (item) => (
                <li key={item}>
                  <Link
                    to="/programs"
                    className="text-sm text-background/60 hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-background mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-background/60">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              B-63, Lic Colony, Near St. Marks Public School, Paschim Vihar
            </li>
            <li className="flex items-center gap-3 text-sm text-background/60">
              <Phone className="w-4 h-4 shrink-0 text-primary" />
              +91 9953187649, +91 09711786460
            </li>
            <li className="flex items-center gap-3 text-sm text-background/60">
              <Mail className="w-4 h-4 shrink-0 text-primary" />
              ruchika101@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
        © {new Date().getFullYear()} LittleStars Preschool. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

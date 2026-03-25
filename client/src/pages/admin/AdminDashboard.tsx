import { getEnquiries, getGalleryImages, getActivities } from "../../stores/mockData";
import { MessageSquare, Image, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const enquiries = getEnquiries();
  const images = getGalleryImages();
  const activities = getActivities();
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  const stats = [
    { label: "Total Enquiries", value: enquiries.length, icon: MessageSquare, color: "bg-pastel-pink", link: "/admin/enquiries" },
    { label: "New Enquiries", value: newEnquiries, icon: TrendingUp, color: "bg-pastel-yellow", link: "/admin/enquiries" },
    { label: "Gallery Images", value: images.length, icon: Image, color: "bg-pastel-blue", link: "/admin/gallery" },
    { label: "Activities", value: activities.length, icon: FileText, color: "bg-pastel-green", link: "/admin/activities" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-1">Welcome back! 👋</h2>
        <p className="text-muted-foreground text-sm">Here's an overview of your playschool website.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.link}
            className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-foreground/70" />
            </div>
            <p className="font-display font-bold text-2xl text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent enquiries */}
      <div className="bg-card rounded-2xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-foreground">Recent Enquiries</h3>
          <Link to="/admin/enquiries" className="text-sm font-semibold text-primary hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {enquiries.slice(0, 4).map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{e.name}</p>
                <p className="text-xs text-muted-foreground truncate">{e.subject}</p>
              </div>
              <span
                className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  e.status === "new"
                    ? "bg-pastel-yellow text-accent-foreground"
                    : e.status === "read"
                    ? "bg-pastel-blue text-foreground/70"
                    : "bg-pastel-green text-foreground/70"
                }`}
              >
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

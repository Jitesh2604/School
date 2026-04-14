import { useEffect, useState, useCallback } from "react";
import { MessageSquare, Image, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

type EnquiryType = "contact" | "admission" | "franchise";

interface Enquiry {
  id: string;
  type: EnquiryType;
  name: string;
  subject: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const API = {
  contact: "https://eduveda-backend.onrender.com/api/contact",
  admission: "https://eduveda-backend.onrender.com/api/admission",
  franchise: "https://eduveda-backend.onrender.com/api/enquiry",
};

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("adminToken");

  // ✅ FORMAT DATA
  const formatData = (items: unknown, type: EnquiryType): Enquiry[] => {
    let array: unknown[] = [];
    if (Array.isArray(items)) {
      array = items;
    } else if (items && typeof items === 'object') {
      const obj = items as Record<string, unknown>;
      array = (obj.data as unknown[]) || (obj.contacts as unknown[]) || (obj.enquiries as unknown[]) || [];
    }

    return array.map((item) => {
      const obj = item as Record<string, unknown>;
      return {
        id: String(obj._id || ''),
        type,
        name: String(
          obj.name ||
          `${obj.parentName || ""} (${obj.childName || ""})`
        ),
        subject: String(obj.subject || (type === 'admission' ? "Admission Enquiry" : "Enquiry")),
        status: (obj.status as "new" | "read" | "replied") || "new",
        createdAt: String(obj.createdAt || ''),
      };
    });
  };

  // ✅ FETCH ALL ENQUIRIES
  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if token exists
      if (!token) {
        setError('No authentication token found. Please login first.');
        setLoading(false);
        return;
      }

      const results = await Promise.allSettled([
        fetch(API.contact, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(API.admission, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(API.franchise, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
      ]);

      const [contactRes, admissionRes, franchiseRes] = results;

      let contacts: unknown = [];
      let admissions: unknown = [];
      let franchise: unknown = [];

      if (contactRes.status === 'fulfilled') {
        const response = contactRes.value;
        if (!response.ok) {
          console.error(`Contact API error: ${response.status} ${response.statusText}`);
          if (response.status === 401) {
            setError('Authentication failed. Please login again.');
            return;
          }
        } else {
          contacts = await response.json();
        }
      } else {
        console.error('Contact API failed:', contactRes.reason);
      }

      if (admissionRes.status === 'fulfilled') {
        const response = admissionRes.value;
        if (!response.ok) {
          console.error(`Admission API error: ${response.status} ${response.statusText}`);
          if (response.status === 401) {
            setError('Authentication failed. Please login again.');
            return;
          }
        } else {
          admissions = await response.json();
        }
      } else {
        console.error('Admission API failed:', admissionRes.reason);
      }

      if (franchiseRes.status === 'fulfilled') {
        const response = franchiseRes.value;
        if (!response.ok) {
          console.error(`Franchise API error: ${response.status} ${response.statusText}`);
          if (response.status === 401) {
            setError('Authentication failed. Please login again.');
            return;
          }
        } else {
          franchise = await response.json();
        }
      } else {
        console.error('Franchise API failed:', franchiseRes.reason);
      }

      const merged = [
        ...formatData(contacts, "contact"),
        ...formatData(admissions, "admission"),
        ...formatData(franchise, "franchise"),
      ];

      // latest first
      merged.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setEnquiries(merged);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
      setError('Failed to fetch enquiries. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAll();
    
    // Listen for localStorage changes (when status is updated)
    const handleStorageChange = () => {
      fetchAll();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Refetch data every 2 seconds
    const interval = setInterval(() => {
      fetchAll();
    }, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchAll]);

  // ✅ STATS
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  const stats = [
    {
      label: "Total Enquiries",
      value: totalEnquiries,
      icon: MessageSquare,
      color: "bg-pastel-pink",
      link: "/admin/enquiries",
    },
    {
      label: "New Enquiries",
      value: newEnquiries,
      icon: TrendingUp,
      color: "bg-pastel-yellow",
      link: "/admin/enquiries",
    },
    {
      label: "Gallery Images",
      value: 0, // you can connect later
      icon: Image,
      color: "bg-pastel-blue",
      link: "/admin/gallery",
    },
    {
      label: "Activities",
      value: 0, // you can connect later
      icon: FileText,
      color: "bg-pastel-green",
      link: "/admin/activities",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-bold text-2xl">Welcome back! 👋</h2>
        <p className="text-sm text-muted-foreground">
          Dashboard overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.link}
            className="bg-card rounded-xl p-5 shadow hover:shadow-lg"
          >
            <div className={`w-10 h-10 ${s.color} rounded mb-2 flex items-center justify-center`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* RECENT ENQUIRIES */}
      <div className="bg-card rounded-xl p-5">
        <div className="flex justify-between mb-3">
          <h3 className="font-bold">Recent Enquiries</h3>
          <Link to="/admin/enquiries">View All</Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-2">
            {enquiries.slice(0, 4).map((e) => (
              <div key={e.id} className="flex justify-between border-b py-2">
                <div>
                  <p className="font-semibold text-sm">{e.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {e.subject}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    e.status === "new"
                      ? "bg-yellow-100"
                      : e.status === "read"
                      ? "bg-blue-100"
                      : "bg-green-100"
                  }`}
                >
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
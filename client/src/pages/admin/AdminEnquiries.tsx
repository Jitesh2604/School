import { useEffect, useState } from "react";
import { Trash2, Eye, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type EnquiryType = "contact" | "admission" | "franchise";

interface Enquiry {
  id: string;
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const API = {
  contact: "http://localhost:5000/api/contact",
  admission: "http://localhost:5000/api/admission",
  franchise: "http://localhost:5000/api/enquiry",
};

const statusColors: Record<string, string> = {
  new: "bg-pastel-yellow",
  read: "bg-pastel-blue",
  replied: "bg-pastel-green",
};

const AdminEnquiries = () => {
  const [data, setData] = useState<Enquiry[]>([]);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // ✅ NORMALIZE DATA
  const formatData = (items: any[], type: EnquiryType): Enquiry[] => {
    return items.map((item) => ({
      id: item._id,
      type,
      name: item.name || item.parentName || item.childName,
      email: item.email,
      phone: item.phone,
      subject: item.subject || "Admission Enquiry",
      message: item.message,
      status: item.status || "new",
      createdAt: item.createdAt,
    }));
  };

  // ✅ FETCH ALL APIs
  const fetchAllData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const [contactRes, admissionRes, franchiseRes] = await Promise.all([
        fetch(API.contact, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(API.admission, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(API.franchise, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const contacts = await contactRes.json();
      const admissions = await admissionRes.json();
      const franchises = await franchiseRes.json();

      const merged = [
        ...formatData(contacts, "contact"),
        ...formatData(admissions, "admission"),
        ...formatData(franchises, "franchise"),
      ];

      // sort latest first
      merged.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setData(merged);
    } catch {
      toast({ title: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ DELETE (dynamic API)
  const handleDelete = async (e: Enquiry) => {
    try {
      await fetch(`${API[e.type]}/${e.id}`, {
        method: "DELETE",
      });

      setSelected(null);
      fetchAllData();

      toast({ title: "Deleted successfully", variant: "destructive" });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  // ✅ UPDATE STATUS
  const handleStatus = async (e: Enquiry, status: Enquiry["status"]) => {
    try {
      await fetch(`${API[e.type]}/${e.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      fetchAllData();
      toast({ title: "Status updated" });
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Enquiries</h2>

      <p className="text-sm text-muted-foreground">
        {loading ? "Loading..." : `${data.length} total enquiries`}
      </p>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* TABLE */}
        <div className="lg:col-span-3 bg-card rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => setSelected(e)}
                  className="border-b cursor-pointer hover:bg-muted/30"
                >
                  <td className="p-3">
                    {e.name}
                    <p className="text-xs text-muted-foreground">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </p>
                  </td>

                  <td className="p-3 capitalize">{e.type}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${statusColors[e.status]}`}
                    >
                      {e.status}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        handleDelete(e);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DETAIL */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-card p-5 rounded-xl space-y-3">
              <h3 className="font-bold">{selected.name}</h3>

              <p>Email: {selected.email}</p>
              <p>Phone: {selected.phone}</p>
              <p>Type: {selected.type}</p>
              <p>{selected.message}</p>

              <div className="flex gap-2">
                <Button onClick={() => handleStatus(selected, "read")}>
                  <Eye className="w-4 h-4 mr-1" /> Read
                </Button>

                <Button onClick={() => handleStatus(selected, "replied")}>
                  <Mail className="w-4 h-4 mr-1" /> Replied
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-5 text-center">
              <MessageSquare className="mx-auto mb-2" />
              Select enquiry
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;

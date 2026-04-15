import { useEffect, useState, useCallback } from "react";
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
  contact: "https://eduveda-backend.onrender.com/api/contact",
  admission: "https://eduveda-backend.onrender.com/api/admission",
  franchise: "https://eduveda-backend.onrender.com/api/enquiry",
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
  const formatData = (items: unknown, type: EnquiryType): Enquiry[] => {
    const array = Array.isArray(items) ? items : [];
    return array.map((item) => {
      const obj = item as Record<string, unknown>;
      return {
        id: String(obj._id || ''),
        type,
        name: String(obj.name || obj.parentName || obj.childName || ''),
        email: String(obj.email || ''),
        phone: String(obj.phone || ''),
        subject: String(obj.subject || "Enquiry"),
        message: String(obj.message || ''),
        status: (obj.status as "new" | "read" | "replied") || "new",
        createdAt: String(obj.createdAt || ''),
      };
    });
  };

  // ✅ FETCH ALL APIs
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        toast({ title: "Authentication failed. Please login again.", variant: "destructive" });
        return;
      }

      const authHeaders = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const results = await Promise.allSettled([
        fetch(API.admission, {
          method: "GET",
          headers: authHeaders,
        }),
        fetch(API.franchise, {
          method: "GET",
          headers: authHeaders,
        }),
      ]);

      let admissions: unknown = [];
      let franchises: unknown = [];

      if (results[0].status === 'fulfilled') {
        const response = results[0].value;
        if (response.ok) {
          admissions = await response.json();
        } else {
          console.error(`Admission API error: ${response.status}`);
        }
      }

      if (results[1].status === 'fulfilled') {
        const response = results[1].value;
        if (response.ok) {
          franchises = await response.json();
        } else {
          console.error(`Franchise API error: ${response.status}`);
        }
      }

      const merged = [
        ...formatData(admissions, "admission"),
        ...formatData(franchises, "franchise"),
      ];

      // sort latest first
      merged.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setData(merged);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast({ title: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ✅ DELETE (dynamic API)
  const handleDelete = async (e: Enquiry) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API[e.type]}/${e.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      setSelected(null);
      fetchAllData();

      toast({ title: "Deleted successfully", variant: "destructive" });
    } catch (err) {
      console.error('Delete error:', err);
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  // ✅ UPDATE STATUS
  const handleStatus = async (e: Enquiry, status: Enquiry["status"]) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API[e.type]}/${e.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
      }

      // Update local state immediately
      setData(data.map(item => 
        item.id === e.id ? { ...item, status } : item
      ));
      
      // Update selected item
      if (selected?.id === e.id) {
        setSelected({ ...selected, status });
      }

      // Trigger dashboard refresh via localStorage
      localStorage.setItem('enquiry-updated', JSON.stringify({ id: e.id, status, timestamp: Date.now() }));

      toast({ title: "Status updated" });
    } catch (err) {
      console.error('Status update error:', err);
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

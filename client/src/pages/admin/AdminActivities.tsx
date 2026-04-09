import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const categories = ["Education", "Activities", "Parenting", "Health", "Events"];

const emptyForm = {
  title: "",
  description: "",
  image: "",
  category: categories[0],
};

interface Activity {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

const API = "http://localhost:5000/api/activity";

const AdminActivities = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { toast } = useToast();
  const token = localStorage.getItem("adminToken");

  // ✅ FETCH DATA
  const fetchActivities = useCallback(async () => {
    try {
      if (!token) {
        toast({ title: "Authentication required", variant: "destructive" });
        return;
      }

      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load activities: ${res.status}`);
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("AdminActivities fetch error:", err);
      toast({ title: "Failed to load activities", variant: "destructive" });
    }
  }, [token, toast]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // ✅ CREATE / UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Title & description required", variant: "destructive" });
      return;
    }

    try {
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        toast({ title: "Activity updated!" });
      } else {
        await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        toast({ title: "Activity added!" });
      }

      fetchActivities();
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
    } catch {
      toast({ title: "Error saving activity", variant: "destructive" });
    }
  };

  // ✅ EDIT
  const handleEdit = (a: Activity) => {
    setForm({
      title: a.title,
      description: a.description,
      image: a.image,
      category: a.category,
    });
    setEditId(a._id);
    setShowForm(true);
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchActivities();
      toast({ title: "Activity deleted", variant: "destructive" });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Activities & Blog</h2>
          <p className="text-sm text-muted-foreground">Manage activities</p>
        </div>

        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm(emptyForm);
          }}
        >
          {showForm ? <X /> : <Plus />} {showForm ? "Cancel" : "Add"}
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-card p-5 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className={inputClass}
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />

            <select
              className={inputClass}
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <input
              className={inputClass}
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
            />

            <textarea
              className={inputClass}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />

            <Button type="submit">{editId ? "Update" : "Add"} Activity</Button>
          </form>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {data.map((a) => (
          <div key={a._id} className="bg-card p-4 rounded-xl flex gap-4">
            {a.image && (
              <img src={a.image} className="w-24 h-16 object-cover rounded" />
            )}

            <div className="flex-1">
              <h4 className="font-bold">{a.title}</h4>

              <div className="flex gap-2 text-xs">
                <span className="bg-blue-100 px-2 rounded">{a.category}</span>
                <span>{new Date(a.createdAt).toLocaleDateString()}</span>
              </div>

              <p className="text-sm mt-1">{a.description}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(a)}>
                <Pencil className="w-4 h-4" />
              </button>

              <button onClick={() => handleDelete(a._id)}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminActivities;

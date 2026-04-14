import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, ImageIcon } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  /* ── Fetch ── */
  const fetchActivities = async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();
      setData(result);
    } catch {
      toast({ title: "Failed to load activities", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  /* ── Submit (Add / Update) ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Title and description are required", variant: "destructive" });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(editId ? `${API}/${editId}` : API, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: editId ? "Activity updated!" : "Activity added!" });
      await fetchActivities();
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
    } catch {
      toast({ title: "Error saving activity", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  /* ── Edit ── */
  const handleEdit = (a: Activity) => {
    console.log("clicked edit");
    setForm({
      title: a.title,
      description: a.description,
      image: a.image,
      category: a.category,
    });
    setEditId(a._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Delete ── */
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text() || "Delete failed");
      await fetchActivities();
      toast({ title: "Activity deleted" });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "Delete failed",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition";

  return (
    <>
      {/* ── Main content — isolated stacking context prevents parent z-index bleed ── */}
      <div style={{ isolation: "isolate" }} className="space-y-6 p-1">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Activities</h2>
            <p className="text-sm text-gray-500">Manage school activities</p>
          </div>

          {/* Plain <button> — avoids any shadcn Button z-index side-effects */}
          <button
            type="button"
            onClick={() => {
              setShowForm((v) => !v);
              setEditId(null);
              setForm(emptyForm);
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition active:scale-95 cursor-pointer ${
              showForm
                ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? "Cancel" : "Add Activity"}
          </button>
        </div>

        {/* ── Add / Edit Form ── */}
        {showForm && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="mb-4 text-base font-semibold text-gray-700">
              {editId ? "✏️ Edit Activity" : "➕ New Activity"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className={inputCls}
                placeholder="Title *"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                className={inputCls}
                placeholder="Image URL (optional)"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="h-28 w-full rounded-xl object-cover border border-gray-200"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              <textarea
                className={inputCls}
                placeholder="Description *"
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-white shadow hover:bg-orange-600 disabled:opacity-60 transition cursor-pointer"
                >
                  {loading ? "Saving…" : editId ? "Update Activity" : "Add Activity"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Activity List ── */}
        <div className="space-y-3">
          {data.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center text-gray-400">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm">No activities yet. Click <strong>Add Activity</strong> to get started.</p>
            </div>
          )}

          {data.map((a) => (
            <div
              key={a._id}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Thumbnail */}
              {a.image ? (
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-16 w-24 shrink-0 rounded-xl object-cover border border-gray-100"
                />
              ) : (
                <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-800 truncate">{a.title}</h4>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-semibold text-blue-700">
                    {a.category}
                  </span>
                  <span className="text-gray-400">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{a.description}</p>
              </div>

              {/* ── Action Buttons ──
                  No z-index on parent div — that was causing the click-blocking.
                  Buttons use position:static so no stacking context is created.   */}
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleEdit(a)}
                  title="Edit activity"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 active:scale-90 cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(a._id)}
                  title="Delete activity"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:bg-red-600 active:scale-90 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Delete Confirm Modal — rendered at root level, above everything ── */}
      {deleteId && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          style={{ zIndex: 9999 }}
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteId(null); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="mb-2 text-5xl">🗑️</div>
            <h3 className="text-lg font-bold text-gray-800">Delete this activity?</h3>
            <p className="mt-1 text-sm text-gray-500">This cannot be undone.</p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminActivities;
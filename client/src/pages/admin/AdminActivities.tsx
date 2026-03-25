import { useState } from "react";
import { getActivities, addActivity, updateActivity, deleteActivity, type Activity } from "../../stores/mockData";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const categories = ["Education", "Activities", "Parenting", "Health", "Events"];

const emptyForm = { title: "", description: "", image: "", category: categories[0] };

const AdminActivities = () => {
  const [data, setData] = useState(getActivities());
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const refresh = () => setData(getActivities());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Title and description are required", variant: "destructive" });
      return;
    }
    if (editId) {
      updateActivity(editId, form);
      toast({ title: "Activity updated!" });
    } else {
      addActivity(form);
      toast({ title: "Activity added!" });
    }
    refresh();
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (a: Activity) => {
    setForm({ title: a.title, description: a.description, image: a.image, category: a.category });
    setEditId(a.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteActivity(id);
    refresh();
    toast({ title: "Activity deleted", variant: "destructive" });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border-2 border-border bg-card text-foreground font-body text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Activities & Blog</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage blog posts and activity updates.</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }} className="gap-2">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add New"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card rounded-2xl shadow-soft p-6 animate-fade-up">
          <h3 className="font-display font-bold text-base text-foreground mb-4">
            {editId ? "Edit Activity" : "New Activity"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Title *</label>
                <input className={inputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Category</label>
                <select className={inputClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Image URL</label>
              <input className={inputClass} placeholder="https://..." value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Description *</label>
              <textarea rows={3} className={inputClass} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <Button type="submit">{editId ? "Update" : "Add"} Activity</Button>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {data.map((a) => (
          <div key={a.id} className="bg-card rounded-2xl shadow-soft p-4 flex gap-4 items-start group">
            {a.image && (
              <img src={a.image} alt={a.title} className="w-24 h-16 rounded-xl object-cover shrink-0 hidden sm:block" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-display font-bold text-foreground text-sm line-clamp-1">{a.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pastel-blue text-foreground/70">{a.category}</span>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => handleEdit(a)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminActivities;

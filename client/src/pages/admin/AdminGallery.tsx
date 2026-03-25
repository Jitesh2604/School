import { useState } from "react";
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "../../stores/mockData";
import { Trash2, Upload, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const categories = ["Classrooms", "Outdoor", "Events", "Art & Craft", "Activities"];

const AdminGallery = () => {
  const [images, setImages] = useState(getGalleryImages());
  const [form, setForm] = useState({ src: "", alt: "", category: categories[0] });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const refresh = () => setImages(getGalleryImages());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setForm((f) => ({ ...f, src: url, alt: file.name.replace(/\.[^.]+$/, "") }));
    }
  };

  const handleUrlInput = (url: string) => {
    setForm((f) => ({ ...f, src: url }));
    setPreview(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.src.trim()) {
      toast({ title: "Please provide an image URL or upload a file", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addGalleryImage({ src: form.src, alt: form.alt || "Gallery image", category: form.category });
      refresh();
      setForm({ src: "", alt: "", category: categories[0] });
      setPreview(null);
      setLoading(false);
      toast({ title: "Image added to gallery!" });
    }, 500);
  };

  const handleDelete = (id: string) => {
    deleteGalleryImage(id);
    refresh();
    toast({ title: "Image removed", variant: "destructive" });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border-2 border-border bg-card text-foreground font-body text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-foreground">Gallery Management</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload and manage gallery images.</p>
      </div>

      {/* Upload form */}
      <div className="bg-card rounded-2xl shadow-soft p-6">
        <h3 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
          <ImagePlus className="w-5 h-5 text-primary" /> Add New Image
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Image URL</label>
              <input
                className={inputClass}
                placeholder="https://..."
                value={form.src}
                onChange={(e) => handleUrlInput(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Or Upload File</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-primary file:text-primary-foreground file:font-semibold file:text-sm file:cursor-pointer" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Caption / Alt Text</label>
              <input className={inputClass} placeholder="Describe the image" value={form.alt} onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))} />
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

          {preview && (
            <div className="w-40 h-28 rounded-xl overflow-hidden border-2 border-border">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <Button type="submit" disabled={loading} className="gap-2">
            <Upload className="w-4 h-4" /> {loading ? "Uploading..." : "Add Image"}
          </Button>
        </form>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative rounded-2xl overflow-hidden bg-card shadow-soft">
            <img src={img.src} alt={img.alt} className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
              <button
                onClick={() => handleDelete(img.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground p-2 rounded-full shadow-medium"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-foreground truncate">{img.alt}</p>
              <p className="text-xs text-muted-foreground">{img.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;

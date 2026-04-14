import { useState, useEffect } from "react";
import { Trash2, Upload, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const categories = ["Classrooms", "Outdoor", "Events", "Art & Craft", "Activities"];

const API = "https://eduveda-backend.onrender.com/api/gallery";

// ⚠️ Replace with your Cloudinary details
const CLOUD_NAME = "dkmeqlhka";
const UPLOAD_PRESET = "eduveda_Galley";

const AdminGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [form, setForm] = useState({ src: "", alt: "", category: categories[0] });
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const token = localStorage.getItem("adminToken");

  // ✅ Fetch images from DB
  const fetchImages = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast({ title: "Error fetching images", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ Handle file upload preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreview(url);
      setForm((f) => ({
        ...f,
        alt: selected.name.replace(/\.[^.]+$/, ""),
      }));
    }
  };

  // ✅ Handle URL input
  const handleUrlInput = (url: string) => {
    setFile(null);
    setForm((f) => ({ ...f, src: url }));
    setPreview(url);
  };

  // ✅ Upload to Cloudinary
  const uploadToCloudinary = async () => {
    if (!file) return form.src;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error(`Cloudinary upload failed: ${res.statusText}`);
    }

    const result = await res.json();
    if (!result.secure_url) {
      throw new Error("No URL returned from Cloudinary");
    }
    return result.secure_url;
  };

  // ✅ Submit (POST to backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !form.src.trim()) {
      toast({
        title: "Upload file or provide image URL",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // 👉 Upload image first
      const imageUrl = await uploadToCloudinary();

      // 👉 Save to DB
      const dbResponse = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          src: imageUrl,
          alt: form.alt || "Gallery image",
          category: form.category,
        }),
      });

      if (!dbResponse.ok) {
        throw new Error(`Database save failed: ${dbResponse.statusText}`);
      }

      await fetchImages();

      setForm({ src: "", alt: "", category: categories[0] });
      setPreview(null);
      setFile(null);

      toast({ title: "Image added successfully!" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      toast({ title: errorMessage, variant: "destructive" });
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/${id}`, { 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Delete failed: ${res.statusText}`);
      }
      await fetchImages();
      toast({ title: "Image deleted" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Delete failed";
      console.error("Delete error:", err);
      toast({ title: errorMessage, variant: "destructive" });
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold text-2xl">Gallery Management</h2>
        <p className="text-sm text-muted-foreground">
          Upload and manage gallery images.
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <ImagePlus className="w-5 h-5 text-primary" /> Add New Image
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Image URL"
              value={form.src}
              onChange={(e) => handleUrlInput(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Alt text"
              value={form.alt}
              onChange={(e) =>
                setForm((f) => ({ ...f, alt: e.target.value }))
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
          </div>

          {preview && (
            <img
              src={preview}
              className="w-40 h-28 object-cover rounded-xl border"
            />
          )}

          <Button type="submit" disabled={loading}>
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Uploading..." : "Add Image"}
          </Button>
        </form>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="group relative rounded-2xl overflow-hidden"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full aspect-4/3 object-cover"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex justify-center items-center transition">
              <button
                onClick={() => handleDelete(img._id)}
                className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 text-xs">
              <p>{img.alt}</p>
              <p className="text-muted-foreground">{img.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
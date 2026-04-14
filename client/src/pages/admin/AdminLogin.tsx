import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch("https://eduveda-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: { token?: string; message?: string } = await res.json();

    if (!res.ok || !data.token) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Store token
    localStorage.setItem("adminToken", data.token);

    // ✅ Redirect
    navigate("/admin");

  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4">

      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-pastel-pink rounded-full opacity-50 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pastel-blue rounded-full opacity-50 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pastel-yellow rounded-full opacity-30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      {/* Card */}
      <div className="relative w-full max-w-md">

        {/* Decorative top strip */}
        <div className="h-3 w-full rounded-t-3xl bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="bg-card rounded-b-3xl shadow-playful px-8 py-10">

          {/* Logo / Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-medium mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Admin Portal
            </h1>
            <p className="text-muted-foreground text-sm mt-1 text-center">
              LittleStars Playschool — Staff Access Only
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@littlestars.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:border-primary transition-colors duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/60 font-body text-sm focus:outline-none focus:border-primary transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="xl"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary font-semibold transition-colors duration-200"
            >
              ← Back to Website
            </a>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute -top-4 -right-4 bg-pastel-yellow rounded-2xl px-3 py-1.5 shadow-soft rotate-6">
          <span className="text-xs font-bold text-accent-foreground">Staff Only 🔒</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
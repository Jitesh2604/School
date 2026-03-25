import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Admissions from "./pages/Admissions";
import Gallery from "./pages/Gallery";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminActivities from "./pages/admin/AdminActivities";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout><Index /></Layout>} path="/" />
          <Route element={<Layout><About /></Layout>} path="/about" />
          <Route element={<Layout><Programs /></Layout>} path="/programs" />
          <Route element={<Layout><Admissions /></Layout>} path="/admissions" />
          <Route element={<Layout><Gallery /></Layout>} path="/gallery" />
          <Route element={<Layout><Activities /></Layout>} path="/activities" />
          <Route element={<Layout><Contact /></Layout>} path="/contact" />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/enquiries" element={<AdminLayout><AdminEnquiries /></AdminLayout>} />
          <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
          <Route path="/admin/activities" element={<AdminLayout><AdminActivities /></AdminLayout>} />

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

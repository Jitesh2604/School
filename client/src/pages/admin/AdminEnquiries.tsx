import { useState } from "react";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry, type Enquiry } from "../../stores/mockData";
import { Trash2, Eye, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  new: "bg-pastel-yellow text-accent-foreground",
  read: "bg-pastel-blue text-foreground/70",
  replied: "bg-pastel-green text-foreground/70",
};

const AdminEnquiries = () => {
  const [data, setData] = useState(getEnquiries());
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const { toast } = useToast();

  const refresh = () => setData(getEnquiries());

  const handleStatus = (id: string, status: Enquiry["status"]) => {
    updateEnquiryStatus(id, status);
    refresh();
    toast({ title: "Status updated" });
  };

  const handleDelete = (id: string) => {
    deleteEnquiry(id);
    refresh();
    if (selected?.id === id) setSelected(null);
    toast({ title: "Enquiry deleted", variant: "destructive" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-foreground">Contact Enquiries</h2>
        <p className="text-sm text-muted-foreground mt-1">{data.length} total enquiries</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Table */}
        <div className="lg:col-span-3 bg-card rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Subject</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e) => (
                  <tr
                    key={e.id}
                    className={`border-b border-border last:border-0 cursor-pointer transition-colors hover:bg-muted/30 ${selected?.id === e.id ? "bg-muted/40" : ""}`}
                    onClick={() => setSelected(e)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{e.date}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell truncate max-w-[160px]">{e.subject}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[e.status]}`}>{e.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={(ev) => { ev.stopPropagation(); handleDelete(e.id); }} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-card rounded-2xl shadow-soft p-6 space-y-4 sticky top-20">
              <h3 className="font-display font-bold text-lg text-foreground">{selected.name}</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold text-foreground">Email:</span> <span className="text-muted-foreground">{selected.email}</span></p>
                <p><span className="font-semibold text-foreground">Phone:</span> <span className="text-muted-foreground">{selected.phone}</span></p>
                <p><span className="font-semibold text-foreground">Subject:</span> <span className="text-muted-foreground">{selected.subject}</span></p>
                <p><span className="font-semibold text-foreground">Date:</span> <span className="text-muted-foreground">{selected.date}</span></p>
              </div>
              <div className="bg-muted rounded-xl p-4">
                <p className="text-sm text-foreground leading-relaxed">{selected.message}</p>
              </div>
              <div className="flex gap-2">
                {selected.status === "new" && (
                  <Button size="sm" variant="outline" onClick={() => handleStatus(selected.id, "read")} className="gap-1.5">
                    <Eye className="w-4 h-4" /> Mark Read
                  </Button>
                )}
                {selected.status !== "replied" && (
                  <Button size="sm" onClick={() => handleStatus(selected.id, "replied")} className="gap-1.5">
                    <Mail className="w-4 h-4" /> Mark Replied
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-soft p-8 text-center">
              <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Click an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default AdminEnquiries;

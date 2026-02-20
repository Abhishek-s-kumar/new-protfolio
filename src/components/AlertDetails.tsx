import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Search } from "lucide-react";

const alertFields = [
  { icon: "📅", field: "@timestamp", value: "Feb 18, 2026 @ 20:00:47.123" },
  { icon: "#", field: "_id", value: "83dc6b0072a24a0a39e6ec415b63c4bd2823b196" },
  { icon: "⊘", field: "_ignored", value: "kibana.alert.original_time" },
  { icon: "#", field: "_index", value: ".internal.alerts-security.alerts-default-000001" },
  { icon: "●", field: "process.name", value: "rundll32.exe" },
  { icon: "#", field: "target.process.name", value: "lsass.exe" },
  { icon: "#", field: "target.process.name", value: "lsass.exe" },
  { icon: "#", field: "event.action", value: "process_access" },
  { icon: "#", field: "agent.name", value: "dc-server-01" },
];

const AlertDetails = () => {
  const [activeTab, setActiveTab] = useState("Table");
  const [collapsed, setCollapsed] = useState(false);
  const detailTabs = ["Overview", "Table", "JSON"];

  return (
    <div className="w-[420px] border-l border-border bg-card flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-1 text-xs text-tab-active hover:underline mb-3"
        >
          <ChevronRight className="w-3 h-3" />
          <span>Collapse details</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-critical" />
          <span className="text-xs text-critical font-medium">Critical</span>
        </div>

        <p className="text-xs text-muted-foreground mb-1">
          Feb 18, 2026 @ 20:00:47.123
        </p>

        <h2 className="text-sm font-bold text-foreground leading-tight">
          ⚠ Suspicious Process Access to LSASS (Credential Dumping)
        </h2>
      </div>

      {/* Status bar */}
      <div className="grid grid-cols-4 border-b border-border text-xs">
        <div className="p-3 border-r border-border">
          <div className="text-muted-foreground mb-1 font-medium">Status</div>
          <span className="inline-flex items-center gap-1 bg-critical/20 text-critical px-2 py-0.5 rounded text-[11px] font-semibold">
            Open ▾
          </span>
        </div>
        <div className="p-3 border-r border-border">
          <div className="text-muted-foreground mb-1 font-medium">Risk score</div>
          <span className="text-foreground font-bold">95</span>
        </div>
        <div className="p-3 border-r border-border">
          <div className="text-muted-foreground mb-1 font-medium">Assignees</div>
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-primary/30 border border-primary" />
            <div className="w-5 h-5 rounded-full bg-info/30 border border-info" />
          </div>
        </div>
        <div className="p-3">
          <div className="text-muted-foreground mb-1 font-medium">Notes</div>
          <button className="text-tab-active text-[11px] hover:underline">+ Add note</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {detailTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 text-xs font-medium border-b-2 transition-colors",
              activeTab === tab
                ? "border-tab-active text-tab-active"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2 bg-secondary rounded px-3 py-1.5">
          <Search className="w-3 h-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter by field or value..."
            className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none flex-1"
          />
        </div>
      </div>

      {/* Field table */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        <div className="grid grid-cols-[140px_1fr] text-xs border-b border-border">
          <div className="px-4 py-2 font-semibold text-muted-foreground">Field</div>
          <div className="px-4 py-2 font-semibold text-muted-foreground">Value</div>
        </div>
        {alertFields.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[140px_1fr] text-xs border-b border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="px-4 py-2.5 flex items-center gap-1.5 text-muted-foreground">
              <span className="text-[10px]">{row.icon}</span>
              <span>{row.field}</span>
            </div>
            <div className="px-4 py-2.5 text-foreground font-mono text-[11px] truncate">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertDetails;

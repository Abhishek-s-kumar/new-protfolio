import ProcessNode from "./ProcessNode";

const processTree = [
  { id: "winlogon", name: "winlogon.exe", x: 60, y: 50 },
  { id: "cmd", name: "cmd.exe", x: 220, y: 50 },
  { id: "whoami", name: "whoami.exe", x: 380, y: 50 },
  { id: "explorer", name: "explorer.exe", x: 130, y: 140 },
  { id: "powershell", name: "powershell.exe", x: 80, y: 230 },
  { id: "net1", name: "net.exe", x: 300, y: 230 },
  { id: "rundll32", name: "rundll32.exe", x: 260, y: 330, isAnalyzed: true },
  { id: "lsass", name: "lsass.exe", x: 380, y: 420 },
  { id: "net2", name: "net.exe", x: 200, y: 500 },
];

const edges = [
  { from: "winlogon", to: "cmd", label: "1 minute" },
  { from: "cmd", to: "whoami", label: "30 seconds" },
  { from: "winlogon", to: "explorer", label: "1 minute" },
  { from: "explorer", to: "powershell", label: "1 minute" },
  { from: "powershell", to: "net1", label: "" },
  { from: "powershell", to: "rundll32", label: "30 seconds" },
  { from: "rundll32", to: "lsass", label: "accesses" },
  { from: "rundll32", to: "net2", label: "30 seconds" },
];

const AnalyzerGraph = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Sub tabs */}
      <div className="flex items-center gap-0 px-4 pt-3">
        <button className="px-4 py-2 text-xs rounded-l border border-border bg-secondary text-muted-foreground">
          Session View
        </button>
        <button className="px-4 py-2 text-xs rounded-r border border-primary bg-primary/20 text-primary font-semibold">
          Analyzer Graph
        </button>
      </div>

      {/* Graph area */}
      <div className="flex-1 relative overflow-auto p-4">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: 580 }}>
          {edges.map((edge, i) => {
            const from = processTree.find((p) => p.id === edge.from)!;
            const to = processTree.find((p) => p.id === edge.to)!;
            const x1 = from.x + 60;
            const y1 = from.y + 35;
            const x2 = to.x + 60;
            const y2 = to.y + 10;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            return (
              <g key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  className="stroke-edge"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                />
                {edge.label && (
                  <text x={mx} y={my - 6} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="relative" style={{ minHeight: 580 }}>
          {processTree.map((node) => (
            <div
              key={node.id}
              className="absolute"
              style={{ left: node.x, top: node.y }}
            >
              <ProcessNode
                label="RUNNING PROCESS"
                name={node.name}
                isAnalyzed={node.isAnalyzed}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Graph controls */}
      <div className="absolute top-24 right-4 flex flex-col gap-1 bg-card border border-border rounded p-1">
        {["⟳", "◎", "⊕", "⊖", "⊟", "☰"].map((icon, i) => (
          <button key={i} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary rounded text-sm">
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalyzerGraph;

import { cn } from "@/lib/utils";

interface ProcessNodeProps {
  label: string;
  name: string;
  isAnalyzed?: boolean;
  className?: string;
}

const ProcessNode = ({ label, name, isAnalyzed, className }: ProcessNodeProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {isAnalyzed ? "ANALYZED EVENT - RUNNING PROCESS" : "RUNNING PROCESS"}
      </span>
      <div
        className={cn(
          "px-4 py-1.5 rounded text-xs font-semibold border min-w-[120px] text-center",
          isAnalyzed
            ? "bg-success/20 border-success text-success"
            : "bg-node-bg border-node-border text-primary"
        )}
      >
        {name}
      </div>
    </div>
  );
};

export default ProcessNode;

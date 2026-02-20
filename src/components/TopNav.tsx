import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Visualize", "Insights", "Investigation", "Response", "Notes"];

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TopNav = ({ activeTab, onTabChange }: TopNavProps) => {
  return (
    <nav className="flex items-center border-b border-border bg-card px-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-4 py-3 text-sm font-medium transition-colors border-b-2",
            activeTab === tab
              ? "border-tab-active text-tab-active"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default TopNav;

import { useState } from "react";
import TopNav from "@/components/TopNav";
import AnalyzerGraph from "@/components/AnalyzerGraph";
import AlertDetails from "@/components/AlertDetails";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Visualize");

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex flex-1 overflow-hidden relative">
        <AnalyzerGraph />
        <AlertDetails />
      </div>
    </div>
  );
};

export default Index;

import { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import AnalyticsOverview from "./components/analytics/AnalyticsOverview";
import DataTable from "./components/data-table/DataTable";
import ModeSwitcher from "./components/live/ModeSwitcher";
import { mockUsers } from "./data/mockUsers";
import { useTelemetry } from "./hooks/useTelemetry";

const defaultConfig = {
  source: "http",
  endpoint: "",
  deviceId: "nano-edge-01",
  interval: 2000,
};

export default function App() {
  const [sidebar, setSidebar] = useState(false);
  const [mode, setMode] = useState(() => localStorage.getItem("pulsegrid-mode") || "demo");
  const [config, setConfig] = useState(() => {
    try {
      return { ...defaultConfig, ...JSON.parse(localStorage.getItem("pulsegrid-live-config") || "{}") };
    } catch {
      return defaultConfig;
    }
  });
  const { telemetry, history, status, error } = useTelemetry({ mode, config });

  useEffect(() => localStorage.setItem("pulsegrid-mode", mode), [mode]);
  useEffect(() => localStorage.setItem("pulsegrid-live-config", JSON.stringify(config)), [config]);

  return <div className="app-shell">
    <Sidebar open={sidebar} onClose={()=>setSidebar(false)}/>
    <main className="main">
      <Navbar onMenu={()=>setSidebar(true)}/>
      <div className="content">
        <div className="hero-row">
          <div>
            <p className="eyebrow">{mode === "demo" ? "Demo workspace" : "Live workspace"}</p>
            <h2>{mode === "demo" ? "Explore PulseGrid without hardware." : "Monitor your connected device."}</h2>
            <p>{mode === "demo" ? "All values are clearly marked simulated or sample data." : "Telemetry shown below comes from the source you configure."}</p>
          </div>
          <div className={`system-health ${status === "error" ? "health-error" : ""}`}><i/><span>{mode === "demo" ? "Simulation running" : status === "streaming" ? "Live source connected" : status === "error" ? "Connection error" : "Waiting for live source"}</span></div>
        </div>

        <ModeSwitcher mode={mode} setMode={setMode} config={config} setConfig={setConfig} status={status} error={error}/>
        <AnalyticsOverview telemetry={telemetry} history={history} mode={mode} status={status} source={config.source}/>
        <DataTable rows={mockUsers}/>
        <p className="demo-table-note">Developer activity is sample data included to demonstrate table filtering, sorting and pagination.</p>
        <footer>PulseGrid · Open-source developer dashboard · MIT License</footer>
      </div>
    </main>
  </div>;
}

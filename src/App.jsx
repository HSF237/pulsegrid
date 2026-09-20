import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import AnalyticsOverview from "./components/analytics/AnalyticsOverview";
import DataTable from "./components/data-table/DataTable";
import { mockUsers } from "./data/mockUsers";
import { useTelemetry } from "./hooks/useTelemetry";

export default function App() {
  const [sidebar, setSidebar] = useState(false);
  const { telemetry, history } = useTelemetry("nano-edge-01");

  return <div className="app-shell">
    <Sidebar open={sidebar} onClose={()=>setSidebar(false)}/>
    <main className="main">
      <Navbar onMenu={()=>setSidebar(true)}/>
      <div className="content">
        <div className="hero-row"><div><p className="eyebrow">Sunday, 20 September</p><h2>Everything is running smoothly.</h2><p>Monitor your application, database streams and connected hardware from one workspace.</p></div><div className="system-health"><i/><span>All systems operational</span></div></div>
        <AnalyticsOverview telemetry={telemetry} history={history}/>
        <DataTable rows={mockUsers}/>
        <footer>PulseGrid · Open-source developer dashboard · MIT License</footer>
      </div>
    </main>
  </div>;
}

import { Activity, Database, Radio, Users } from "lucide-react";
import MetricCard from "./MetricCard";
import TelemetryChart from "./TelemetryChart";

const fmt = (seconds=0) => {
  const h = Math.floor(seconds/3600);
  const m = Math.floor((seconds%3600)/60);
  return `${h}h ${m}m`;
};

export default function AnalyticsOverview({ telemetry, history }) {
  const cards = [
    { icon: Users, label: "Active users", value: "2,841", change: "+12.4%", detail: "vs. previous 30 days" },
    { icon: Activity, label: "API requests", value: "1.28M", change: "+8.1%", detail: "99.98% successful" },
    { icon: Database, label: "Database streams", value: "128", change: "+4.7%", detail: "14 regions connected" },
    { icon: Radio, label: "Devices online", value: "24/25", change: "96%", detail: "1 device needs attention" },
  ];
  return <>
    <section className="metric-grid">{cards.map(c => <MetricCard key={c.label} {...c}/>)}</section>
    <section className="panel telemetry-panel">
      <div className="panel-heading"><div><p className="eyebrow">Live hardware stream</p><h2>Arduino Nano telemetry</h2></div><span className="status-pill"><i/> Streaming</span></div>
      <div className="telemetry-layout">
        <div><div className="chart-label"><span>CPU load</span><strong>{telemetry?.cpuLoad ?? "—"}%</strong></div><TelemetryChart history={history}/></div>
        <div className="telemetry-stats">
          <div><span>Ping</span><strong>{telemetry?.ping ?? "—"} ms</strong></div>
          <div><span>Temperature</span><strong>{telemetry?.temperature ?? "—"}°C</strong></div>
          <div><span>Memory</span><strong>{telemetry?.memory ?? "—"}%</strong></div>
          <div><span>Uptime</span><strong>{fmt(telemetry?.uptime)}</strong></div>
        </div>
      </div>
    </section>
  </>;
}

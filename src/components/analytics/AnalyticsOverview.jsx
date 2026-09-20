import { Activity, Database, Radio, Timer, Users, Wifi } from "lucide-react";
import MetricCard from "./MetricCard";
import TelemetryChart from "./TelemetryChart";

const fmt = (seconds=0) => {
  const h = Math.floor(seconds/3600);
  const m = Math.floor((seconds%3600)/60);
  return `${h}h ${m}m`;
};

export default function AnalyticsOverview({ telemetry, history, mode, status, source }) {
  const demoCards = [
    { icon: Users, label: "Active users", value: "2,841", change: "DEMO", detail: "Sample analytics — not production data" },
    { icon: Activity, label: "API requests", value: "1.28M", change: "DEMO", detail: "Sample analytics — not production data" },
    { icon: Database, label: "Database streams", value: "128", change: "DEMO", detail: "Sample analytics — not production data" },
    { icon: Radio, label: "Devices online", value: "24/25", change: "DEMO", detail: "Sample analytics — not production data" },
  ];

  const liveCards = [
    { icon: Radio, label: "Device status", value: status === "streaming" ? "Online" : "—", change: "LIVE", detail: telemetry?.deviceId ?? "Waiting for telemetry" },
    { icon: Activity, label: "CPU load", value: telemetry ? `${telemetry.cpuLoad}%` : "—", change: "LIVE", detail: "Latest device sample" },
    { icon: Wifi, label: "Device ping", value: telemetry ? `${telemetry.ping} ms` : "—", change: "LIVE", detail: "Source-reported latency" },
    { icon: Timer, label: "Uptime", value: telemetry ? fmt(telemetry.uptime) : "—", change: "LIVE", detail: `Connected via ${source}` },
  ];

  const cards = mode === "demo" ? demoCards : liveCards;

  return <>
    <section className="metric-grid">{cards.map(c => <MetricCard key={c.label} {...c}/>)}</section>
    <section className="panel telemetry-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{mode === "demo" ? "Simulated hardware stream" : "Live hardware stream"}</p>
          <h2>{telemetry?.deviceId || "Device telemetry"}</h2>
        </div>
        <span className={`status-pill ${status === "error" ? "status-error" : ""}`}><i/> {mode === "demo" ? "Simulated" : status === "streaming" ? "Streaming" : "Waiting"}</span>
      </div>
      <div className="telemetry-layout">
        <div><div className="chart-label"><span>CPU load</span><strong>{telemetry?.cpuLoad ?? "—"}{telemetry ? "%" : ""}</strong></div><TelemetryChart history={history}/></div>
        <div className="telemetry-stats">
          <div><span>Ping</span><strong>{telemetry ? `${telemetry.ping} ms` : "—"}</strong></div>
          <div><span>Temperature</span><strong>{telemetry ? `${telemetry.temperature}°C` : "—"}</strong></div>
          <div><span>Memory</span><strong>{telemetry ? `${telemetry.memory}%` : "—"}</strong></div>
          <div><span>Packet loss</span><strong>{telemetry ? `${telemetry.packetLoss}%` : "—"}</strong></div>
          <div><span>Uptime</span><strong>{telemetry ? fmt(telemetry.uptime) : "—"}</strong></div>
          <div><span>Last sample</span><strong>{telemetry ? new Date(telemetry.timestamp).toLocaleTimeString() : "—"}</strong></div>
        </div>
      </div>
    </section>
  </>;
}

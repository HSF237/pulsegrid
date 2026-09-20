import { Activity, Database, Gauge, Github, Radio, Settings, X } from "lucide-react";

const links = [
  [Gauge, "Overview"], [Activity, "Analytics"], [Radio, "Devices"],
  [Database, "Streams"], [Settings, "Settings"]
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="overlay lg:hidden" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Activity size={18}/></div><span>PulseGrid</span><button className="icon-button ml-auto lg:hidden" onClick={onClose}><X size={18}/></button></div>
        <nav className="nav-list">
          <p className="eyebrow">Workspace</p>
          {links.map(([Icon, label], index) => <button key={label} className={`nav-link ${index === 0 ? "active" : ""}`}><Icon size={18}/><span>{label}</span>{index === 2 && <span className="live-dot"/>}</button>)}
        </nav>
        <div className="sidebar-card"><p className="eyebrow">Open source</p><h3>Built to fork.</h3><p>Firebase-ready architecture with a zero-config telemetry demo.</p><a href="https://github.com/HSF237/pulsegrid" target="_blank" rel="noreferrer"><Github size={16}/> View repository</a></div>
      </aside>
    </>
  );
}

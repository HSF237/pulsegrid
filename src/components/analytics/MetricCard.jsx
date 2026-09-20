export default function MetricCard({ icon: Icon, label, value, change, detail }) {
  return <article className="metric-card">
    <div className="metric-top"><span className="metric-icon"><Icon size={18}/></span><span className="change">{change}</span></div>
    <div><p>{label}</p><strong>{value}</strong><small>{detail}</small></div>
  </article>;
}

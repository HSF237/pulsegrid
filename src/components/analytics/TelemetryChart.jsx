export default function TelemetryChart({ history }) {
  const values = history.map((item) => item.cpuLoad);
  const points = values.length > 1 ? values.map((value, i) => `${(i/(values.length-1))*100},${100-value}`).join(" ") : "";
  return <div className="chart">
    <div className="chart-grid">{[0,1,2,3].map(i => <i key={i}/>)}</div>
    {points && <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="CPU load history"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".25"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${points} 100,100`} fill="url(#area)"/><polyline points={points} fill="none" vectorEffect="non-scaling-stroke"/></svg>}
  </div>;
}

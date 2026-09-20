import { Database, FlaskConical, Globe2, Radio, Wifi } from "lucide-react";

export default function ModeSwitcher({ mode, setMode, config, setConfig, status, error }) {
  const update = (key, value) => setConfig((current) => ({ ...current, [key]: value }));
  const needsEndpoint = config.source === "http" || config.source === "websocket";

  return <section className="mode-panel">
    <div className="mode-panel-head">
      <div>
        <p className="eyebrow">Data source</p>
        <h3>{mode === "demo" ? "Demo telemetry" : "Live telemetry"}</h3>
        <p>{mode === "demo" ? "Safe simulated values for exploring PulseGrid." : "Connect PulseGrid to a real telemetry source."}</p>
      </div>
      <div className="mode-toggle" role="group" aria-label="Telemetry mode">
        <button className={mode === "demo" ? "selected" : ""} onClick={() => setMode("demo")}><FlaskConical size={15}/> Demo</button>
        <button className={mode === "live" ? "selected" : ""} onClick={() => setMode("live")}><Radio size={15}/> Live</button>
      </div>
    </div>

    {mode === "live" && <div className="live-config">
      <label>
        <span>Source</span>
        <select value={config.source} onChange={(event) => update("source", event.target.value)}>
          <option value="http">HTTP / REST endpoint</option>
          <option value="websocket">WebSocket</option>
          <option value="firestore">Firebase Firestore</option>
        </select>
      </label>

      {needsEndpoint && <label className="endpoint-field">
        <span>{config.source === "http" ? <Globe2 size={13}/> : <Wifi size={13}/>} Endpoint</span>
        <input
          value={config.endpoint}
          onChange={(event) => update("endpoint", event.target.value)}
          placeholder={config.source === "http" ? "https://api.example.com/telemetry" : "wss://example.com/telemetry"}
        />
      </label>}

      <label>
        <span><Database size={13}/> Device ID</span>
        <input value={config.deviceId} onChange={(event) => update("deviceId", event.target.value)} placeholder="nano-edge-01"/>
      </label>

      {config.source === "http" && <label>
        <span>Polling interval</span>
        <select value={config.interval} onChange={(event) => update("interval", Number(event.target.value))}>
          <option value={1000}>1 second</option>
          <option value={2000}>2 seconds</option>
          <option value={5000}>5 seconds</option>
          <option value={10000}>10 seconds</option>
        </select>
      </label>}

      {config.source === "firestore" && <p className="config-note">Reads the newest document from <code>devices/{config.deviceId || "{deviceId}"}/telemetry</code>. Firebase environment variables and Anonymous Authentication must be enabled.</p>}
    </div>}

    <div className={`source-status ${status}`}>
      <i/>
      <span>{mode === "demo" ? "Simulation active" : status === "streaming" ? "Receiving live data" : status === "error" ? error : status === "waiting" ? "Enter a source endpoint to connect" : "Connecting…"}</span>
    </div>
  </section>;
}

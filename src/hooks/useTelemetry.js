import { useEffect, useState } from "react";
import { createFirestoreSource } from "../dataSources/firestoreSource";
import { createHttpSource } from "../dataSources/httpSource";
import { createWebSocketSource } from "../dataSources/webSocketSource";
import { createTelemetrySimulator } from "../hardware/telemetrySimulator";

export function useTelemetry({ mode, config }) {
  const [telemetry, setTelemetry] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(mode === "demo" ? "demo" : "connecting");
  const [error, setError] = useState("");

  useEffect(() => {
    setTelemetry(null);
    setHistory([]);
    setError("");

    if (mode === "live" && config.source !== "firestore" && !config.endpoint.trim()) {
      setStatus("waiting");
      return;
    }

    let source;
    if (mode === "demo") {
      setStatus("demo");
      source = createTelemetrySimulator(config.deviceId);
    } else if (config.source === "http") {
      setStatus("connecting");
      source = createHttpSource(config);
    } else if (config.source === "websocket") {
      setStatus("connecting");
      source = createWebSocketSource(config);
    } else {
      setStatus("connecting");
      source = createFirestoreSource(config);
    }

    return source.subscribe(
      (sample) => {
        setTelemetry(sample);
        setStatus(mode === "demo" ? "demo" : "streaming");
        setError("");
        setHistory((current) => [...current.slice(-23), sample]);
      },
      (sourceError) => {
        setStatus("error");
        setError(sourceError?.message || "Unable to read telemetry from this source.");
      },
    );
  }, [mode, config.source, config.endpoint, config.deviceId, config.interval]);

  return { telemetry, history, status, error };
}

import { useEffect, useState } from "react";
import { createTelemetrySimulator } from "../hardware/telemetrySimulator";

export function useTelemetry(deviceId) {
  const [telemetry, setTelemetry] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const simulator = createTelemetrySimulator(deviceId);
    return simulator.subscribe((sample) => {
      setTelemetry(sample);
      setHistory((current) => [...current.slice(-23), sample]);
    });
  }, [deviceId]);

  return { telemetry, history };
}

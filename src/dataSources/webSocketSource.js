import { normalizeTelemetry } from "./normalizeTelemetry";

export function createWebSocketSource({ endpoint, deviceId }) {
  return {
    subscribe(listener, onError) {
      const socket = new WebSocket(endpoint);

      socket.addEventListener("message", (event) => {
        try {
          listener(normalizeTelemetry(JSON.parse(event.data), deviceId));
        } catch {
          onError?.(new Error("WebSocket message was not valid telemetry JSON."));
        }
      });

      socket.addEventListener("error", () => {
        onError?.(new Error("WebSocket connection failed."));
      });

      return () => socket.close();
    },
  };
}

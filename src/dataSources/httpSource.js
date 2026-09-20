import { normalizeTelemetry } from "./normalizeTelemetry";

export function createHttpSource({ endpoint, interval = 2000, deviceId }) {
  let stopped = false;
  let timer;

  return {
    subscribe(listener, onError) {
      const poll = async () => {
        try {
          const response = await fetch(endpoint, { cache: "no-store" });
          if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          listener(normalizeTelemetry(await response.json(), deviceId));
        } catch (error) {
          onError?.(error);
        } finally {
          if (!stopped) timer = window.setTimeout(poll, interval);
        }
      };

      poll();
      return () => {
        stopped = true;
        window.clearTimeout(timer);
      };
    },
  };
}

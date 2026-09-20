const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const jitter = (value, amount, min, max) =>
  clamp(value + (Math.random() - 0.5) * amount, min, max);

export function createTelemetrySimulator(deviceId, interval = 1200) {
  const startedAt = Date.now();
  let state = { cpuLoad: 34, temperature: 38, ping: 42, memory: 51, packetLoss: 0.2 };

  const sample = () => {
    state = {
      cpuLoad: jitter(state.cpuLoad, 18, 4, 96),
      temperature: jitter(state.temperature, 3, 26, 68),
      ping: jitter(state.ping, 30, 12, 210),
      memory: jitter(state.memory, 6, 20, 91),
      packetLoss: jitter(state.packetLoss, 0.7, 0, 4.5),
    };
    return {
      deviceId,
      uptime: Math.floor((Date.now() - startedAt) / 1000),
      ...Object.fromEntries(Object.entries(state).map(([key, value]) => [key, Number(value.toFixed(1))])),
      timestamp: new Date().toISOString(),
    };
  };

  return {
    subscribe(listener) {
      listener(sample());
      const timer = window.setInterval(() => listener(sample()), interval);
      return () => window.clearInterval(timer);
    },
  };
}

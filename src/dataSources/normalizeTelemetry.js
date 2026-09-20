const numberOr = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function normalizeTelemetry(payload, fallbackDeviceId = "device") {
  const data = payload?.telemetry ?? payload ?? {};
  const rawTimestamp = data.timestamp;
  const timestamp = rawTimestamp?.toDate
    ? rawTimestamp.toDate().toISOString()
    : rawTimestamp ?? new Date().toISOString();

  return {
    deviceId: data.deviceId ?? fallbackDeviceId,
    uptime: Math.max(0, numberOr(data.uptime)),
    cpuLoad: numberOr(data.cpuLoad ?? data.cpu),
    temperature: numberOr(data.temperature ?? data.temp),
    ping: numberOr(data.ping ?? data.latency),
    memory: numberOr(data.memory ?? data.memoryUsage),
    packetLoss: numberOr(data.packetLoss),
    timestamp,
  };
}

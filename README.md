# ⚡ PulseGrid

**A polished, responsive admin + IoT telemetry dashboard starter for React, Tailwind CSS and Firebase.**

PulseGrid is an open-source starting point for internal tools, SaaS control panels and connected-device dashboards. It launches in zero-config demo mode with simulated Arduino Nano telemetry, then becomes Firebase-ready by adding environment variables.

## Features

- Responsive sidebar and navbar with a mobile drawer
- Analytics for active users, API traffic, database streams and devices
- Explicit Demo Mode with clearly labeled simulated/sample values
- Live Mode adapters for HTTP/REST, WebSocket and Firebase Firestore telemetry
- Hardware telemetry: uptime, CPU load, temperature, memory, ping and packet loss
- Dynamic CPU history visualization without a charting dependency
- Functional data table with filtering, sorting and pagination
- Modular Firebase/Firestore configuration
- Secure-by-default Firestore rules starter
- Responsive Tailwind CSS interface
- ESLint, GitHub Actions CI, contribution and security documentation
- MIT licensed

## Quick start

### Prerequisites

- Node.js 20+ (Node 22 recommended)
- npm
- Git

### Installation

```bash
git clone https://github.com/HSF237/pulsegrid.git
cd pulsegrid
npm install
npm run dev
```

No Firebase project is required for demo mode.

### Production check

```bash
npm run lint
npm run build
npm run preview
```

## Firebase setup

```bash
cp .env.example .env.local
```

Provide your Firebase web-app configuration:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

The app initializes Firebase only when all required values exist. Without them, the dashboard keeps working with local demo data.

Review `firestore.rules` for your own data model before production. Never put service-account credentials in a Vite environment file.

## Demo and Live modes

PulseGrid defaults to **Demo Mode**. Demo analytics and device telemetry are visibly marked as sample/simulated data so they cannot be mistaken for production measurements.

Switch to **Live Mode** inside the dashboard and choose one of three adapters:

- **HTTP / REST** — PulseGrid polls a JSON endpoint at a selectable interval.
- **WebSocket** — PulseGrid listens for JSON telemetry messages in real time.
- **Firebase Firestore** — PulseGrid watches the newest document in `devices/{deviceId}/telemetry`.

A live HTTP or WebSocket payload can be as small as:

```json
{
  "deviceId": "nano-edge-01",
  "uptime": 5820,
  "cpuLoad": 41.6,
  "temperature": 38.4,
  "ping": 27,
  "memory": 52.1,
  "packetLoss": 0.1,
  "timestamp": "2026-09-20T12:00:00.000Z"
}
```

Aliases such as `cpu`, `temp`, `latency` and `memoryUsage` are normalized automatically.

### Firebase Live Mode

Provide the Firebase variables shown below, enable **Anonymous Authentication** in Firebase Authentication, and write telemetry documents to:

```text
devices/{deviceId}/telemetry/{sampleId}
```

Each document should include the telemetry fields above and a sortable `timestamp`. PulseGrid signs in anonymously and subscribes to the newest sample.

## Hardware simulation

`src/hardware/telemetrySimulator.js` emits bounded, changing samples like a small streaming device source. The demo models Arduino Nano-class edge devices for interface development; values are simulated, not physical measurements.

## Project structure

```text
pulsegrid/
├── .github/
│   ├── workflows/ci.yml
│   └── pull_request_template.md
├── src/
│   ├── components/
│   │   ├── analytics/
│   │   │   ├── AnalyticsOverview.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   └── TelemetryChart.jsx
│   │   ├── data-table/DataTable.jsx
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── Sidebar.jsx
│   ├── config/firebase.js
│   ├── data/mockUsers.js
│   ├── dataSources/
│   │   ├── firestoreSource.js
│   │   ├── httpSource.js
│   │   ├── normalizeTelemetry.js
│   │   └── webSocketSource.js
│   ├── hardware/
│   │   ├── devices.js
│   │   └── telemetrySimulator.js
│   ├── hooks/useTelemetry.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
├── firebase.json
├── firestore.rules
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Architecture

The dashboard consumes telemetry through a hook instead of talking directly to hardware. This makes replacing the simulator straightforward and keeps the UI decoupled from transport details.

Firestore is optional: `src/config/firebase.js` only initializes it when a complete web configuration is available.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), create a focused branch, run lint/build locally, and open a pull request.

Good contribution areas include telemetry adapters, accessible visualizations, tests, Firebase examples and dashboard modules.

## Security

Read [SECURITY.md](SECURITY.md). Treat Firestore rules as the authorization boundary and never commit privileged credentials.

## License

PulseGrid is released under the [MIT License](LICENSE).

---

Built to be easy to inspect, fork, extend and deploy.

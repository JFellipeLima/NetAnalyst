# NetAnalyst 🌐

A lightweight network monitoring system that tracks domain availability and response latency, storing structured data for analysis and visualization.

## How it works

Two independent services:

- **Monitor** (Python) — pings configured domains every 5 seconds, measures latency, and runs hourly analytics to classify each domain as `stable`, `unstable`, or `down`
- **API** (Node.js/Express) — exposes collected data via REST endpoints

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
### Installation

```bash
git clone https://github.com/JFellipeLima/NetAnalyst.git
cd NetAnalyst

pip install -r monitor/requirements.txt
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
MONGO_PYTHON_URL=mongodb+srv://user:password@cluster.mongodb.net/
MONGO_NODE_URL=mongodb+srv://user:password@cluster.mongodb.net/
DOMAINS=https://example.com,https://example2.com,https://example3.com
PORT=3000
```

### Running

```bash
# Monitor
cd monitor
python main.py

# API
npm run test
```

## Endpoints

```
POST /log       → last 100 ping logs
POST /analytic  → last 100 hourly analytics
```

## How monitoring works

- Every 5 seconds, the monitor sends a `HEAD` request to each configured domain
- If the server doesn't support `HEAD`, it automatically falls back to `GET`
- If all domains fail simultaneously, a local network issue is detected and reported
- Every hour, analytics are computed per domain — max, min, and median latency, plus stability status
- All errors are logged to `monitor/error.txt` with full traceback

---

## Built with

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="48" height="48" alt="Python" title="Python" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="48" height="48" alt="Node.js" title="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="48" height="48" alt="Express" title="Express" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="48" height="48" alt="MongoDB" title="MongoDB" />
</p>

## License

[MIT](LICENSE)

# NetAnalyst 🌐

A lightweight network monitoring system that tracks domain availability and response latency, storing structured data for analysis and visualization.

## How it works

Two independent services share the same MongoDB database:

- **Monitor** (Python) — pings the target domain every 5 seconds, measures latency, and runs hourly analytics to classify the domain as `stable`, `unstable`, or `down`
- **API** (Node.js/Express) — exposes the collected data via REST endpoints

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- MongoDB instance (local or Atlas)

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
MONGO_PYTHON_URL=mongodb://localhost:27017
MONGO_NODE_URL=mongodb://localhost:27017
DOMAIN=https://example.com
PORT=3000
```

### Running

```bash
# Monitor
python monitor/main.py

# API
node app/app.js
```

## Endpoints

```
GET /log       → last 100 ping logs
GET /analytic  → last 100 hourly analytics
```

## Roadmap

- [ ] Multi-domain support
- [ ] Email and Telegram alerts
- [ ] Frontend dashboard
- [ ] Docker support

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

# 📈 Operations: Monitoring & Health Checks

## 1. Health Check Endpoint
- Path: `GET /health`
- Response: `{"status": "ok", "uptime": 3600, "database": "connected"}`

## 2. Metrik Kritis yang Dipantau
- P95 Response Latency (< 200ms)
- Error Rate HTTP 5xx (< 0.1%)
- Disk usage & memory utilization

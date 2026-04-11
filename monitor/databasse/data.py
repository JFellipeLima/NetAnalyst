from datetime import datetime, UTC, timedelta
from err_save import log_error 


async def save_data(db, url):
    """Analyse logs and save analytics"""
    db_collection = db["analytics"]
    db_log = db["logs"]

    success_list = [200, 201]
    last_hour = datetime.now(UTC) - timedelta(hours=1)

    check_last = await db_collection.find_one({}, sort=[("date", -1)])
    check_last_update = check_last["date"].replace(tzinfo=UTC) if check_last else None

    stats = await db_log.find({"date": {"$gte": last_hour}}).to_list(None)

    if not stats:
        return None

    latencies = sorted([i["latency_ms"] for i in stats])
    if latencies:
        max_latency = latencies[-1]
        min_latency = latencies[0]
        avg_latency = latencies[len(latencies) // 2]
    else:
        return None

    incidents = [
        {"status_code": i["status_code"], "date": i["date"]}
        for i in stats
        if i["status_code"] not in success_list
    ]

    if incidents:
        status = "down"
    elif avg_latency > 500:
        status = "unstable"
    else:
        status = "stable"

    body = {
        "domain_name": url,
        "max_latency": max_latency,
        "min_latency": min_latency,
        "avg_latency": avg_latency,
        "incidents": incidents,
        "status": status,
        "date": datetime.now(UTC)
    }

    if check_last_update is None or datetime.now(UTC) - check_last_update >= timedelta(hours=1):
        await db_collection.insert_one(body)


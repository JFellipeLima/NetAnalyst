"""
Work in analise of logs and save information in database
"""
from datetime import datetime, UTC, timedelta
from err_save import log_error

async def save_data(db, url):
    """Analyse logs and save analytics"""
    db_collection = db["analytics"]
    db_log = db["logs"]

    last_hour = datetime.now(UTC) - timedelta(hours=1)
    check_last = await db_collection.find_one({"domain_name": url}, sort=[("date", -1)])
    check_last_update = check_last["date"].replace(tzinfo=UTC) if check_last else None

    if check_last_update is None or datetime.now(UTC) - check_last_update >= timedelta(
        hours=1
    ):
        stats = await db_log.find({"date": {"$gte": last_hour}, "domain": url}).to_list(
            None
        )
        if not stats:
            return None

        latencies = sorted([i["latency_ms"] for i in stats])

        if latencies:
            latency_stats = {
                "max": latencies[-1],
                "min": latencies[0],
                "avg": latencies[len(latencies) // 2]
}
        else:
            return None

        incidents = [
            {"status_code": i["status_code"], "date": i["date"]}
            for i in stats
            if i["status_code"] not in [200, 201]
        ]

        if incidents:
            status = "down"
        elif latency_stats["avg"] > 500:
            status = "unstable"
        else:
            status = "stable"

        body = {
            "domain_name": url,
            "max_latency": latency_stats["max"],
            "min_latency": latency_stats["min"],
            "avg_latency": latency_stats["avg"],
            "incidents": incidents,
            "status": status,
            "date": datetime.now(UTC),
        }
        try:
            await db_collection.insert_one(body)
            print(f"Saved analytics: \n{body}\n")
        except Exception as error:
            log_error(error)

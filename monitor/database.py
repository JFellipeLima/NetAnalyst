from motor.motor_asyncio import AsyncIOMotorClient
from os import getenv
from dotenv import load_dotenv
from datetime import datetime, UTC, timedelta

load_dotenv()

async def database_connect():
    """Open the connection with the database"""
    try:
        cnn = AsyncIOMotorClient(getenv("MONGO_PYTHON_URL"))
        db = cnn["netAnalyst"]
        return db
    except Exception as error:
        print(error)

async def save_ping(url, status, db, latency, method):
    """Save the log information in database"""
    log = db["logs"]
    body_ping = {
        "domain": url,
        "status_code": status,
        "date": datetime.now(UTC),
        "latency_ms": latency,
        "method": method
    }
    try:
        await log.insert_one(body_ping)
    except Exception as error:
        print(error)

async def save_data(db, url):
    """Analyse logs and save analytics"""
    db_collection = db["analystics"]
    db_log = db["logs"]

    success_list = [200, 201]
    last_hour = datetime.now(UTC) - timedelta(hours=1)

    check_last = await db_collection.find_one({}, sort=[("date", -1)])
    check_last_update = check_last["date"].replace(tzinfo=UTC) if check_last else None

    stats = await db_log.find({"date": {"$gte": last_hour}}).to_list(None)

    if not stats:
        return

    latencies = sorted([i["latency_ms"] for i in stats])
    max_latency = latencies[-1]
    min_latency = latencies[0]
    avg_latency = latencies[len(latencies) // 2]

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


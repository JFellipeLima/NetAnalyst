"""Save ping data in database"""

from datetime import datetime, UTC
from err_save import log_error


async def save_ping(url, status, db, latency, method):
    """
    Save the log information in database.

    If the insert fails, the error is logged using log_error and not raised.
    """
    log = db["logs"]
    body_ping = {
        "domain": url,
        "status_code": status,
        "date": datetime.now(UTC),
        "latency_ms": latency,
        "method": method,
    }
    try:
        await log.insert_one(body_ping)
        print(f"Saved: {body_ping}\n")
    except Exception as error: # pylint: disable=broad-exception-caught
        log_error(error)

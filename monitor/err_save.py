"""
Save errors in a log file
"""
from datetime import datetime, UTC
import traceback
import os

def log_error(exc):
    "Log the error in a file"
    filepath = os.path.join(os.path.dirname(__file__), "error.txt")
    try:
        with open(filepath, "a", encoding="utf-8") as file:
            error_details = "".join(
                traceback.format_exception(type(exc), exc, exc.__traceback__)
            )
            file.write(f"{datetime.now(UTC)}: {error_details}\n")
            print(
                f"\033[31mAn {type(exc).__name__} occurred, check error log\033[0m\n"
            )

    except FileNotFoundError:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        log_error(exc)  # Retry logging after creating the directory

    except Exception as exc:
        print(
            f"\033[31mFailed to log error: {exc}\033[0m\n"
        )
